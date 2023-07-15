const express = require("express");
const { signup, login, verifyToken, getUser,refreshToken, logout } = require("../controllers/user-controllers");
const {addProblem, getProblems, getProblemDetails} = require('../controllers/problem-controllers');
const { compileCode } = require("../controllers/submission-controllers");
const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);
router.get('/user', verifyToken, getUser);
router.get('/refresh', refreshToken, verifyToken, getUser);
router.post('/logout',verifyToken, logout);
router.post('/addproblem', addProblem);
router.get('/problems', getProblems);
router.get('/solve/:problemId', getProblemDetails);
router.post('/solve/:problemId', compileCode);

module.exports = router; 