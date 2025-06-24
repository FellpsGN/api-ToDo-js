const { hash, compare } = require("bcryptjs")
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

    async update(req, res) {
        const { user_name, user_email, user_pass, old_pass } = req.body
        const { user_id } = req.params

        const [user] = await knex("users").where({ user_id })

        if(!user) {
            throw new AppError("User not found")
        }

        const [userWithUpdatedEmail] = await knex("users").where({ user_email })

        if(userWithUpdatedEmail && userWithUpdatedEmail.user_id !== user.user_id) {
            throw new AppError("This email is already used")
        }

        user.user_name = user_name ?? user.user_name
        user.user_email = user_email ?? user.user_email

        if(user_pass && !old_pass) {
            throw new AppError("Old password required")
        }

        if(user_pass && old_pass) {
            const checkOldPassword = await compare(old_pass, user.user_pass)

            if(!checkOldPassword) {
                throw new AppError("Old password incorrect")
            }

            user.user_pass = await hash(user_pass, 6)
        }

        await knex("users").where({ user_id }).update({
            user_name: user.user_name,
            user_email: user.user_email,
            user_pass: user.user_pass
        })

        return res.status(204).json()
    }

    async index(req, res) {
        const [user] = await knex("users")

        return res.status(200).json(user)
    }
}

module.exports = UsersController