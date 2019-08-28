const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authenticate = require('./auth/auth-middleware');
const authRouter = require('./auth/auth-router');
const storyRouter = require('./story/story-router');
const userRouter = require('./user/user-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/', authRouter);
server.use('/api/', storyRouter);
server.use('/api/users', authenticate, userRouter);

server.get('/', (req, res) => {
  res.status(200).json({ message: 'server is running go catch it' });
})

module.exports = server;