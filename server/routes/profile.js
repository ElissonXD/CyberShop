const express = require('express')
const Router = express.Router()

const controller = require('../controllers/profileController')

Router.get('/', controller.logOut)
Router.post('/', controller.postPfp)


module.exports = Router