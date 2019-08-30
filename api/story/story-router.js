const express = require('express');
const storyDb = require('./story-model');
const authenticate = require('../auth/auth-middleware');
const router = express.Router();

/** 
 * @api {get} /api/public List all approved stories
 * @apiName GetAllApprovedStories
 * @apiGroup Stories (public)
 * @apiVersion 1.0.0
 * 
 * @apiSuccess {Object[]} stories List of stories
 * @apiSuccess (200) {Number} stories.id User ID
 * @apiSuccess (200) {String} stories.title Title of story 
 * @apiSuccess (200) {String} stories.author Author of story
 * @apiSuccess (200) {String} stories.country Country the story took place
 * @apiSuccess (200) {Number} stories.year Year the story took place
 * @apiSuccess (200) {String} stories.imageUrl Url of the image associated with the story
 * @apiSuccess (200) {Boolean} stories.approved Story's approval status
 * @apiSuccess (200) {Number} stories.approvedBy Id of admin who approved the story
 *  
 * @apiSuccessExample {json} Success-Response:
 *    HTTP 200 OK
 *    [
 *      {
  *       "id": 1,
          "title": "My little daughter died and my children and I were injured",
          "author": "Um Osama",
          "country": "Syria",
          "story": "She screamed a scream that made my heart ache. Then her body dropped dead in my hands. That is how I see Syria now. That's our country that we used to live in. It was a horrible night. The military aircraft was above us, we heard noises of explosive barrels and rockets that were falling everywhere around us. I took my kids and went to an agricultural land near the outskirts of the village to search for a place where I could guarantee safety for my little children. As soon as we sat under one of the olive trees an aircraft bombed the place with cluster bombs. My little daughter died and my children and I were injured.",
          "year": null,
          "imageUrl": "https://www.islamic-relief.org/wp-content/uploads/2016/09/Um-Osama.jpg",
          "approved": true,
          "approvedBy": 1
        }
        ...
 *    ]
 *
 * @apiError ServerError Internal server error
 *
 * @apiErrorExample {json} ServerError
 *     HTTP 500 Internal Server Error
 *     {
 *       "message": "Error getting stories"
 *     }
*/

//get all approved stories 
router.get('/public', async (req, res) => {
  try {
    const stories = await storyDb.findApprovedStories();
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: 'Error getting stories'})
  }
})

/** 
 * @api {get} /api/public/:id List an approved story by id
 * @apiName GetApprovedStorybyId
 * @apiGroup Stories (public)
 * @apiVersion 1.0.0
 *  
 * @apiSuccessExample {json} Success-Response:
 *    HTTP 200 OK
 *    {
*       "id": 5,
        "title": "15 year veteran teacher can't find a teaching job after relocating",
        "author": "Hannan",
        "country": "Iraq",
        "story": "Finding jobs here depends on whether you have friends or relatives to help you. I have 15 years' experience in teaching but till now no employers have replied to me. I've applied to all the NGOs, giving them my CV, but I've seen that they'll take another person who doesn't have any experience or knowledge about the job. Because I don't have the opportunity to teach, most of the time I feel angry, aggressive and nervous, having pressure because I can't do what I'm supposed to do. The women can't go out alone. I want to go out shopping or to the market or to the hospital and I feel like I'm in prison. I have to get permission to go anywhere. The difference between living here and living in Syria is the difference between the sky and the earth. I can't tell you in words how different things are.",
        "year": null,
        "imageUrl": "https://www.islamic-relief.org/wp-content/uploads/2016/09/Hannan-1024x683.jpg",
        "approved": true,
        "approvedBy": 1
      }
 * 
 * @apiError NoStoryWasFound No story was found
 * @apiError ServerError Internal server error
 * 
 * @apiErrorExample {json} NoStoryWasFound
 *     HTTP 404 Not Found
 *     {
 *       "message": "No story of this ID exists or story has not been approved yet"
 *     }
 * 
 * @apiErrorExample {json} ServerError
 *     HTTP 500 Internal Server Error
 *     {
 *       "message": "Error getting approved story"
 *     }
*/

//get a specific approved story
router.get('/public/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const story = await storyDb.findApprovedStoryById(id);

    if (story) {
      res.status(200).json(story);
    } else {
      res.status(404).json({ message: 'No story of this ID exists or story has not been approved yet' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error getting approved story'})
  }
})

/** 
 * @api {post} /api/public Add a new story
 * @apiName AddStory
 * @apiGroup Stories (public)
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} title Title of story (unique, required)
 * @apiParam {String} story Story content (required)
 * @apiParam {String} author Author of story (optional)
 * @apiParam {String} country Country the story took place (optional)
 * @apiParam {Number} year Year the story took place (optional)
 * @apiParam {String} imageUrl Url of the image associated with the story  (optional)
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP 201 Created
 *     {
 *        "id": 11,
          "title": "Story title",
          "author": "Anonymous",
          "country": "Story country",
          "story": "Example story content",
          "year": 2019,
          "imageUrl": "http://example.com",
          "approved": false,
          "approvedBy": null
 *     }
 *
 * @apiError MissingParameters Missing required fields 
 * @apiError ServerError Internal server error
 *
 * @apiErrorExample {json} MissingParameters
 *     HTTP 400 Bad Request
 *     {
 *        "message": "Title and story are required"
 *     }
 * 
 * @apiErrorExample {json} ServerError
 *     HTTP 500 Internal Server Error
 *     {
 *       "message": "Error getting stories"
 *     }
*/

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

/** 
 * @api {get} /api/stories List all submitted stories
 * @apiName GetAllSubmittedStories
 * @apiGroup Stories (restricted)
 * @apiVersion 1.0.0
 * 
 * @apiHeader {String} authorization Requires authorization token 
 *  
 * @apiSuccessExample {json} Success-Response:
 *    HTTP 200 OK
 *    [
 *      {
  *       "id": 1,
          "title": "My little daughter died and my children and I were injured",
          "author": "Um Osama",
          "country": "Syria",
          "story": "She screamed a scream that made my heart ache. Then her body dropped dead in my hands. That is how I see Syria now. That's our country that we used to live in. It was a horrible night. The military aircraft was above us, we heard noises of explosive barrels and rockets that were falling everywhere around us. I took my kids and went to an agricultural land near the outskirts of the village to search for a place where I could guarantee safety for my little children. As soon as we sat under one of the olive trees an aircraft bombed the place with cluster bombs. My little daughter died and my children and I were injured.",
          "year": null,
          "imageUrl": "https://www.islamic-relief.org/wp-content/uploads/2016/09/Um-Osama.jpg",
          "approved": true,
          "approvedBy": 1
        }
        ...
 *    ]
 *
 * @apiError ServerError Internal server error
 *
 * @apiErrorExample {json} ServerError
 *     HTTP 500 Internal Server Error
 *     {
 *       "message": "Error getting all stories"
 *     }
*/

//get all submitted stories
router.get('/stories', authenticate, async (req, res) => {
  try {
    const stories = await storyDb.findStories();
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: 'Error getting all stories'})
  }
})

/** 
 * @api {get} /api/stories/:id List an story by id
 * @apiName GetStorybyId
 * @apiGroup Stories (restricted)
 * @apiVersion 1.0.0
 *  
 * @apiHeader {String} authorization Requires authorization token 
 * 
 * @apiSuccessExample {json} Success-Response:
 *    HTTP 200 OK
 *    {
        "id": 10,
        "title": "Trying to start a new chapter",
        "author": "Sabri",
        "country": "Syria",
        "story": "He fled his home in Aleppo, Syria and is currently living in Paiania, Greece. Sabri shared his story with us through Emfasis, a Greek organization responding to the needs of Syrian refugees in Greece and implementing a photography project to help Syrian children address psychological problems. Sabri is 16 years old.\n\"I am currently staying at a guesthouse for minors and families in Paiania, just outside Athens, Greece with my family. I'd like to go to Germany. We already know my family and I were granted permission to relocate to a German city. We are hoping to start a new page in our lives. I wish I could make people love each other — that is my dream.\"",
        "year": null,
        "imageUrl": "https://miro.medium.com/max/1500/1*MLWVHfSc6-1YhBpkV_inVA.jpeg",
        "approved": true,
        "approvedBy": 2
      }
 * 
 * @apiError NoStoryWasFound No story was found
 * @apiError ServerError Internal server error
 * 
 * @apiErrorExample {json} NoStoryWasFound
 *     HTTP 404 Not Found
 *     {
 *       "message": "No story of this ID exists"
 *     }
 * 
 * @apiErrorExample {json} ServerError
 *     HTTP 500 Internal Server Error
 *     {
 *       "message": "Error getting story"
 *     }
*/

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
    res.status(500).json({ message: 'Error getting story'})
  }
})

/** 
 * @api {put} /api/stories/:id Approve a story
 * @apiName ApproveStory
 * @apiGroup Stories (restricted)
 * @apiVersion 1.0.0
 * 
 * @apiHeader {String} authorization Requires authorization token
 *  
 * @apiSuccessExample {json} Success-Response:
 *    HTTP 200 OK
 *    {
*       "id": 11,
        "title": "Story title",
        "author": "Anonymous",
        "country": "Story country",
        "story": "Example story content",
        "year": 2019,
        "imageUrl": "http://example.com/story.jpg",
        "approved": true,
        "approvedBy": 1
 *    }
 *
 * @apiError StoryNotFound No story was found
 * @apiError ServerError Internal server error
 * 
 * @apiErrorExample {json} StoryNotFound
 *     HTTP 404 Not Found
 *     {
 *       "message": "No user of this ID exists"
 *     }
 *  
 * @apiErrorExample {json} ServerError
 *     HTTP 500 Internal Server Error
 *     {
 *       "message": "Error approving story"
 *     }
*/

//approve a story
router.put('/stories/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const story = await storyDb.findStoryById(id);

    if (story) {
      if (story.approved) {
        res.status(405).json({ message: 'Story has already been approved'});
      } else {
        const updates = {
          approved: true,
          approvedBy: req.userId
        }
        const updatedStory = await storyDb.updateStory(id, updates);
        res.status(200).json(updatedStory);
      }
    } else {
      res.status(404).json({ message: 'No story of this ID exists'});
    }
  } catch (error) {
    res.status(500).json({ message: 'Error approving story'});
  }
})

/** 
 * @api {delete} /api/stories/:id Delete a story
 * @apiName DeleteStory
 * @apiGroup Stories (restricted)
 * @apiVersion 1.0.0
 * 
 * @apiHeader {String} authorization Requires authorization token
 *  
 * @apiSuccessExample {json} Success-Response:
 *    HTTP 200 OK
 *    {
        "removed": {
          "id": 13,
          "title": "Bad stor title",
          "author": "Anonymous",
          "country": "Bad story country",
          "story": "Bad story content",
          "year": null,
          "imageUrl": "https://badstory.com/story.jpg",
          "approved": false,
          "approvedBy": null
        }
      }
 *
 * @apiError StoryNotFound No story was found
 * @apiError ServerError Internal server error
 * 
 * @apiErrorExample {json} StoryNotFound
 *     HTTP 404 Not Found
 *     {
 *       "message": "No story of this ID exists"
 *     }
 *  
 * @apiErrorExample {json} ServerError
 *     HTTP 500 Internal Server Error
 *     {
 *       "message": "Error deleting story"
 *     }
*/

//delete a story
router.delete('/stories/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const toDelete = await storyDb.findStoryById(id);
    if (toDelete) {
      if (toDelete.approved) {
        res.status(405).json({ message: 'Cannot delete approved story'});
      } else {
        const deleted = await storyDb.deleteStory(id);
        res.status(200).json({removed: toDelete});
      }  
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