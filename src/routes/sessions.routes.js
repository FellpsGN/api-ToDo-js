const { Router } = require("express")
const SessionsController = require("../controllers/sessions.controller.js")

const sessionsRouter = Router()
const sessionsController = new SessionsController()

sessionsRouter.post("/", sessionsController.create)

module.exports = sessionsRouter

