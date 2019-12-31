const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{newUrlParser:true});

const User = mongoose.model('user',{
  name:{
    type:String
  },password:{
    type:String,
    trim:true,
    validate(value){
      if(value.length<=6||value==="password"){
        throw new Error("Invalid password")
      }
    }
  },
  age:{
    type:Number
  }
});


const shivam = new User({name:"shivam",password:"shivam",age:20});
shivam.save().then(()=>{
  console.log('saved');
}).catch((err)=>{
  console.log('error');
})
