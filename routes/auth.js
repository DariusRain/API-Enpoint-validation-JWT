const router = require('express').Router();
const Usermodel = require('../model/User')
router.post('/', (req, res) => {
    router.send('On post route')
})


module.exports = router;