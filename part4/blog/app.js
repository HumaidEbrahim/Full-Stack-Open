const mongoose = require('mongoose')
const express = require('express')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

const app = express()

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
.then(() => console.log("Successfully connected to mongo"))
.catch(error => console.log(error.message))

app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app