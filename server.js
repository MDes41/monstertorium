const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// app.get('/', (request, response) => {
//   response.send('Hello World!');
// });

// app.get('/good', (request, response) => {
//   response.send('Goodbye World!');
// });

app.locals.monsters = []; // NEW!

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/v1/monsters', (request, response) => {
	response.send({ monsters: app.locals.monsters })
});

app.post('/api/v1/monsters', (request, response) => {
  const monster = request.body.monster;

  monster.id = monster.id || Date.now();
  app.locals.monsters.push(monster);

  response.status(201).send({ monster: monster });
});

app.put('/api/v1/monsters/:id', (request, response) => {
  const monster = request.body.monster;
  const id = parseInt(request.params.id, 10);
  const index = app.locals.monsters.findIndex((m) => m.id === id);

  if (index === -1) { return response.sendStatus(404); }

  const oldMonster = app.locals.monsters[index];
  app.locals.monsters[index] = Object.assign(oldMonster, monster);

  return response.sendStatus(204);
});

app.delete('/api/v1/monsters/:id', (request, response) => {
  const id = parseInt(request.params.id, 10);
  if (!app.locals.monsters.find((m) => m.id === id)) {
    return response.status(404).send({
      error: `There is no monster with the "id" of ${id}.`
    });
  }
  app.locals.monsters = app.locals.monsters.filter((m) => m.id !== id);
  response.sendStatus(204);
});

if (!module.parent) { // NEW!
	app.listen(3000, () => {
	  console.log('The Monstertorium is live! (http://localhost:3000)');
	});
};

module.exports = app; // NEW!