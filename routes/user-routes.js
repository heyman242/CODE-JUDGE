const express = require("express");
const { signup } = require("../controllers/user-controllers");

const router = express.Router();

router.get('/', (req,res,next) => {
    res.send("hello world")
});

router.post('/signup', signup)

module.exports = router; 