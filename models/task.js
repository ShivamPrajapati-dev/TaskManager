const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{newUrlParser:true});

const taskSchema = mongoose.Schema({
  name:{
    type:String,
    trim:true
  },
  description:{
    type:String
  }
});

taskSchema.pre('save',function(next){
  const task =this;
  if(task.isModified()){
    console.log('just before saving');
  }
  next();
})

const Task = mongoose.model('task',taskSchema);

module.exports = Task;
