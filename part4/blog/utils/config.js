require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = 'mongodb+srv://HumaidEbrahim:YDoKvBrdUsGByrXL@cluster0.imo1i2f.mongodb.net/blogApp?retryWrites=true&w=majority&appName=Cluster0'

module.exports = { PORT, MONGODB_URI }