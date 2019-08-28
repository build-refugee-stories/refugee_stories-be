const db = require('../../data/data-config');

module.exports = {
  findStories,
  findApprovedStories,
  findStoryById,
  addStory,
  updateStory,
  deleteStory,
  findApprovedStoryById,
}

function findStories() {
  return db('stories').orderBy('id');
}

function findApprovedStories() {
  return db('stories').where('approved', true).orderBy('id');
}

function findStoryById(id) {
  return db('stories').where({ id }).first();
}

async function addStory(story) {
  const [id] = await db('stories').insert(story, 'id');

  return findStoryById(id);
}

function updateStory(id, changes) {
  return db('stories').where({ id }).update(changes).then(() => findStoryById(id));
}

function deleteStory(id) {
  return db('stories').where({ id }).del();
}

function findApprovedStoryById(id) {
  return db('stories').where({ id }).where('approved', true).first();
}
