const { hash } = require("bcryptjs")
const knex = require("../database/knex/index.js")
const AppError = require("../utils/AppError.js")

class UsersController {
    async create(req, res) {
        const { user_name, user_email, user_pass } = req.body;

        if(user_pass.length <= 7) {
            throw new AppError("The password must be at least 8 characters long.")
        }

        const passwrodHashed = await hash(user_pass, 6)

        await knex("users").insert({
            user_name,
            user_email,
            user_pass: passwrodHashed
        })

        return res.status(201).json()
    }

    async index(req, res) {
        const [user] = await knex("users")

        return res.status(200).json(user)
    }
}

module.exports = UsersController