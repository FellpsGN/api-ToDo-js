const { Router } = require("express")
const usersRouter = require("../routes/users.routes.js")
const tasksRouter = require("../routes/tasks.routes.js")
const sessionsRouter = require("../routes/sessions.routes.js")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated.js")

const routes = Router()

routes.use("/users", usersRouter)
routes.use("/tasks", ensureAuthenticated, tasksRouter)
routes.use("/sessions", sessionsRouter)

module.exports = routes;