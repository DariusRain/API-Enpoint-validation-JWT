const expres = require('express');
const app = expres();
const mongoose = require('mongoose');
const db = process.env.DB;
const port = process.env.PORT;
const authRoute = require('./routes/auth')

//Connect to DB
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true}, () => {
    console.log('Connected to DB!')
})


app.use('/api/user'), authRoute)

app.listen(port, () => {
    console.log('Listening')
})