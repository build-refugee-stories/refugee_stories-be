const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  return knex('users').insert([
    {
      username: 'guest', 
      password: bcrypt.hashSync('guest', 12)
    }
  ]);
};
