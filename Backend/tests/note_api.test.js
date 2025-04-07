const Note = require('../models/note')
const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

beforeEach(async () =>
{
    await Note.deleteMany({})

    const noteObjects = helper.initialNotes
        .map(note => new Note(note))
    const promiseArray = noteObjects.map(note => note.save())
    await Promise.all(promiseArray)
})

test('notes are returned as json', async () =>
{
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () =>
{
    const notesAtEnd = await api.get('/api/notes')

    assert.strictEqual(notesAtEnd.body.length, helper.initialNotes.length)
})

test('the first note is about HTTP methods', async () =>
{
    const notesAtEnd = await api.get('/api/notes')

    const contents = notesAtEnd.body.map(e => e.content)
    assert(contents.includes('HTML is easy'))

})


describe('Async await', () =>
{
    test('a valid note can be added', async () =>
    {
        const newNote =
        {
            content: 'async/await simplifies making async calls',
            important: true,
        }

        await api
            .post('/api/notes')
            .send(newNote)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const notesAtEnd= await helper.notesInDb()

        const contents = notesAtEnd.map(r => r.content)

        assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

        assert(contents.includes('async/await simplifies making async calls'))
    })

    test('note without content not added', async () =>
    {
        const newNote =
        {
            important:true
        }

        await api
            .post('/api/notes')
            .send(newNote)
            .expect(400)

        const notesAtEnd = await helper.notesInDb()

        assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
    })

    test('a specific note can be viewed', async () => {
        const notesAtStart = await helper.notesInDb()

        const noteToView = notesAtStart[0]

        const resultNote = await api
            .get(`/api/notes/${noteToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.deepStrictEqual(resultNote.body, noteToView)
    })

    test('a note can be deleted', async () =>
    {
        const notesAtStart = await helper.notesInDb()
        const noteToDelete = notesAtStart[0]

        await api
            .delete(`/api/notes/${noteToDelete.id}`)
            .expect(204)

        const notesAtEnd = await helper.notesInDb()

        const contents = notesAtEnd.map(r => r.content)
        assert(!contents.includes(noteToDelete.content))

        assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
    })

})

after(async () =>
{
    await mongoose.connection.close()
})
