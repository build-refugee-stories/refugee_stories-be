# Refugee Stories v1.0.0

API for Refugee Stories

- [Auth](#auth)
	- [Login admin](#login-admin)
	- [Register new admin](#register-new-admin)
	
- [Stories__public_](#stories__public_)
	- [Add a new story](#add-a-new-story)
	- [List all approved stories](#list-all-approved-stories)
	- [List an approved story by id](#list-an-approved-story-by-id)
	
- [Stories__restricted_](#stories__restricted_)
	- [Approve a story](#approve-a-story)
	- [Delete a story](#delete-a-story)
	- [List all submitted stories](#list-all-submitted-stories)
	- [List an story by id](#list-an-story-by-id)
	
- [Users](#users)
	- [Approve an user](#approve-an-user)
	- [Delete an user](#delete-an-user)
	- [List all pending users](#list-all-pending-users)
	- [List all users](#list-all-users)
	- [List an user by id](#list-an-user-by-id)
	


# Auth

## Login admin



	POST /api/login


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			|  <p>User email</p>							|
| password			| String			|  <p>User password</p>							|

### Success Response

Success-Response:

```
HTTP 200 OK
{
   "message": "hello Testuser",
      "userId": 1,
      "email": "email@email.com",
      "firstName": "Testuser",
      "isAdmin": true,
      "token": //string
}
```
### Error Response

AdminStatusPending

```
HTTP 401 Unauthorized
 {
    "message": "User approval status pending"
 }
```
InvalidCredentials

```
  HTTP 401 Unauthorized
{
   "message": "Invalid credentials"
}
```
## Register new admin



	POST /api/register


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			|  <p>User email</p>							|
| password			| String			|  <p>User password</p>							|
| firstName			| String			|  <p>user first name</p>							|
| lastName			| String			|  <p>User Last name</p>							|

### Success Response

Success-Response:

```
HTTP 201 Created
{
   "message": "register success",
      "id": 1,
      "email": "email@email.com"
}
```
### Error Response

MissingParameters

```
HTTP 400 Bad Request
{
   "message": "Email, full name, and password are required"
}
```
# Stories__public_

## Add a new story



	POST /api/public


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| title			| String			|  <p>Title of story (unique, required)</p>							|
| story			| String			|  <p>Story content (required)</p>							|
| author			| String			|  <p>Author of story (optional)</p>							|
| country			| String			|  <p>Country the story took place (optional)</p>							|
| year			| Number			|  <p>Year the story took place (optional)</p>							|
| imageUrl			| String			|  <p>Url of the image associated with the story  (optional)</p>							|

### Success Response

Success-Response:

```
HTTP 201 Created
{
   "id": 11,
      "title": "Story title",
      "author": "Anonymous",
      "country": "Story country",
      "story": "Example story content",
      "year": 2019,
      "imageUrl": "http://example.com",
      "approved": false,
      "approvedBy": null
}
```
### Error Response

MissingParameters

```
HTTP 400 Bad Request
{
   "message": "Title and story are required"
}
```
ServerError

```
HTTP 500 Internal Server Error
{
  "message": "Error getting stories"
}
```
## List all approved stories



	GET /api/public


### Success Response

Success-Response:

```
HTTP 200 OK
[
  {
   "id": 1,
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
]
```
### Error Response

ServerError

```
HTTP 500 Internal Server Error
{
  "message": "Error getting stories"
}
```
## List an approved story by id



	GET /api/public/:id


### Success Response

Success-Response:

```
HTTP 200 OK
{
   "id": 5,
     "title": "15 year veteran teacher can't find a teaching job after relocating",
     "author": "Hannan",
     "country": "Iraq",
     "story": "Finding jobs here depends on whether you have friends or relatives to help you. I have 15 years' experience in teaching but till now no employers have replied to me. I've applied to all the NGOs, giving them my CV, but I've seen that they'll take another person who doesn't have any experience or knowledge about the job. Because I don't have the opportunity to teach, most of the time I feel angry, aggressive and nervous, having pressure because I can't do what I'm supposed to do. The women can't go out alone. I want to go out shopping or to the market or to the hospital and I feel like I'm in prison. I have to get permission to go anywhere. The difference between living here and living in Syria is the difference between the sky and the earth. I can't tell you in words how different things are.",
     "year": null,
     "imageUrl": "https://www.islamic-relief.org/wp-content/uploads/2016/09/Hannan-1024x683.jpg",
     "approved": true,
     "approvedBy": 1
   }
```
### Error Response

NoStoryWasFound

```
HTTP 404 Not Found
{
  "message": "No story of this ID exists or story has not been approved yet"
}
```
ServerError

```
HTTP 500 Internal Server Error
{
  "message": "Error getting approved story"
}
```
# Stories__restricted_

## Approve a story



	PUT /api/stories/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization			| String			|  <p>Requires authorization token</p>							|

### Success Response

Success-Response:

```
HTTP 200 OK
{
   "id": 11,
     "title": "Story title",
     "author": "Anonymous",
     "country": "Story country",
     "story": "Example story content",
     "year": 2019,
     "imageUrl": "http://example.com/story.jpg",
     "approved": true,
     "approvedBy": 1
}
```
### Error Response

StoryNotFound

```
HTTP 404 Not Found
{
  "message": "No user of this ID exists"
}
```
ServerError

```
HTTP 500 Internal Server Error
{
  "message": "Error approving story"
}
```
## Delete a story



	DELETE /api/stories/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization			| String			|  <p>Requires authorization token</p>							|

### Success Response

Success-Response:

```
HTTP 200 OK
{
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
```
### Error Response

StoryNotFound

```
HTTP 404 Not Found
{
  "message": "No story of this ID exists"
}
```
ServerError

```
HTTP 500 Internal Server Error
{
  "message": "Error deleting story"
}
```
## List all submitted stories



	GET /api/stories

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization			| String			|  <p>Requires authorization token</p>							|

### Success Response

Success-Response:

```
HTTP 200 OK
[
  {
   "id": 1,
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
]
```
### Error Response

ServerError

```
HTTP 500 Internal Server Error
{
  "message": "Error getting all stories"
}
```
## List an story by id



	GET /api/stories/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization			| String			|  <p>Requires authorization token</p>							|

### Success Response

Success-Response:

```
HTTP 200 OK
{
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
```
### Error Response

NoStoryWasFound

```
HTTP 404 Not Found
{
  "message": "No story of this ID exists"
}
```
ServerError

```
HTTP 500 Internal Server Error
{
  "message": "Error getting story"
}
```
# Users

## Approve an user



	PUT /api/users/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization			| String			|  <p>Requires authorization token</p>							|

### Success Response

Success-Response:

```
HTTP 200 OK
{ 
  "id": 2,
     "email": "pending@pending.com",
     "firstName": "Pendinguser",
     "lastName": "Pendinguser",
     "isAdmin": true
   }
```
### Error Response

UserNotFound

```
HTTP 404 Not Found
{
  "message": "No user of this ID exists"
}
```
ServerError

```
HTTP 500 Internal Server Error
{
  "message": "Error approving user"
}
```
## Delete an user



	DELETE /api/users/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization			| String			|  <p>Requires authorization token</p>							|

### Success Response

Success-Response:

```
HTTP 200 OK
{ 
  "removed": {
    "id": 1,
       "email": "delete@delete.com",
       "firstName": "Baduser",
       "lastName": "Baduser",
       "isAdmin": false
     }
   }
```
### Error Response

UserNotFound

```
HTTP 404 Not Found
{
  "message": "No user of this ID exists"
}
```
ServerError

```
HTTP 500 Internal Server Error
{
  "message": "Error deleting user"
}
```
## List all pending users



	GET /api/users/pending

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization			| String			|  <p>Requires authorization token</p>							|

### Success Response

Success-Response:

```
HTTP 200 OK
[
  {   
       "id": 2,
       "email": "pending@pending.com",
       "firstName": "Pendinguser",
       "lastName": "Pendinguser",
       "isAdmin": false
     },
     ...
]
```
### Error Response

ServerError

```
HTTP 500 Internal Server Error
{
  "message": "Error getting pending users"
}
```
## List all users



	GET /api/users

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization			| String			|  <p>Requires authorization token</p>							|

### Success Response

Success-Response:

```
HTTP 200 OK
[
  {   
       "id": 1,
       "email": "email@email.com",
       "firstName": "Testuser",
       "lastName": "Testuser",
       "isAdmin": true
     },
     ...
]
```
### Error Response

ServerError

```
HTTP 500 Internal Server Error
{
  "message": "Error getting users"
}
```
## List an user by id



	GET /api/users/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization			| String			|  <p>Requires authorization token</p>							|

### Success Response

Success-Response:

```
HTTP 200 OK
{ 
  "id": 1,
     "email": "email@email.com",
     "firstName": "Testuser",
     "lastName": "Testuser",
     "isAdmin": true
   }
```
### Error Response

UserNotFound

```
HTTP 404 Not Found
{
  "message": "No user of this ID exists"
}
```
ServerError

```
HTTP 500 Internal Server Error
{
  "message": "Error getting user"
}
```

