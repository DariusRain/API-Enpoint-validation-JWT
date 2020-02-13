const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = process.env.DB;
const port = process.env.PORT;

//Import routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
//Connect to DB
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true}, () => {
    console.log('Connected to DB!')
})

//Middlewares
app.use(express.json())

app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)
app.listen(port, () => {
    console.log('Listening')
})