const knex = require("../database/knex/index.js")
const AppError = require("../utils/AppError.js")

class TasksController {
    async create(req, res) {
        const { task_title, task_description } = req.body
        const { user_id } = req.params

        if(!task_title || task_title === " ") {
            throw new AppError("Task title required")
        }

        await knex("tasks").insert({
            task_title,
            task_description,
            user_id
        })

        return res.status(204).json()
    }

    async show(req, res) {
        const { user_id } = req.params

        if(!user_id) {
            throw new AppError("User Id required")
        }

        const [tasks] = await knex("tasks").where({user_id})

        return res.status(200).json(tasks)
    }
}

module.exports = TasksController