define({ "api": [
  {
    "type": "post",
    "url": "/api/login",
    "title": "Login admin",
    "name": "LoginAdmin",
    "group": "Auth",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP 200 OK\n{\n   \"message\": \"hello Testuser\",\n      \"userId\": 1,\n      \"email\": \"email@email.com\",\n      \"firstName\": \"Testuser\",\n      \"isAdmin\": true,\n      \"token\": //string\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingParameters",
            "description": "<p>Missing required fields</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AdminStatusPending",
            "description": "<p>User has not been approved as an admin</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentials",
            "description": "<p>Email or password does not match</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "AdminStatusPending",
          "content": "HTTP 401 Unauthorized\n {\n    \"message\": \"User approval status pending\"\n }",
          "type": "json"
        },
        {
          "title": "InvalidCredentials",
          "content": "  HTTP 401 Unauthorized\n{\n   \"message\": \"Invalid credentials\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/auth/auth-router.js",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "https://refugee-stories-api-082019.herokuapp.com/api/login"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/register",
    "title": "Register new admin",
    "name": "RegisterAdmin",
    "group": "Auth",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>user first name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>User Last name</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP 201 Created\n{\n   \"message\": \"register success\",\n      \"id\": 1,\n      \"email\": \"email@email.com\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingParameters",
            "description": "<p>Missing required fields</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidEmail",
            "description": "<p>Email address is invalid</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TakenEmail",
            "description": "<p>Email address is already in use</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidPassword",
            "description": "<p>Password is less than 6 characters long</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "MissingParameters",
          "content": "HTTP 400 Bad Request\n{\n   \"message\": \"Email, full name, and password are required\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/auth/auth-router.js",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "https://refugee-stories-api-082019.herokuapp.com/api/register"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/public",
    "title": "Add a new story",
    "name": "AddStory",
    "group": "Stories__public_",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of story (unique, required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "story",
            "description": "<p>Story content (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>Author of story (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>Country the story took place (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "year",
            "description": "<p>Year the story took place (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "imageUrl",
            "description": "<p>Url of the image associated with the story  (optional)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP 201 Created\n{\n   \"id\": 11,\n      \"title\": \"Story title\",\n      \"author\": \"Anonymous\",\n      \"country\": \"Story country\",\n      \"story\": \"Example story content\",\n      \"year\": 2019,\n      \"imageUrl\": \"http://example.com\",\n      \"approved\": false,\n      \"approvedBy\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingParameters",
            "description": "<p>Missing required fields</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Internal server error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "MissingParameters",
          "content": "HTTP 400 Bad Request\n{\n   \"message\": \"Title and story are required\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError",
          "content": "HTTP 500 Internal Server Error\n{\n  \"message\": \"Error getting stories\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/story/story-router.js",
    "groupTitle": "Stories__public_",
    "sampleRequest": [
      {
        "url": "https://refugee-stories-api-082019.herokuapp.com/api/public"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/public",
    "title": "List all approved stories",
    "name": "GetAllApprovedStories",
    "group": "Stories__public_",
    "version": "1.0.0",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "stories.id",
            "description": "<p>User ID</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "stories.title",
            "description": "<p>Title of story</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "stories.author",
            "description": "<p>Author of story</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "stories.country",
            "description": "<p>Country the story took place</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "stories.year",
            "description": "<p>Year the story took place</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "stories.imageUrl",
            "description": "<p>Url of the image associated with the story</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "stories.approved",
            "description": "<p>Story's approval status</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "stories.approvedBy",
            "description": "<p>Id of admin who approved the story</p>"
          }
        ],
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "stories",
            "description": "<p>List of stories</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP 200 OK\n[\n  {\n   \"id\": 1,\n       \"title\": \"My little daughter died and my children and I were injured\",\n       \"author\": \"Um Osama\",\n       \"country\": \"Syria\",\n       \"story\": \"She screamed a scream that made my heart ache. Then her body dropped dead in my hands. That is how I see Syria now. That's our country that we used to live in. It was a horrible night. The military aircraft was above us, we heard noises of explosive barrels and rockets that were falling everywhere around us. I took my kids and went to an agricultural land near the outskirts of the village to search for a place where I could guarantee safety for my little children. As soon as we sat under one of the olive trees an aircraft bombed the place with cluster bombs. My little daughter died and my children and I were injured.\",\n       \"year\": null,\n       \"imageUrl\": \"https://www.islamic-relief.org/wp-content/uploads/2016/09/Um-Osama.jpg\",\n       \"approved\": true,\n       \"approvedBy\": 1\n     }\n     ...\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Internal server error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ServerError",
          "content": "HTTP 500 Internal Server Error\n{\n  \"message\": \"Error getting stories\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/story/story-router.js",
    "groupTitle": "Stories__public_",
    "sampleRequest": [
      {
        "url": "https://refugee-stories-api-082019.herokuapp.com/api/public"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/public/:id",
    "title": "List an approved story by id",
    "name": "GetApprovedStorybyId",
    "group": "Stories__public_",
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP 200 OK\n{\n   \"id\": 5,\n     \"title\": \"15 year veteran teacher can't find a teaching job after relocating\",\n     \"author\": \"Hannan\",\n     \"country\": \"Iraq\",\n     \"story\": \"Finding jobs here depends on whether you have friends or relatives to help you. I have 15 years' experience in teaching but till now no employers have replied to me. I've applied to all the NGOs, giving them my CV, but I've seen that they'll take another person who doesn't have any experience or knowledge about the job. Because I don't have the opportunity to teach, most of the time I feel angry, aggressive and nervous, having pressure because I can't do what I'm supposed to do. The women can't go out alone. I want to go out shopping or to the market or to the hospital and I feel like I'm in prison. I have to get permission to go anywhere. The difference between living here and living in Syria is the difference between the sky and the earth. I can't tell you in words how different things are.\",\n     \"year\": null,\n     \"imageUrl\": \"https://www.islamic-relief.org/wp-content/uploads/2016/09/Hannan-1024x683.jpg\",\n     \"approved\": true,\n     \"approvedBy\": 1\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoStoryWasFound",
            "description": "<p>No story was found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Internal server error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NoStoryWasFound",
          "content": "HTTP 404 Not Found\n{\n  \"message\": \"No story of this ID exists or story has not been approved yet\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError",
          "content": "HTTP 500 Internal Server Error\n{\n  \"message\": \"Error getting approved story\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/story/story-router.js",
    "groupTitle": "Stories__public_",
    "sampleRequest": [
      {
        "url": "https://refugee-stories-api-082019.herokuapp.com/api/public/:id"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/stories/:id",
    "title": "Approve a story",
    "name": "ApproveStory",
    "group": "Stories__restricted_",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Requires authorization token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP 200 OK\n{\n   \"id\": 11,\n     \"title\": \"Story title\",\n     \"author\": \"Anonymous\",\n     \"country\": \"Story country\",\n     \"story\": \"Example story content\",\n     \"year\": 2019,\n     \"imageUrl\": \"http://example.com/story.jpg\",\n     \"approved\": true,\n     \"approvedBy\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "StoryNotFound",
            "description": "<p>No story was found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Internal server error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "StoryNotFound",
          "content": "HTTP 404 Not Found\n{\n  \"message\": \"No user of this ID exists\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError",
          "content": "HTTP 500 Internal Server Error\n{\n  \"message\": \"Error approving story\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/story/story-router.js",
    "groupTitle": "Stories__restricted_",
    "sampleRequest": [
      {
        "url": "https://refugee-stories-api-082019.herokuapp.com/api/stories/:id"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/api/stories/:id",
    "title": "Delete a story",
    "name": "DeleteStory",
    "group": "Stories__restricted_",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Requires authorization token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP 200 OK\n{\n     \"removed\": {\n       \"id\": 13,\n       \"title\": \"Bad stor title\",\n       \"author\": \"Anonymous\",\n       \"country\": \"Bad story country\",\n       \"story\": \"Bad story content\",\n       \"year\": null,\n       \"imageUrl\": \"https://badstory.com/story.jpg\",\n       \"approved\": false,\n       \"approvedBy\": null\n     }\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "StoryNotFound",
            "description": "<p>No story was found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Internal server error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "StoryNotFound",
          "content": "HTTP 404 Not Found\n{\n  \"message\": \"No story of this ID exists\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError",
          "content": "HTTP 500 Internal Server Error\n{\n  \"message\": \"Error deleting story\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/story/story-router.js",
    "groupTitle": "Stories__restricted_",
    "sampleRequest": [
      {
        "url": "https://refugee-stories-api-082019.herokuapp.com/api/stories/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/stories",
    "title": "List all submitted stories",
    "name": "GetAllSubmittedStories",
    "group": "Stories__restricted_",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Requires authorization token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP 200 OK\n[\n  {\n   \"id\": 1,\n       \"title\": \"My little daughter died and my children and I were injured\",\n       \"author\": \"Um Osama\",\n       \"country\": \"Syria\",\n       \"story\": \"She screamed a scream that made my heart ache. Then her body dropped dead in my hands. That is how I see Syria now. That's our country that we used to live in. It was a horrible night. The military aircraft was above us, we heard noises of explosive barrels and rockets that were falling everywhere around us. I took my kids and went to an agricultural land near the outskirts of the village to search for a place where I could guarantee safety for my little children. As soon as we sat under one of the olive trees an aircraft bombed the place with cluster bombs. My little daughter died and my children and I were injured.\",\n       \"year\": null,\n       \"imageUrl\": \"https://www.islamic-relief.org/wp-content/uploads/2016/09/Um-Osama.jpg\",\n       \"approved\": true,\n       \"approvedBy\": 1\n     }\n     ...\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Internal server error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ServerError",
          "content": "HTTP 500 Internal Server Error\n{\n  \"message\": \"Error getting all stories\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/story/story-router.js",
    "groupTitle": "Stories__restricted_",
    "sampleRequest": [
      {
        "url": "https://refugee-stories-api-082019.herokuapp.com/api/stories"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/stories/:id",
    "title": "List an story by id",
    "name": "GetStorybyId",
    "group": "Stories__restricted_",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Requires authorization token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP 200 OK\n{\n     \"id\": 10,\n     \"title\": \"Trying to start a new chapter\",\n     \"author\": \"Sabri\",\n     \"country\": \"Syria\",\n     \"story\": \"He fled his home in Aleppo, Syria and is currently living in Paiania, Greece. Sabri shared his story with us through Emfasis, a Greek organization responding to the needs of Syrian refugees in Greece and implementing a photography project to help Syrian children address psychological problems. Sabri is 16 years old.\\n\\\"I am currently staying at a guesthouse for minors and families in Paiania, just outside Athens, Greece with my family. I'd like to go to Germany. We already know my family and I were granted permission to relocate to a German city. We are hoping to start a new page in our lives. I wish I could make people love each other — that is my dream.\\\"\",\n     \"year\": null,\n     \"imageUrl\": \"https://miro.medium.com/max/1500/1*MLWVHfSc6-1YhBpkV_inVA.jpeg\",\n     \"approved\": true,\n     \"approvedBy\": 2\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoStoryWasFound",
            "description": "<p>No story was found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Internal server error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NoStoryWasFound",
          "content": "HTTP 404 Not Found\n{\n  \"message\": \"No story of this ID exists\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError",
          "content": "HTTP 500 Internal Server Error\n{\n  \"message\": \"Error getting story\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/story/story-router.js",
    "groupTitle": "Stories__restricted_",
    "sampleRequest": [
      {
        "url": "https://refugee-stories-api-082019.herokuapp.com/api/stories/:id"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/users/:id",
    "title": "Approve an user",
    "name": "ApproveUser",
    "group": "Users",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Requires authorization token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP 200 OK\n{ \n  \"id\": 2,\n     \"email\": \"pending@pending.com\",\n     \"firstName\": \"Pendinguser\",\n     \"lastName\": \"Pendinguser\",\n     \"isAdmin\": true\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>No user was found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Internal server error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "UserNotFound",
          "content": "HTTP 404 Not Found\n{\n  \"message\": \"No user of this ID exists\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError",
          "content": "HTTP 500 Internal Server Error\n{\n  \"message\": \"Error approving user\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/user/user-router.js",
    "groupTitle": "Users",
    "sampleRequest": [
      {
        "url": "https://refugee-stories-api-082019.herokuapp.com/api/users/:id"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/api/users/:id",
    "title": "Delete an user",
    "name": "DeleteUser",
    "group": "Users",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Requires authorization token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP 200 OK\n{ \n  \"removed\": {\n    \"id\": 1,\n       \"email\": \"delete@delete.com\",\n       \"firstName\": \"Baduser\",\n       \"lastName\": \"Baduser\",\n       \"isAdmin\": false\n     }\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>No user was found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Internal server error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "UserNotFound",
          "content": "HTTP 404 Not Found\n{\n  \"message\": \"No user of this ID exists\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError",
          "content": "HTTP 500 Internal Server Error\n{\n  \"message\": \"Error deleting user\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/user/user-router.js",
    "groupTitle": "Users",
    "sampleRequest": [
      {
        "url": "https://refugee-stories-api-082019.herokuapp.com/api/users/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/users/pending",
    "title": "List all pending users",
    "name": "GetAllPendingUsers",
    "group": "Users",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Requires authorization token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "users.id",
            "description": "<p>User id</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "users.email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "users.firstName",
            "description": "<p>User's first name</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "users.lastName",
            "description": "<p>User's last name</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "users.isAdmin",
            "description": "<p>User's admin status (false)</p>"
          }
        ],
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "users",
            "description": "<p>List of users</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP 200 OK\n[\n  {   \n       \"id\": 2,\n       \"email\": \"pending@pending.com\",\n       \"firstName\": \"Pendinguser\",\n       \"lastName\": \"Pendinguser\",\n       \"isAdmin\": false\n     },\n     ...\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Internal server error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ServerError",
          "content": "HTTP 500 Internal Server Error\n{\n  \"message\": \"Error getting pending users\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/user/user-router.js",
    "groupTitle": "Users",
    "sampleRequest": [
      {
        "url": "https://refugee-stories-api-082019.herokuapp.com/api/users/pending"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/users",
    "title": "List all users",
    "name": "GetAllUsers",
    "group": "Users",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Requires authorization token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "users.id",
            "description": "<p>User ID</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "users.email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "users.firstName",
            "description": "<p>User's first name</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "users.lastName",
            "description": "<p>User's last name</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "users.isAdmin",
            "description": "<p>User's admin status</p>"
          }
        ],
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "users",
            "description": "<p>List of all users</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP 200 OK\n[\n  {   \n       \"id\": 1,\n       \"email\": \"email@email.com\",\n       \"firstName\": \"Testuser\",\n       \"lastName\": \"Testuser\",\n       \"isAdmin\": true\n     },\n     ...\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Internal server error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ServerError",
          "content": "HTTP 500 Internal Server Error\n{\n  \"message\": \"Error getting users\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/user/user-router.js",
    "groupTitle": "Users",
    "sampleRequest": [
      {
        "url": "https://refugee-stories-api-082019.herokuapp.com/api/users"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/users/:id",
    "title": "List an user by id",
    "name": "GetUserById",
    "group": "Users",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Requires authorization token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP 200 OK\n{ \n  \"id\": 1,\n     \"email\": \"email@email.com\",\n     \"firstName\": \"Testuser\",\n     \"lastName\": \"Testuser\",\n     \"isAdmin\": true\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>No user was found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Internal server error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "UserNotFound",
          "content": "HTTP 404 Not Found\n{\n  \"message\": \"No user of this ID exists\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError",
          "content": "HTTP 500 Internal Server Error\n{\n  \"message\": \"Error getting user\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/user/user-router.js",
    "groupTitle": "Users",
    "sampleRequest": [
      {
        "url": "https://refugee-stories-api-082019.herokuapp.com/api/users/:id"
      }
    ]
  }
] });
