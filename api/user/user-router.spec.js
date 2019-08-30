const request = require('supertest');
const server = require('../server');
const db = require('../../data/data-config');

let token;

describe('user-router', () => {
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
  
  describe('GET /api/users', () => {
    it('should return an arry of users', () => {
      return request(server)
      .get('/api/users')
      .set('Authorization', token)
      .then(response => {
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.status).toBe(200);
      })
    })
  })

  describe('GET /api/users/pending', () => {
    it('should return an arry of pending users', () => {
      return request(server)
      .get('/api/users/pending')
      .set('Authorization', token)
      .then(response => {
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.status).toBe(200);
      })
    })
  })

  describe('GET /api/users/:id', () => {
    it('should return a single user', () => {
      return request(server)
      .get('/api/users/1')
      .set('Authorization', token)
      .then(response => {
        expect(response.body.id).toBe(1);
        expect(response.status).toBe(200);
      })
    })

    it('should return 404 error as user of id 200 does not exist', () => {
      return request(server)
      .get('/api/users/200')
      .set('Authorization', token)
      .then(response => {
        expect(response.status).toBe(404);
      })
    })
  })

  describe('PUT /api/users/:id', () => {
    it('should update the user admin status to true(1)', async () => { 
      await db('users').where('email', 'approve@approve.com').del();
    
      let id = await request(server)
        .post('/api/register')
        .send({
          email: 'approve@approve.com',
          password: 'testing',
          firstName: 'Good',
          lastName: 'Goooood'
        })
        .then(response => response.body.id)
      
      return request(server)
        .put(`/api/users/${id}`)
        .set('Authorization', token)
        .then(response => {
          expect(response.body.isAdmin).toBe(1)
          expect(response.status).toBe(200)
        })  
    })
  })

  describe('DELETE /api/users/:id', () => {
    it('should remove a user from the database', async () => { 
      await db('users').where('email', 'delete@delete.com').del();
    
      let id = await request(server)
        .post('/api/register')
        .send({
          email: 'delete@delete.com',
          password: 'testing',
          firstName: 'Nogood',
          lastName: 'Nogoooood'
        })
        .then(response => response.body.id)
      
      return request(server)
        .delete(`/api/users/${id}`)
        .set('Authorization', token)
        .then(response => {
          expect(response.body.removed.email).toBe('delete@delete.com')
          expect(response.status).toBe(200)
        })  
    })

    it('should return 404 error as user of id 200 does not exist', () => {
      return request(server)
      .get('/api/users/200')
      .set('Authorization', token)
      .then(response => {
        expect(response.status).toBe(404);
      })
    })
  })
})