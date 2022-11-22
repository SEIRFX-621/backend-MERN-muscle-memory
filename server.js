require('dotenv').config()
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
require('./config/passport')(passport);

// App Set up
const app = express();
const PORT = process.env.PORT || 5000;

/** 
 * NOTE: We turn off urlencoding, because we will be submitting our form data from our react app as json.
 * This is because our react app is a SPA page and we use e.preventDefault() on our form submit event handlers 
 * to prevent full page refreshes, so no default form post behavior, means we can forego the the url encoding
 * used in www.urlencoded POST request bodies.
 */
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // JSON parsing, our POST request bodies will be using JSON
app.use(cors()); // allow all CORS requests
app.use(passport.initialize());

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
    console.log(`Connected to MongoDB at HOST: ${db.host} and PORT: ${db.port}`);
});

db.on('error', (error) => {
    console.log(`Database Error: ${error}`);
})

app.use('/users', require('./controllers/user'));

const server = app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));

module.exports = server;
