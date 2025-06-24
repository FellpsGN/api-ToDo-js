const { Router } = require("express")
const TasksController = require("../controllers/tasks.controller.js")

const tasksRouter = Router();
const tasksController = new TasksController()

tasksRouter.post("/:user_id", tasksController.create)
tasksRouter.get("/:user_id", tasksController.show)

module.exports = tasksRouter 