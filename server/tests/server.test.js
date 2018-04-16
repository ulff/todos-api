const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../model/todo');

const fixtures = [{
  _id: new ObjectID(),
  text: 'First test todo',
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
}];

beforeEach((done) => {
  Todo.remove({}).then(() => Todo.insertMany(fixtures)).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new Todo', (done) => {
    const text = 'Create todo test';
    request(app)
      .post('/todos')
      .send({ text })
      .expect(201)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({ text }).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch(e => done(e));
      });
  });

  it('should not create Todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(fixtures.length);
          done();
        }).catch(e => done(e));
      });
  });

  it('should not create Todo with empty text ', (done) => {
    const text = ' ';
    request(app)
      .post('/todos')
      .send({ text })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(fixtures.length);
          done();
        }).catch(e => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(fixtures.length);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return Todo doc', (done) => {
    request(app)
      .get(`/todos/${fixtures[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(fixtures[0].text);
      })
      .end(done);
  });

  it('should return 404 if Todo not found', (done) => {
    const id = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if not valid ID', (done) => {
    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done);
  });
});
