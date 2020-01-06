const express = require('express');
const app = express();
const User = require('./models/user');
const Task = require('./models/task');
const port = process.env.PORT||5000;
app.use(express.json());

app.post('/user',(req,res)=>{

  const user = new User(req.body);
  user.save().then(()=>{
    res.status(201).send(user)
  }).catch((err)=>{
    res.status(400).send(err);
  })

});


app.get('/user',(req,res)=>{

  User.find({}).then((user)=>{
    res.status(201).send(user);
  }).catch((err)=>{
    res.status(500).send(err);
  });

});

app.get('/user/:id',(req,res)=>{
  const _id = req.params.id;
  User.findById(_id).then((user)=>{
    if(!user){
      return res.status(404).send();
    }
    res.send(user)
  }).catch((err)=>{
    res.status(500).send(err);
  })
})

app.get('/task',(req,res)=>{

  Task.find({}).then((tasks)=>{
    res.send(tasks);
  }).catch((err)=>{
    res.status(400).send(err);
  });

});

app.get('/task/:id',(req,res)=>{

  const _id = req.params.id;
  Task.findById(_id).then((task)=>{

    if(!task){
      return res.status(404).send();
    }

    res.send(task);

  }).catch((err)=>{
    res.status(500).send(err);
  })

})

app.post('/task',(req,res)=>{

  const task = new Task(req.body);
  task.save().then(()=>{
    res.status(201).send(task)
  }).catch((err)=>{
    res.status(400).send(err);
  })


})

app.listen(port,()=>{
  console.log("listening on port "+port);
})
