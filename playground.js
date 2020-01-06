
const User = require('./models/user');


// User.findByIdAndDelete('5e1236f680a2222f736d4965').then((user)=>{
//   console.log(user);
//   return User.countDocuments({});
// }).then((count)=>{
//   console.log(count);
// }).catch((err)=>{
//   console.log(err);
// });

// const updateAndCount = async (id,age)=>{
//
//   const user = await User.findByIdAndUpdate(id, {age});
//   const count = await User.countDocuments({age:age});
//   return count;
// }
//
// updateAndCount("5e1234b380a2222f736d4963",10).then((result)=>{
//   console.log(result);
// }).catch((err)=>{
//   console.log(err);
// })

const deleteAndCount = async (id, age) => {
  await User.findByIdAndDelete(id);
  const count = await User.countDocuments({age});
  return count;
}

deleteAndCount("5e12343180a2222f736d4962",20).then((result)=>{
  console.log(result);
}).catch((err)=>{
  console.log(err);
})
