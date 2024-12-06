const {signup, login} = require('../Controllers/Authcontroller')
const {signupvalidation, loginvalidation} = require('../middlewares/Authvalidation')
const router = require('express').Router();

router.post('/login',loginvalidation,login)
router.post('/signup',signupvalidation,signup)
module.exports = router;