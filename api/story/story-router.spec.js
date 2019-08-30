const request = require('supertest');
const server = require('../server');
const db = require('../../data/data-config');

let token;

describe('story-router', () => {
  beforeAll(done => {
    request(server)
      .post('/api/login')
      .send({
        email: 'admin@example.com',
        password: 'password',
      })
      .end((error, response) => {
        token = response.body.token; 
        done();
      })
  })

  describe('GET /api/public', () => {
    it('should return an array of stories', () => {
      return request(server)
      .get('/api/public')
      .then(response => {
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.status).toBe(200);
      })
    })
  })
  
  describe('GET /api/public/:id', () => {
    it('should return error of 404 as no story has been approved', () => {
      return request(server)
      .get('/api/public/3')
      .then(response => {
        expect(response.status).toBe(404);
      })
    })
  })

  describe('POST /api/public/', () => {
    it('should return an approved story', async () => {
      await db('stories').where('title', 'New story title').del();
      
      return request(server)
        .post('/api/public')
        .send({
          title: 'New story title',
          story: 'New story content',
          author: 'Test Author 1'
        })
        .then(response => {
          expect(response.body.title).toBe('New story title')
          expect(response.status).toBe(201)
        })
    })
  })

  describe('GET /api/stories', () => {
    it('should return an array of stories', () => {
      return request(server)
      .get('/api/stories')
      .set('Authorization', token)
      .then(response => {
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.status).toBe(200);
      })
    })
  })

  describe('GET /api/stories/:id', () => {
    it('should return a story', () => {
      return request(server)
      .get('/api/stories/3')
      .set('Authorization', token)
      .then(response => {
        expect(response.body.id).toBe(3);
        expect(response.status).toBe(200);
      })
    })
  })

  describe('PUT /api/stories/:id', () => {
    it('should update the approved status of the story to true(1)', async () => {
      await db('stories').where('title', 'Title of story to approve').del();
    
      let id = await request(server)
        .post('/api/public')
        .send({
          title: 'Title of story to approve',
          story: 'Content of story to approve'
        })
        .then(response => response.body.id)

      return request(server)
        .put(`/api/stories/${id}`)
        .set('Authorization', token)
        .then(response => {
          expect(response.body.approved).toBe(1)
          expect(response.status).toBe(200)
        })  
    })
  })

  describe('DELETE /api/stories/:id', () => {
    it('should remove a story from the database', async () => { 
      await db('stories').where('title', 'Title of story to delete').del();
    
      let id = await request(server)
        .post('/api/public')
        .send({
          title: 'Title of story to delete',
          story: 'Content of story to delete'
        })
        .then(response => response.body.id)
      
      return request(server)
        .delete(`/api/stories/${id}`)
        .set('Authorization', token)
        .then(response => {
          expect(response.body.removed.title).toBe('Title of story to delete')
          expect(response.status).toBe(200)
        })  
    })

    it('should return 404 error as story of id 200 does not exist', () => {
      return request(server)
      .delete(`/api/stories/200`)
        .set('Authorization', token)
        .then(response => {
          expect(response.status).toBe(404);
        })
    })
  })
})