const { Router } = require("express")
const usersRouter = require("../routes/users.routes.js")

const routes = Router()

routes.use("/users", usersRouter)

module.exports = routes;