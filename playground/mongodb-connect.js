// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

const obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://mongo:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongodb server.');
  }
  console.log('Connected to mongodb server');

  db.db('TodoApp').collection('Todos').insertOne({
    text: 'Something to do',
    completed: false,
  }, (error, result) => {
    if (error) {
      return console.log('Unable to insert todo.', error);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  db.db('TodoApp').collection('Users').insertOne({
    name: 'Andrew',
    age: 25,
    location: 'Gdansk',
  }, (error, result) => {
    if (error) {
      return console.log('Unable to insert user.', error);
    }
    console.log(result.ops[0]._id.getTimestamp());
  });

  db.db('TodoApp').collection('Todos').insertOne({
    text: 'Eat lunch',
    completed: false,
  }, (error, result) => {
    if (error) {
      return console.log('Unable to insert todo.', error);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  db.close();
});
