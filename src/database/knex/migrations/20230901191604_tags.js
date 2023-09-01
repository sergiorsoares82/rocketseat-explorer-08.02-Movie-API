exports.up = function (knex) {
  return knex.schema.createTable('tags', (table) => {
    table.increments('id');
    table.text('name');
    table.integer('user_id').references('id').inTable('users');
    table
      .integer('movie_id')
      .references('id')
      .inTable('movies')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('tags');
};
