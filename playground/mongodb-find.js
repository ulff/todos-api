// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://mongo:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongodb server.');
  }
  console.log('Connected to mongodb server');

  // db.db('TodoApp').collection('Todos').find({
  //   _id: new ObjectID('5ac34a86a268570019cee8e6'),
  // }).toArray()
  //   .then((docs) => {
  //     console.log('Todos');
  //     console.log(JSON.stringify(docs, undefined, 2));
  //   }, (error) => {
  //     console.log('Unable to fetch todos', error);
  //   });

  db.db('TodoApp').collection('Todos').find().count()
    .then((count) => {
      console.log('Matched todos: ', count);
    }, (error) => {
      console.log('Unable to count todos', error);
    });


  // db.close();
});
