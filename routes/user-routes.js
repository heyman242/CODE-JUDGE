const express = require("express");
const { signup, login } = require("../controllers/user-controllers");

const router = express.Router();

router.get('/', (req,res,next) => {
    res.send("hello world")
});

router.post('/signup', signup);
router.post('/login', login);

module.exports = router; 