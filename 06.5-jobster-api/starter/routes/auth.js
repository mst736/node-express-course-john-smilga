const express = require('express')
const router = express.Router()
const { register, login, updateUser } = require('../controllers/auth')
const auth = require('../middleware/authentication')
const testuser = require('../middleware/testuser')
const apiLimiter = require('../middleware/api-limiter')
router.post('/register',apiLimiter, register)
router.post('/login',apiLimiter, login)
router.patch('/updateUser',auth, testuser, updateUser)
module.exports = router
