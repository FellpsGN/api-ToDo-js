exports.up = knex => knex.schema.alterTable("tasks", table => {
    table.text("task_description").nullable().alter()
    table.dropUnique(["task_description"])
})

exports.down = knex => knex.schema.alterTable("tasks", table => {
    table.text("task_description").notNullable().unique().alter()
})
