exports.up = function (knex) {
  return knex.schema.createTable('movies', (table) => {
    table.increments('id');
    table.text('title');
    table.text('description');
    table.text('rating');
    table.integer('user_id').references('id').inTable('users');
    table.timestamp('created_at').default(knex.fn.now());
    table.timestamp('updated_at').default(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('movies');
};
