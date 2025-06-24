const { Router } = require("express")
const UsersController = require("../controllers/users.controller.js")

const usersRouter = Router()
const usersController = new UsersController()

usersRouter.post("/", usersController.create)
usersRouter.get("/", usersController.index)

module.exports = usersRouter