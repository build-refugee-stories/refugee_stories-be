const jwt = require('jsonwebtoken');
const secrets = require('../../config/secrets');

module.exports = function (req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({message: 'Access denied. Token is invalid.'})
      } else {
        next();
      }
    })
  } else {
    res.status(400).json({message: 'Access denied. Please provide token.'})
  }
}