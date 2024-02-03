const connectMongo = require('./db');
const dotenv = require('dotenv');

dotenv.config();
connectMongo();

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/project'))
app.use('/api/meta', require('./routes/meta'))

app.get('/', async (req, res) => {
	res.send("server is working");
})

app.listen(process.env.PORT || 8080, () => {
	console.log(`Example app listening on port ${process.env.PORT || 8080}`)
})