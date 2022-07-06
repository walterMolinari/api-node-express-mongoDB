const mongoose = require('mongoose')

const Note = require('../models/Note')

const request = require('supertest')
const { server ,app } = require('../index')

const api = request(app)

const initialNotes = [
    {
        content: 'note by test with jest number one',
        important: true,
        date: new Date()
    },
    {
        content: 'note by test with jest number two',
        important: true,
        date: new Date()
    }
]
let response;
let responseID;
let id;

beforeAll( async () => {
    (await Note.deleteMany({})).deletedCount
    const note1 = new Note(initialNotes[0])
    await note1.save()
        
    const note2 = new Note(initialNotes[1])
    await note2.save()

    response = await api.get('/api/notes')
    id = response.body[0].id
    responseID =  await api.get(`/api/notes/${id}`)
})    


describe( 'api notes test', () => {

    describe('method GET /api/notes (all notes)', () => {

        /*test('return status 200 and content type is json', async () => {
            await api
            .get('/api/notes')
            .expect(200)
            .expect('Content-Type', /application\/json/)
          })*/
        test('return status 200', async () => {
            expect(response.status).toBe(200)
        })
        test('espected content type json', async () => {
            expect(response.headers['content-type']).toContain('json')
        })
        test('return notes length 2', async () => {
            expect(response.body).toHaveLength(initialNotes.length)
        })
    })
    describe('method GET /api/notes (by id)', () => {

        test('return status 200', async () => {
            expect(responseID.status).toBe(200)
        })
        test('expected content type json', async () => {
            expect(responseID.headers['content-type']).toContain('json')
        })

    })


})

afterAll( async () => {
    await mongoose.connection.close()
    server.close()
})