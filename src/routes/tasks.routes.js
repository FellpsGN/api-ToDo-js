const { Router } = require("express")
const TasksController = require("../controllers/tasks.controller.js")

const tasksRouter = Router();
const tasksController = new TasksController()

tasksRouter.post("/", tasksController.create)
tasksRouter.get("/", tasksController.show)
tasksRouter.get("/", tasksController.getByLike)
tasksRouter.put("/:task_id", tasksController.update)
tasksRouter.delete("/:task_id", tasksController.delete)

module.exports = tasksRouter 