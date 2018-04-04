// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://mongo:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongodb server.');
  }
  console.log('Connected to mongodb server');

  db.db('TodoApp').collection('Todos').deleteMany({ text: 'Eat lunch' }).then((result) => {
    console.log(result);
  });

  db.db('TodoApp').collection('Todos').deleteOne({ text: 'Eat lunch' }).then((result) => {
    console.log(result);
  });

  db.db('TodoApp').collection('Todos').findOneAndDelete({ completed: false }).then((result) => {
    console.log(result);
  });

  db.db('TodoApp').collection('Users').deleteMany({ name: 'Ulff' }).then((result) => {
    console.log(result);
  });

  db.db('TodoApp').collection('Users').findOneAndDelete({ _id: new ObjectID('5ac3525439cf8400199976fd') }).then((result) => {
    console.log(result);
  });

  // db.close();
});
