exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('kanban').del()
    .then(function () {
      // Inserts seed entries
      return knex('kanban').insert([
        {
          title: 'what is a kanban',
          message: 'help',
          author: 'help',
          status: 'queue'
        },
        {
          title: 'what is a kanban',
          message: 'help',
          author: 'help',
          status: 'queue'
        },
        {
          title: 'i still dont know',
          message: 'apparently its good for productivity',
          author: 'please absolve me of responsibility',
          status: 'pending'
        },
        {
          title: 'a title',
          message: 'a message',
          author: 'help',
          status: 'done'
        }
      ]);
    });
};

