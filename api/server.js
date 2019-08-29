const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const apiDoc = path.join(__dirname, '../apidoc');

const authenticate = require('./auth/auth-middleware');
const authRouter = require('./auth/auth-router');
const storyRouter = require('./story/story-router');
const userRouter = require('./user/user-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use('/api/', authRouter);
server.use('/api/', storyRouter);
server.use('/api/users', authenticate, userRouter);

server.use('/', express.static(apiDoc));

module.exports = server;