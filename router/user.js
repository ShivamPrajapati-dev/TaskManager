const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');

router.post('/user',async (req,res)=>{

  const user = new User(req.body);

  try {

    await user.save();
        const token = await user.generateAuthToken();
    res.send({user, token});
  } catch (e) {
    res.status(500).send(e)
  }

});

router.post('/user/login', async (req,res)=>{

  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();

    res.send({user, token});
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }

});

router.post('/user/logout', auth, async(req,res)=>{

  try {
    req.user.token = req.user.token.filter((token)=>{
      return token.token!==req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/user/logoutAll',auth,async(req,res)=>{

  try{
    req.user.token=[];
    await req.user.save();
    res.send();
  } catch(e){
    res.status(500).send();
  }

});



router.get('/user/me',auth,async (req,res)=>{
  res.send(user);

});

router.get('/user/:id',async (req,res)=>{
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

router.patch('/user/:id',async (req,res)=>{
  const updates = Object.keys(req.body);
  const validUpdates = ['name','age','password'];
  const isValidOperation = updates.every((update)=>{
    return validUpdates.includes(update);
  });
  if(!isValidOperation){
    return res.status(404).send();
  }

  try {

    const user = await User.findById(req.params.id);
    updates.forEach((update)=>{
      user[update] = req.body[update];
    });
     await user.save();
      //const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
      if(!user){
        return res.status(404).send();
      }
      res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }


});
router.delete('/user/:id', async (req,res)=>{

  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user){
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }

});

module.exports = router;
