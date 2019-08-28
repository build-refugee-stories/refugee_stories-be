const express = require('express');
const userDb = require('./user-model');
const router = express.Router();

//get all users
router.get('/', async (req, res) => {
  try {
    const users = await userDb.findUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error getting users'})
  }
})

//get all users pending approval
router.get('/pending', async (req, res) => {
  try {
    const users = await userDb.findPendingUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error getting pending users'})
  }
})

//get specific user
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userDb.findUserBy({ id });
    if (user) {
      delete user.password;
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'No user of this ID exists'});
    }
  } catch (error) {
    res.status(500).json({ message: 'Error getting user'})
  }
})

//approve an user
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = {
    isAdmin: true,
  }

  try {
    const updatedUser = await userDb.updateUser(id, updates);
    if (updatedUser) {
      delete updatedUser.password;
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'No user of this ID exists'});
    }
  } catch (error) {
    res.status(500).json({ message: 'Error approving user'});
  }
})

//delete an user
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const toDelete = await userDb.findUserBy({ id });
    const deleted = await userDb.deleteUser(id);

    if (deleted) {
      delete toDelete.password;
      res.status(200).json({removed: toDelete});
    } else {
      res.status(404).json({ message: 'No user of this ID exists'});
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user'});
  }
})


module.exports = router;