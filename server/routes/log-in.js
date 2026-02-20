const express = require('express')
const Router = express.Router()

const controller = require('../controllers/loginController')
const authentication = require('../middlewares/authentication')

Router.post('/', controller.logUser)

module.exports = Router