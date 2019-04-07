exports.up = function (knex, Promise) {
  return knex.schema.createTable('kanban', function (table) {
    // table.increments('id');
    // table.string('username');
    table.increments('id');
    table.string('title');
    table.string('author');
    table.string('message');
    table.string('status');
  }).createTable('users', function (table) {
    table.string('author');
    table.string('message');
    table.string('status');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('kanban');
};
