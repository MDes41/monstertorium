const assert = require('chai').assert;
const request = require('supertest');
const app = require('../server');
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('GET /api/v1//monsters', () => {

  let monster = { id: 1, name: 'Steve', level: 2 , created_at: null, updated_at: null}

  beforeEach(() => {
    return database('monsters').insert(monster);
  });

  afterEach(() => {
    return database('monsters').del();
  });

	it('should return a 200 status code', (done) => {
	  request(app)
	    .get('/api/v1/monsters')
	    .expect(200, done);
	});

	it('should return a set monsters stored in database', (done) => {
	  request(app)
	    .get('/api/v1/monsters')
	    .expect(200, {
	      monsters: [monster]
	    }, done);
	});
});


describe('POST /api/v1/monsters', () => {

  beforeEach(() => {
    app.locals.monsters = [];
  });

	it('should create a new monster', (done) => {
	  const monster = { id: 1, name: 'Steve', level: 2 };

	  request(app)
	    .post('/api/v1/monsters')
	    .send({ monster: monster })
	    .expect(201)
	    .end(() => {
	      assert.deepEqual(app.locals.monsters, [monster]);
	      // assert.include(app.locals.monsters, [monster]);
	      done();
	    });
	});
});

describe('UPDATE /api/v1/monsters/:id', () => {

  beforeEach(() => {
    app.locals.monsters = [{ id: 1, name: 'Steve', level: 2 }];
  });

  afterEach(() => {
    app.locals.monsters = [];
  });

  it('should update a record with the correct "id"', (done) => {
    const monster = app.locals.monsters[0];

    request(app)
      .put(`/api/v1/monsters/${monster.id}`)
      .send({ monster: { name: 'Louisa' } })
      .expect(204)
      .end(() => {
        assert.equal(app.locals.monsters[0].name, 'Louisa');
        done();
      });
  });
});

describe('DELETE /api/v1/monsters/:id', () => {

  beforeEach(() => {
    app.locals.monsters = [{ id: 1, name: 'Steve', level: 3 }];
  });

  afterEach(() => {
    app.locals.monsters = [];
  });

  it('should delete a record', (done) => {
  	const id = parseInt(app.locals.monsters[0].id, 10);
    request(app)
      .delete(`/api/v1/monsters/${id}`)
      .expect(204)
      .end(() => {
        assert.equal(app.locals.monsters.length, 0);
        done();
      });
  });

  it('should return a 404 status if there is no idea', (done) => {
    request(app)
      .delete('/monsters/invalid')
      .expect(404, done);
  });

});