
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('email')
      .unique()
      .notNullable();
    table.string('password')
      .notNullable();
    table.string('firstName')
      .notNullable();
    table.string('lastName')
      .notNullable();
    table.boolean('isAdmin')
      .defaultTo('false')
      .notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
