exports.up = function (knex, Promise) {
  return knex.schema.createTable('kanban', function (table) {
    table.increments('id');
    table.string('title');
    table.string('author');
    table.string('message');
    table.string('status');
  }).createTable('users', function (table) {
    table.increments('id');
    table.string('username');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('kanban').dropTable('users');
};
