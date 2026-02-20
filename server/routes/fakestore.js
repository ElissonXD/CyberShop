const express = require('express')
const Router = express.Router()
const Controller = require('../controllers/fakestoreController')


Router.post('/', Controller.getItems)


module.exports = Router