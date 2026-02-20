const express = require('express')
const Router = express.Router()
const controller = require('../controllers/cartController')

Router.post('/', controller.postItem)
Router.get('/', controller.getCart)
Router.patch('/', controller.updateCart)
Router.delete('/', controller.deleteCart)


module.exports = Router