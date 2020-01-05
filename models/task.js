const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{newUrlParser:true});

const Task = mongoose.model('task',{
  name:{
    type:String,
    trim:true
  },
  description:{
    type:String
  }
});

module.exports = Task;
