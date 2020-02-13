const router = require('express').Router();
const User = require('../model/User')


//Add async for any function fetching data.
router.post('/register', async (req, res) => {
    const user =  new User( {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
//User.save() returns a promise using try and catch to consume 
// the promise value of either resolve or reject
// are similar to using .then()

    try {
        const savedUser = await user.save() 
        res.status(201).send(savedUser) //Resolved
    }
    catch (err) {
        res.status(401).send(err) //Rejected
    }

})


module.exports = router;