
const my_function = new Promise((resolve,reject)=>{

  setTimeout(()=>{
    reject("Promise not resolved")
  },2000);

});

my_function.then((result)=>{
  console.log(result);
}).catch((err)=>{
  console.error(err);
});
