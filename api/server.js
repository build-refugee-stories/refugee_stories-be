const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('./auth/auth-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api', authRouter);

server.get('/', (req, res) => {
  res.status(200).json({ message: 'server is running go catch it' });
})

module.exports = server;