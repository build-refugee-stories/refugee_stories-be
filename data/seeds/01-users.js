const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  return knex('users').insert([
    {
      username: 'admin', 
      password: bcrypt.hashSync('password', 12)
    }
  ]);
};
