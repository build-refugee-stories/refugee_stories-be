const express = require('express');
const storyDb = require('./story-model');
const authenticate = require('../auth/auth-middleware');
const router = express.Router();

//get all approved stories 
router.get('/public', async (req, res) => {
  try {
    const stories = await storyDb.findApprovedStories();
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: 'Error getting stories'})
  }
})

//post a story
router.post('/public', validateStory, async (req, res) => {
  const story = req.body;
  if (!story.author) {
    story.author = 'Anonymous';
  } 

  try { 
    const newStory = await storyDb.addStory(story);
    res.status(201).json(newStory);
  } catch (error) {
    res.status(500).json({ message: 'Error adding story'})
  }
})

//get all submitted stories
router.get('/stories', authenticate, async (req, res) => {
  try {
    const stories = await storyDb.findStories();
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: 'Error getting all stories'})
  }
})

//get a specific submitted story
router.get('/stories/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const story = await storyDb.findStoryById(id);

    if (story) {
      res.status(200).json(story);
    } else {
      res.status(404).json({ message: 'No story of this ID exists'});
    }
  } catch (error) {
    res.status(500).json({ message: 'Error getting all stories'})
  }
})

//approve a story
router.put('/stories/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  /*
  const story = {req.body;}
  story.approved = true;
  story.approvedBy = req.userId;
  */

  const updates = {
    approved: true,
    approvedBy: req.userId
  }

  try {
    const updatedPost = await storyDb.updateStory(id, updates);
    if (updatedPost) {
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ message: 'No story of this ID exists'});
    }
  } catch (error) {
    res.status(500).json({ message: 'Error approving story'});
  }
})

//delete a story
router.delete('/stories/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const toDelete = await storyDb.findStoryById(id);
    const deleted = await storyDb.deleteStory(id)

    if (deleted) {
      res.status(200).json({removed: toDelete});
    } else {
      res.status(404).json({ message: 'No story of this ID exists'});
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting story'});
  }
})

//middleware
function validateStory(req, res, next) {
  const story = req.body;
  if (!story.title || !story.story) {
    res.status(400).json({ message: 'Title and story are required' });
  } else {
    next();
  }
}

module.exports = router;