const express = require('express');
const router = new express.Router();
const Task = require('../models/task');

router.get('/task',async (req,res)=>{

try {
  const tasks = await Task.find({});
  res.send(tasks);
} catch (e) {
  res.status(500).send()
}

});

router.get('/task/:id',async (req,res)=>{

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

});



router.delete('/task/:id',async (req,res)=>{
  try{
    const task = await Task.findByIdAndDelete(req.params.id);
    if(!task){
      res.status(404).send();
    }
    res.send(task);
  }catch(e){
    res.status.send();
  }
});


router.patch('/task/:id', async (req,res)=>{
  const validUpdates = ['name','description'];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update)=>{
    return validUpdates.includes(update);
  });
  if(!isValidOperation){
    return res.status(400).send();
  }
  try {
  //  const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});

  const task = await Task.findById(req.params.id);
  updates.forEach((update)=>{
    task[update]=req.body[update];
  });
  await task.save();
    if(!task){
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/task',async (req,res)=>{

  const task = new Task(req.body);
  try {
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }

});


module.exports = router;
