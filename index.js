const express = require('express');
const app = express();
const User = require('./models/user');
const Task = require('./models/task');
const port = process.env.PORT||5000;
app.use(express.json());

app.post('/user',async (req,res)=>{

  const user = new User(req.body);

  try {
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(500).send()
  }

});


app.get('/user',async (req,res)=>{

  try{
    const users = await User.find({});
    res.send(users);
  } catch(e){
    res.status(500).send(e)
  }

});

app.get('/user/:id',async (req,res)=>{
  const _id = req.params.id;

  try{
    const user = await User.findById(_id);
    if(!user){
    return res.status(404).send();
    }
    res.send(user);
  }catch(e){
    res.status(500).send();
  }

});

app.get('/task',async (req,res)=>{

try {
  const tasks = await Task.find({});
  res.send(tasks);
} catch (e) {
  res.status(500).send()
}

});

app.get('/task/:id',async (req,res)=>{

  const _id = req.params.id;
  try{
    const task = await Task.findById(_id);
    if(!task){
      return res.status(404).send();
    }
    res.send(task);
  }catch(e){
    res.status(500).send()
  }

})

app.post('/task',async (req,res)=>{

  const task = new Task(req.body);
  try {
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }

})

app.listen(port,()=>{
  console.log("listening on port "+port);
})
