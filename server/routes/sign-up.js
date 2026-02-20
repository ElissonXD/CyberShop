const express = require("express")
const Router = express.Router()
const auth = require("../middlewares/authentication")
const controller = require("../controllers/signController")


Router.post('/', controller.validateUser, controller.postForm)

module.exports = Router