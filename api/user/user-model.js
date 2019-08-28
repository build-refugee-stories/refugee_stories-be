const db = require('../../data/data-config');

module.exports = {
  findUsers,
  findUserBy,
  addUser,
  findPendingUsers,
  updateUser,
  deleteUser
}

function findUsers() {
  return db('users').select('id', 'email', 'firstName', 'lastName', 'isAdmin');
}

function findUserBy(filter) {
  return db('users').where(filter).first();
}

async function addUser(user) {
  const [id] = await db('users').insert(user, 'id')

  return findUserBy({ id });
}

function findPendingUsers() {
  return db('users').where('isAdmin', false).select('id', 'email', 'firstName', 'lastName', 'isAdmin');
}

function updateUser(id, changes) {
  return db('users').where({ id }).update(changes).then(() => findUserBy({ id }));
}

function deleteUser(id) {
  return db('users').where({ id }).del();
}