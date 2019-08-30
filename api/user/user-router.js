const express = require('express');
const userDb = require('./user-model');
const router = express.Router();

/** 
 * @api {get} /api/users List all users
 * @apiName GetAllUsers
 * @apiGroup Users
 * @apiVersion 1.0.0
 * 
 * @apiHeader {String} authorization Requires authorization token 
 * 
 * @apiSuccess {Object[]} users List of all users
 * @apiSuccess (200) {Number} users.id User ID
 * @apiSuccess (200) {String} users.email User's email
 * @apiSuccess (200) {String} users.firstName User's first name
 * @apiSuccess (200) {String} users.lastName User's last name
 * @apiSuccess (200) {Boolean} users.isAdmin User's admin status
 *  
 * @apiSuccessExample {json} Success-Response:
 *    HTTP 200 OK
 *    [
 *      {   
          "id": 1,
          "email": "email@email.com",
          "firstName": "Testuser",
          "lastName": "Testuser",
          "isAdmin": true
        },
        ...
 *    ]
 *
 * @apiError ServerError Internal server error
 *
 * @apiErrorExample {json} ServerError
 *     HTTP 500 Internal Server Error
 *     {
 *       "message": "Error getting users"
 *     }
*/

//get all users
router.get('/', async (req, res) => {
  try {
    const users = await userDb.findUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error getting users'})
  }
})

/** 
 * @api {get} /api/users/pending List all pending users
 * @apiName GetAllPendingUsers
 * @apiGroup Users
 * @apiVersion 1.0.0
 * 
 * @apiHeader {String} authorization Requires authorization token
 * 
 * @apiSuccess {Object[]} users List of users
 * @apiSuccess (200) {Number} users.id User id
 * @apiSuccess (200) {String} users.email User's email
 * @apiSuccess (200) {String} users.firstName User's first name
 * @apiSuccess (200) {String} users.lastName User's last name
 * @apiSuccess (200) {Boolean} users.isAdmin User's admin status (false)
 *  
 * @apiSuccessExample {json} Success-Response:
 *    HTTP 200 OK
 *    [
 *      {   
          "id": 2,
          "email": "pending@pending.com",
          "firstName": "Pendinguser",
          "lastName": "Pendinguser",
          "isAdmin": false
        },
        ...
 *    ]
 *
 * @apiError ServerError Internal server error
 *
 * @apiErrorExample {json} ServerError
 *     HTTP 500 Internal Server Error
 *     {
 *       "message": "Error getting pending users"
 *     }
*/

//get all users pending approval
router.get('/pending', async (req, res) => {
  try {
    const users = await userDb.findPendingUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error getting pending users'})
  }
})

/** 
 * @api {get} /api/users/:id List an user by id
 * @apiName GetUserById
 * @apiGroup Users
 * @apiVersion 1.0.0
 * 
 * @apiHeader {String} authorization Requires authorization token
 *  
 * @apiSuccessExample {json} Success-Response:
 *    HTTP 200 OK
 *    { 
 *      "id": 1,
        "email": "email@email.com",
        "firstName": "Testuser",
        "lastName": "Testuser",
        "isAdmin": true
      }
 *
 * @apiError UserNotFound No user was found
 * @apiError ServerError Internal server error
 * 
 * @apiErrorExample {json} UserNotFound
 *     HTTP 404 Not Found
 *     {
 *       "message": "No user of this ID exists"
 *     }
 *  
 * @apiErrorExample {json} ServerError
 *     HTTP 500 Internal Server Error
 *     {
 *       "message": "Error getting user"
 *     }
*/

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

/** 
 * @api {put} /api/users/:id Approve an user
 * @apiName ApproveUser
 * @apiGroup Users
 * @apiVersion 1.0.0
 * 
 * @apiHeader {String} authorization Requires authorization token
 *  
 * @apiSuccessExample {json} Success-Response:
 *    HTTP 200 OK
 *    { 
 *      "id": 2,
        "email": "pending@pending.com",
        "firstName": "Pendinguser",
        "lastName": "Pendinguser",
        "isAdmin": true
      }
 *
 * @apiError UserNotFound No user was found
 * @apiError ServerError Internal server error
 * 
 * @apiErrorExample {json} UserNotFound
 *     HTTP 404 Not Found
 *     {
 *       "message": "No user of this ID exists"
 *     }
 *  
 * @apiErrorExample {json} ServerError
 *     HTTP 500 Internal Server Error
 *     {
 *       "message": "Error approving user"
 *     }
*/

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

/** 
 * @api {delete} /api/users/:id Delete an user
 * @apiName DeleteUser
 * @apiGroup Users
 * @apiVersion 1.0.0
 * 
 * @apiHeader {String} authorization Requires authorization token
 *  
 * @apiSuccessExample {json} Success-Response:
 *    HTTP 200 OK
 *    { 
 *      "removed": {
 *        "id": 1,
          "email": "delete@delete.com",
          "firstName": "Baduser",
          "lastName": "Baduser",
          "isAdmin": false
        }
      }
 *
 * @apiError UserNotFound No user was found
 * @apiError ServerError Internal server error
 * 
 * @apiErrorExample {json} UserNotFound
 *     HTTP 404 Not Found
 *     {
 *       "message": "No user of this ID exists"
 *     }
 *  
 * @apiErrorExample {json} ServerError
 *     HTTP 500 Internal Server Error
 *     {
 *       "message": "Error deleting user"
 *     }
*/

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