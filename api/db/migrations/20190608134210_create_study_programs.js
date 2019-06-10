exports.up = function(knex, Promise) {
  return knex.schema.createTable('study_programs', table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'))
    table.timestamps(true, true)
    table
      .string('name')
      .unique()
      .notNullable()
    table
      .uuid('department_id')
      .references('departments.id')
      .onDelete('SET NULL')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('study_programs')
}
