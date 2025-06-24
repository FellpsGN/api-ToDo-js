exports.up = knex => knex.schema.alterTable("tasks", table => {
    table.boolean("task_done").defaultTo(false)
})

exports.down = knex => knex.schema.alterTable("tasks", table => {
    table.dropColumn("task_done")
})