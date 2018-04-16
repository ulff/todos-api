const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/model/todo');
const { User } = require('./../server/model/user');

// const id = '5ac76d5d32092d0601a1343a11';

// if (!ObjectID.isValid(id)) {
//   console.log('Id not valid');
// }

// Todo.find({
//   _id: id,
// }).then((todos) => {
//   console.log('Todos', todos);
// });

// Todo.findOne({
//   _id: id,
// }).then((todo) => {
//   console.log('Todo', todo);
// });

// Todo.findById(id).then().then((todo) => {
//   if (!todo) {
//     return console.log('NF');
//   }
//   console.log('Todo by id', todo);
// }).catch(e => console.log(e));

const id = '5ac5cf46482e5101aff0250e';
User.findById(id).then((user) => {
  if (!user) {
    return console.log('User not found');
  }
  console.log('User by id', user);
}).catch(e => console.log(e));
