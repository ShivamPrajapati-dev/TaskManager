const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{newUrlParser:true});

const taskSchema = mongoose.Schema({
  completed:{
    type:Boolean,
    default:false
  },
  description:{
    type:String,
    required:true,
    trim:true
  },
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'user'
  }
},{
  timestamps:true
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
