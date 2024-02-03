const connectMongo = require('./db');
const dotenv = require('dotenv');

dotenv.config();
connectMongo();

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const port = 5000;

app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', async (req, res) => {
  res.send("server is working");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})