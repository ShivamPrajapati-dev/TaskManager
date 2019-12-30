const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{newUrlParser:true});

const User = mongoose.model('user',{name:String,age:Number});
const shivam = new User({name:"shivam",age:20});
shivam.save().then(()=>{
  console.log('saved');
}).catch((err)=>{
  console.log('error');
})
