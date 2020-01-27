const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL,{useUnifiedTopology:true});

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
