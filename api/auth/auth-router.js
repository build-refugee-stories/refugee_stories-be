const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
const userDb = require('../user/user-model');
const router = express.Router();

router.post('/register', validateRegister, async (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  try {
    const newUser = await userDb.addUser(user);

    res.status(201).json({
      id: newUser.id,
      username: newUser.username
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user'});
  }
})

router.post('/login', validateLogin, async (req, res) => {
  let { username, password } = req.body;

  try {
    const user = await userDb.findUserBy({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({
        message: `hello ${user.username}`,
        userId: user.id, 
        token
      })
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user'});
  }
})




//middleware and misc function
function validateRegister(req, res, next) {
  const user = req.body;
  if (!user.username || !user.password) {
    res.status(400).json({ message: 'Username and password are required' });
  } else {
    if (user.password.length < 6) {
      res.status(400).json({ message: 'Password must be at least 6 characters long' });
    } else {
      next();
    }
  }
}

function validateLogin(req, res, next) {
  const user = req.body;
  if (!user.username || !user.password) {
    res.status(400).json({ message: 'Username and password are required' });
  } else {
    next();
  }
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: '8h'
  }

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;