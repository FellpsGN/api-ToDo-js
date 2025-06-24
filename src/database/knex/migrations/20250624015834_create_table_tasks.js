exports.up = knex => knex.schema.createTable("tasks", table => {
    table.increments("task_id")
    
    table.text("task_title").notNullable()
    table.text("task_description").notNullable().unique()
    table.timestamp("created_at").default(knex.fn.now())

    table.integer("user_id").references("user_id").inTable("users")
})


exports.down = knex => knex.schema.dropTable("users")
