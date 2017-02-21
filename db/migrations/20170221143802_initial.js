exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('monsters', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.integer('level');

      table.timestamps();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('monsters')
  ])
};