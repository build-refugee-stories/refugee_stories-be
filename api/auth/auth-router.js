const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator')
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
      message: 'register success',
      id: newUser.id,
      email: newUser.email
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user'});
  }
})

router.post('/login', validateLogin, async (req, res) => {
  let { email, password } = req.body;

  try {
    const user = await userDb.findUserBy({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      if (user.isAdmin) {
        const token = generateToken(user);
        res.status(200).json({
          message: `hello ${user.firstName}`,
          userId: user.id, 
          email: user.email,
          firstName: user.firstName, 
          isAdmin: user.isAdmin,
          token
        })
      } else {
        res.status(401).json({ message: 'User approval status pending' });
      }
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
  if (!user.email || !user.password || !user.firstName || !user.lastName) {
    res.status(400).json({ message: 'Email, full name, and password are required' });
  } else {
    if (!validator.isEmail(user.email)) {
      res.status(400).json({ message: 'Please provide a valid email address' });
    } else if (user.password.length < 6) {
      res.status(400).json({ message: 'Password must be at least 6 characters long' });
    } else {
      next();
    }
  }
}

function validateLogin(req, res, next) {
  const user = req.body;
  if (!user.email || !user.password) {
    res.status(400).json({ message: 'Email and password are required' });
  } else {
    next();
  }
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    email: user.email
  };

  const options = {
    expiresIn: '8h'
  }

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;