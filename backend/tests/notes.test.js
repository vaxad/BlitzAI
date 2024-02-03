const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = require('../routes/notes');
const User = require('../models/User');
const Note = require('../models/Note');
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
  app.use('/api/notes', noteRoutes);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe('GET /api/notes/fetch', () => {
  it('should fetch all notes for the authenticated user', async () => {

    const user = await User.create({ name: 'Test User', email: 'test1@example.com', password: 'testpassword' });
    const note1 = await Note.create({ title: 'Test Note 1', content: 'Content 1', user: user.id });
    const note2 = await Note.create({ title: 'Test Note 2', content: 'Content 2', user: user.id });

    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
    const response = await request(app)
      .get('/api/notes/fetch')
      .set('auth-token', token)
      .expect(200);

    expect(response.body).toHaveLength(2);
    expect(response.body[0].title).toBe('Test Note 1');
    expect(response.body[1].title).toBe('Test Note 2');
  });

  it('should return 401 status on no auth-token', async () => {

    const response = await request(app)
      .get('/api/notes/fetch')
      .expect(401);

  });
});

describe('POST /api/notes/', () => {
  it('should add a new note for the authenticated user', async () => {
    const user = await User.create({ name: 'Test User', email: 'test2@example.com', password: 'testpassword' });
    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
    const response = await request(app)
      .post('/api/notes')
      .set('auth-token', token)
      .send({
        title: 'Test Note',
        content: 'Content',
      })
      .expect(200);

    expect(response.body.title).toBe('Test Note');
    expect(response.body.content).toBe('Content');
    expect(response.body.user).toBe(user.id);
  });

  it('should return 400 status for invalid input', async () => {
    const user = await User.create({ name: 'Test User', email: 'test3@example.com', password: 'testpassword' });
    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
    const response = await request(app)
      .post('/api/notes')
      .set('auth-token', token)
      .send({

      })
      .expect(400);

    expect(response.body.errors).toBeDefined();
  });

  it('should return 401 status on no auth-token', async () => {

    const response = await request(app)
      .post('/api/notes')
      .expect(401);

  });
});

describe('PUT /api/notes/:id', () => {
  it('should update a note for the authenticated user', async () => {
    const user = await User.create({ name: 'Test User', email: 'test4@example.com', password: 'testpassword' });
    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);

    const note = await Note.create({
      title: 'Old Title',
      content: 'Old Content',
      user: user.id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    const response = await request(app)
      .put(`/api/notes/${note.id}`)
      .set('auth-token', token)
      .send({
        title: 'New Title',
        content: 'New Content',
      })
      .expect(200);

    expect(response.body.title).toBe('New Title');
    expect(response.body.content).toBe('New Content');
    expect(response.body.user).toBe(user.id);
  });

  it('should return 404 status for non-existing note', async () => {
    const user = await User.create({ name: 'Test User', email: 'test5@example.com', password: 'testpassword' });
    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
    const noteId = new mongoose.Types.ObjectId(123456789);
    const response = await request(app)
      .put(`/api/notes/${noteId}`)
      .set('auth-token', token)
      .send({
        title: 'New Title',
        content: 'New Content',
      })
      .expect(404);

    expect(response.text).toBe('Not found');
  });

  it('should return 401 status for unauthorized user', async () => {
    const user = await User.create({ name: 'Other User', email: 'test6@example.com', password: 'otherpassword' });
    const otherUser = await User.create({ name: 'Other User', email: 'other@example.com', password: 'otherpassword' });
    const token = jwt.sign({ user: { id: otherUser.id } }, process.env.JWT_SECRET);
    const note = await Note.create({
      title: 'Old Title',
      content: 'Old Content',
      user: user.id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    const response = await request(app)
      .put(`/api/notes/${note.id}`)
      .set('auth-token', token)
      .send({
        title: 'New Title',
        content: 'New Content',
      })
      .expect(401);

    expect(response.text).toBe('Not Allowed');
  });

  it('should return 401 on no auth-token', async () => {

    const response = await request(app)
      .put('/api/notes/nonexistingnoteid')
      .expect(401);

  });
});

describe('DELETE /api/notes/:id', () => {
  it('should delete a note for the authenticated user', async () => {
    const user = await User.create({ name: 'Test User', email: 'test7@example.com', password: 'testpassword' });
    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);

    const note = await Note.create({
      title: 'Test Note',
      content: 'Test Content',
      user: user.id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await request(app)
      .delete(`/api/notes/${note.id}`)
      .set('auth-token', token)
      .expect(200);

    const deletedNote = await Note.findById(note.id);
    expect(deletedNote).toBeNull();
  });

  it('should return 404 status for non-existing note', async () => {
    const user = await User.create({ name: 'Test User', email: 'test8@example.com', password: 'testpassword' });
    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
    const noteId = new mongoose.Types.ObjectId(123456789);

    const response = await request(app)
      .delete(`/api/notes/${noteId}`)
      .set('auth-token', token)
      .expect(404);

    expect(response.text).toBe('Not found');
  });

  it('should return 401 status for unauthorized user', async () => {
    const otherUser = await User.create({ name: 'Other User', email: 'other2@example.com', password: 'otherpassword' });
    const user = await User.create({ name: 'Test User', email: 'test9@example.com', password: 'testpassword' });
    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);

    const note = await Note.create({
      title: 'Test Note',
      content: 'Test Content',
      user: otherUser.id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    const response = await request(app)
      .delete(`/api/notes/${note.id}`)
      .set('auth-token', token)
      .expect(401);

    expect(response.text).toBe('Not Allowed');
  });

  it('should return 401 status on no auth-token', async () => {

    const response = await request(app)
      .delete('/api/notes/nonexistingnoteid')
      .expect(401);

  });
});

describe('GET /api/notes/fetch/:id', () => {
  it('should fetch a note for the authenticated user', async () => {
    const user = await User.create({ name: 'Test User', email: 'test10@example.com', password: 'testpassword' });
    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);

    const note = await Note.create({
      title: 'Test Note',
      content: 'Test Content',
      user: user.id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    const response = await request(app)
      .get(`/api/notes/fetch/${note.id}`)
      .set('auth-token', token)
      .expect(200);

    expect(response.body.title).toBe('Test Note');
    expect(response.body.content).toBe('Test Content');
  });

  it('should return 404 status for non-existing note', async () => {
    const user = await User.create({ name: 'Test User', email: 'test11@example.com', password: 'testpassword' });
    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
    const noteId = new mongoose.Types.ObjectId(123456789);
    const response = await request(app)
      .get(`/api/notes/fetch/${noteId}`)
      .set('auth-token', token)
      .expect(404);

    expect(response.text).toBe('Not found');
  });

  it('should return 401 status for unauthorized user', async () => {
    const otherUser = await User.create({ name: 'Other User', email: 'other3@example.com', password: 'otherpassword' });
    const user = await User.create({ name: 'Test User', email: 'test12@example.com', password: 'testpassword' });
    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);

    const note = await Note.create({
      title: 'Test Note',
      content: 'Test Content',
      user: otherUser.id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    const response = await request(app)
      .get(`/api/notes/fetch/${note.id}`)
      .set('auth-token', token)
      .expect(401);

    expect(response.text).toBe('Not Allowed');
  });

  it('should return 401 status on no auth-token', async () => {

    const response = await request(app)
      .get('/api/notes/fetch/nonexistingnoteid')
      .expect(401);

  });
});