const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{newUrlParser:true});

const userSchema = mongoose.Schema({
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
})

userSchema.pre('save', function(next){
  console.log('just before saving');
  next();
})

const User = mongoose.model('user',userSchema);

module.exports = User;
