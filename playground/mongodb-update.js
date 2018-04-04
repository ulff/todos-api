// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://mongo:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongodb server.');
  }
  console.log('Connected to mongodb server');

  db.db('TodoApp').collection('Users').findOneAndUpdate({
    _id: new ObjectID('5ac49a429f0baf007f83f66c'),
  }, {
    $set: {
      name: 'Olaf',
    },
    $inc: {
      age: 1,
    },
  }, {
    returnOriginal: false,
  }).then((result) => {
    console.log(result);
  });

  // db.close();
});
