const express = require('express');
const app = express();
const User = require('./models/task');
const port = process.env.PORT||5000;
app.use(express.json());

app.get('/users',(req,res)=>{

  const user = new User(req.body);
  user.save().then(()=>{
    res.status(201).send(user)
  }).catch((err)=>{
    res.status(400).send(err);
  })

});

app.listen(port,()=>{
  console.log("listening on port "+port);
})
