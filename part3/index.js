const express = require('express')
require('dotenv').config()
const Person = require('./models/person')
const morgan = require('morgan')
const person = require('./models/person')

const app = express()
app.use(express.json())

morgan.token('body', req => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


// routes 
app.get('/', (request, response) => 
{
    const requestTime = new Date().toString()
    response.send(`Phonebook has info for people <br> ${requestTime}`)
})


app.get('/api/persons', (request, response) => 
{
    Person.find({}).then(people => response.json(people))
})


app.get('/api/persons/:id', (request, response) => 
{

    person.findById(request.params.id).then(person => response.json(person))

})

app.delete('/api/persons/:id', (request, response) =>
{
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) =>
{
    const body = request.body

    if (!body)
    {
        return response.status(400).json({ error: "Content is missing" });
    }

    if (!body.name)
    {
        return response.status(400).json({ error: "Name is missing" });
    }

    if (!body.number)
    {
        return response.status(400).json({ error: "Number is missing" });
    }

    const person = new Person(
        {
            name: body.name,
            number: body.number
        })


    person.save().then(savedPerson => response.json(savedPerson))

})


const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port http://localhost:${PORT}`)