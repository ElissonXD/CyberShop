const express = require('express')
const Router = express.Router()
const Controller = require('../controllers/historyController')


Router.get('/', Controller.getHistory)

Router.post('/', Controller.postHistory)

module.exports = Router