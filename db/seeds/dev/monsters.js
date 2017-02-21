exports.seed = function(knex, Promise) {
  return knex('monsters').del()
  .then(() => {
    return Promise.all([
      knex('monsters').insert({
        id: 1,
        name: 'Alex Tideman',
        created_at: new Date
      }),
      knex('monsters').insert({
        id: 2,
        name: 'Bob Barker',
        created_at: new Date
      }),
      knex('monsters').insert({
        id: 3,
        name: 'Martha Stewart',
        created_at: new Date
      })
    ]);
  });
};