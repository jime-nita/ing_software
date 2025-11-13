const express = require('express')
const router = express.Router()

const {login, register, data} = require('../controllers/usersControllers')
const {protect} = require('../middleware/authMiddleware')

//endpoints publicos
router.post('/login', protect, login)
router.post('/register', protect, register)

//endpoints privado
router.get('/data', protect, data)

module.exports = router