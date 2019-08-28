const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  return knex('users').insert([
    {
      email: 'admin@example.com', 
      password: bcrypt.hashSync('password', 12),
      firstName: 'Admin',
      lastName: 'Person',
      isAdmin: true
    }
  ]);
};
