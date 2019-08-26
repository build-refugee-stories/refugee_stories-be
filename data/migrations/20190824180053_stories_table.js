
exports.up = function(knex) {
  return knex.schema.createTable('stories', table => {
    table.increments();
    table.string('title', 255)
      .unique()
      .notNullable();
    //allow for anonymous posting
    table.string('author', 255);
    table.string('country', 128);
    table.text('story')
      .notNullable();
    table.integer('year')
      .unsigned()
    table.string('imageUrl')
    table.boolean('approved')
      .defaultTo('false')
      .notNullable();
    table.integer('approvedBy')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
