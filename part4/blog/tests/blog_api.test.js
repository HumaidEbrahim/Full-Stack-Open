const Blog = require('../models/blog')
const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../api')

const api = supertest(app)

test('blogs are returned as json'), async () =>
{
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}