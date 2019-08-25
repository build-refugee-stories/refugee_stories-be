const db = require('../../data/data-config');

module.exports = {
  findUsers,
  findUserBy,
  addUser
}

function findUsers() {
  return db('users').where('id', 'username');
}

function findUserBy(filter) {
  return db('users').where(filter).first();
}

async function addUser(user) {
  const [id] = await db('users').insert(user, 'id')

  return findUserBy({ id });
}