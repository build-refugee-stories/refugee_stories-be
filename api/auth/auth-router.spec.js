const request = require('supertest');
const server = require('../server');
const db = require('../../data/data-config');

describe('auth-router', () => {

  describe('POST /api/register', () => {
    it('should insert an user with status code 201', async () => {
      await db('users').where('email', 'blah@blah.com').del();

      return request(server)
        .post('/api/register')
        .send({
          email: 'blah@blah.com',
          password: 'testing',
          firstName: 'Blah',
          lastName: 'Blahhh'
        })
        .then(response => {
          expect(response.body.email).toBe('blah@blah.com')
          expect(response.status).toBe(201)
        })
    })

    it('should return status 400 due to invalid email', () => {
      return request(server)
        .post('/api/register')
        .send({
          email: 'badEmail@',
          password: 'testing',
          firstName: 'Bad',
          lastName: 'Baddd'
        })
        .then(response => {
          expect(response.status).toBe(400)
        })
    })
  })

  describe('POST /api/login', () => {
    it('should return status 401 as user has not been approved', () => {
      return request(server)
        .post('/api/login')
        .send({
          email: 'blah@blah.com',
          password: 'testing',
        })
        .then(response => {
          expect(response.status).toBe(401)
        })
    })

    it('should return the token the response', () => {
      return request(server)
        .post('/api/login')
        .send({
          email: 'admin@example.com',
          password: 'password',
        })
        .then(response => {
          expect(response.body).toHaveProperty('token')
        })
    })
  })
})