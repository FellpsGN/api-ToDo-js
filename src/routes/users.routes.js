const { Router } = require("express")
const UsersController = require("../controllers/users.controller.js")

const usersRouter = Router()
const usersController = new UsersController()

usersRouter.post("/", usersController.create)
usersRouter.get("/:user_id", usersController.index)
usersRouter.put("/:user_id", usersController.update)

module.exports = usersRouter