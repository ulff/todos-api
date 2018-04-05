const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongo:27017/TodosApi');

module.exports = { mongoose };
