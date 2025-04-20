const express = require('express');
const { register, getUsers, login} = require('../controllers/user.controller');
const router = express.Router();


router.post('/login', login);

/* 
router.post('/recovery', recovery); 
*/

router.get('/listUsers', getUsers); 

module.exports = router;