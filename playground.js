
const User = require('./models/user');


User.findByIdAndDelete('5e1236f680a2222f736d4965').then((user)=>{
  console.log(user);
  return User.countDocuments({});
}).then((count)=>{
  console.log(count);
}).catch((err)=>{
  console.log(err);
})
