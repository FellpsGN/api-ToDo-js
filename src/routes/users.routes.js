const { Router } = require("express")
const UsersController = require("../controllers/users.controller.js")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated.js")

const usersRouter = Router()
const usersController = new UsersController()

usersRouter.post("/", usersController.create)
usersRouter.put("/", ensureAuthenticated, usersController.update)

module.exports = usersRouter