const express = require('express');
const router = express.Router();
const verifyToken = require('../verifytoken')
router.get('/', verifyToken, (req, res) => {
    res.json({posts: {title: "My post", message: "No access to invalid loggers!"}})
})

module.exports = router