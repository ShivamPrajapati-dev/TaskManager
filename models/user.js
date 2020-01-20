const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{useUnifiedTopology:true});

const userSchema = mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim:true
  },password:{
    type:String,
    required:true,
    trim:true,
    validate(value){
      if(value.length<=6||value==="password"){
        throw new Error("Invalid password")
      }
    }
  },
  email:{
    type:String,
    unique:true,
    required:true,
    trim:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error('Email is invalid');
      }
    }

  },
  age:{
    type:Number
  }
});


userSchema.pre('save', async function(next){
const user = this;
if(user.isModified('password')){
  user.password = await bcrypt.hash(user.password,8);
}

  next();
})



 userSchema.statics.findByCredentials = async function (email, password){
    const user = await User.findOne({ email });

    if(!user){
      throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
      throw new Error("Unable to login");
    }

    return user;
}

const User = mongoose.model('user',userSchema);


module.exports = User;
