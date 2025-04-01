const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

const blogSchema = mongoose.Schema({
    title: String,
    authour: String,
    url: String,
    likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)
.then(() => console.log("Successfully connected to mongo"))
.catch(error => console.log(error.message))

app.use(express.json())

app.get('/', (request,response) =>
{
    response.send('Hello World')
})

app.get('/api/blogs' , (request, response) => 
{
    Blog.find({}).then(notes => response.json(notes))
})

app.post('/api/blogs' , (request, response) =>
{
    const blog = new Blog(request.body)

    blog.save().then((result) =>  response.json(result))
    
})

app.listen(3001)
console.log(`Server running on port http://localhost:3001`)