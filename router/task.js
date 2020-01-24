const express = require('express');
const router = new express.Router();
const Task = require('../models/task');
const auth = require('../middleware/auth');


router.get('/task',auth,async (req,res)=>{

try {
  const tasks = await Task.find({owner:req.user._id});
  res.send(tasks);
} catch (e) {
  res.status(500).send()
}

});

router.get('/task/:id',auth,async (req,res)=>{

  const _id = req.params.id;
  try{
    const task = await Task.findOne({_id,owner:req.user._id});
    if(!task){
      return res.status(404).send();
    }
    res.send(task);
  }catch(e){
    res.status(500).send()
  }

});



router.delete('/task/:id',auth,async (req,res)=>{
  try{
    const task = await Task.findByIdAndDelete({_id:req.params.id,owner:req.user._id});
    if(!task){
      res.status(404).send();
    }
    res.send(task);
  }catch(e){
    res.status.send();
  }
});


router.patch('/task/:id',auth, async (req,res)=>{
  const validUpdates = ['description','completed'];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update)=>{
    return validUpdates.includes(update);
  });
  if(!isValidOperation){
    return res.status(400).send();
  }
  try {

  const task = await Task.findOne({_id:req.params.id,owner:req.user._id});

    if(!task){
      return res.status(404).send();
    }
    updates.forEach((update)=>{
      task[update]=req.body[update];
    });
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/task',auth,async (req,res)=>{

  const task = new Task({
    ...req.body,
    owner:req.user._id
  });
  try {
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }

});


module.exports = router;
