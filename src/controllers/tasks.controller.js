const knex = require("../database/knex/index.js")
const AppError = require("../utils/AppError.js")

class TasksController {
    async create(req, res) {
        const { task_title, task_description } = req.body
        const user_id = req.user.user_id

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

    async update(req, res) {
        const { task_title, task_description, task_done } = req.body
        const { task_id } = req.params
        const user_id = req.user.user_id

        const [task] = await knex("tasks").where({task_id})
        const [user] = await knex("users").where({user_id})

        if(!task) {
            throw new AppError("Task not found")
        }

        if(!task_title || task_title === " ") {
            throw new AppError("Task title required")
        }

        if(typeof task_done !== 'boolean') {
            throw new AppError("Task Done field must be true or false")
        }

        if(user.user_id !== task.user_id) {
            throw new AppError("Task not found")
        }

        await knex("tasks").update({
            task_title,
            task_description,
            task_done
        }).where({task_id})
       
        return res.status(204).json()
    }

    async show(req, res) {
        const user_id = req.user.user_id

        if(!user_id) {
            throw new AppError("User Id required")
        }

        const [tasks] = await knex("tasks").where({user_id})

        return res.status(200).json(tasks)
    }

    async getByLike(req, res) {
        const { title } = req.query
        const user_id = req.user.user_id

        let tasks

        if(title) {
            tasks = await knex("tasks").where({ user_id }).whereLike("task_title", `%${title}%`)
        }

        const [tasksLikeTitle] = tasks.map(task => {
            return {...task}
        })

        return res.status(200).json(tasksLikeTitle)
    }

    async delete(req, res) {
        const { task_id } = req.params
        const user_id = req.user.user_id

        const [doesTaskExists] = await knex("tasks").where({task_id, user_id})

        if(!doesTaskExists) {
            throw new AppError("Task not found")
        }

        await knex("tasks").where({task_id}).del()

        return res.status(204).json()
    }
}

module.exports = TasksController