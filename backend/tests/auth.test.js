const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('../routes/auth');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { MongoMemoryServer } = require('mongodb-memory-server');
let mongod;

let app;

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    app = express();
    app.use(express.json());
    app.use('/api/auth', authRoutes);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

describe('POST /api/auth/signup', () => {
    it('should create a new user', async () => {
        const response = await request(app)
            .post('/api/auth/signup')
            .send({
                email: 'test@example.com',
                name: 'Test User',
                password: 'TestPassword1',
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('authToken');
    });

    it('should handle duplicate email during signup', async () => {
        const existingUser = new User({
            name: 'Existing User',
            email: 'test2@example.com',
            password: 'hashedpassword',
        });
        await existingUser.save();

        const response = await request(app)
            .post('/api/auth/signup')
            .send({
                email: 'test2@example.com',
                name: 'Test User',
                password: 'TestPassword1',
            });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error', 'A user with this email already exists!');
    });

    it('should handle validation errors during signup', async () => {
        const response = await request(app)
            .post('/api/auth/signup')
            .send({
                email: 'invalid-email',
                name: '',
                password: 'short',
            });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('errors');
    });
});
// Similar tests for other routes (POST /api/auth/login, GET /api/auth/getuser) can be added here
describe('POST /api/auth/login', () => {// Helper function to create a test user with a hashed password
    const createTestUser = async (email) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('testpassword', salt);
        return await User.create({
            name: 'Test User',
            email: email,
            password: hashedPassword,
            date: Date.now(),
        });
    };

    it('should login a user with correct credentials', async () => {
        const user = await createTestUser('test3@example.com');
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test3@example.com',
                password: 'testpassword',
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('authToken');
    });

    it('should handle incorrect email during login', async () => {
        await createTestUser('test4@example.com');

        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'wrong@example.com',
                password: 'testpassword',
            });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error', 'Please login with correct credentials');
    });

    it('should handle incorrect password during login', async () => {
        await createTestUser("test5@example.com");

        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test5@example.com',
                password: 'wrongpassword',
            });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error', 'Please login with correct credentials');
    });

    it('should handle validation errors during login', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'invalid-email',
                password: '',
            });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('errors');
    });

});

describe('GET /api/auth/getuser', () => {
    it('should get the user when authenticated', async () => {// Create a test user
        const user = await User.create({
            name: 'Test User',
            email: 'test6@example.com',
            password: 'testpassword',
            date: Date.now(),
        });
        // Mock a valid token
        const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
        // Make a request with the valid token
        const response = await request(app)
            .get('/api/auth/getuser')
            .set('auth-token', token);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toHaveProperty('name', 'Test User');
        expect(response.body.user).toHaveProperty('email', 'test6@example.com');
        expect(response.body.user).not.toHaveProperty('password');
    });

    it('should return 401 for unauthorized requests', async () => {// Make a request without a token
        const response = await request(app)
            .get('/api/auth/getuser');

        expect(response.statusCode).toBe(401);
        expect(response.text).toBe('Unauthorized');
    });
    // Add more test cases as needed
});
