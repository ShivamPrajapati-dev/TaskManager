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
  res.send(req.user);

});


router.patch('/user/me',auth,async (req,res)=>{
  const updates = Object.keys(req.body);
  const validUpdates = ['name','password','age','email'];
  const isValidOperation = updates.every((update)=>{
    return validUpdates.includes(update);
  });
  if(!isValidOperation){
    return res.status(404).send();
  }

  try {

    updates.forEach((update)=>{
      req.user[update] = req.body[update];
    });
     await req.user.save();
      res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }


});
router.delete('/user/me',auth, async (req,res)=>{

  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }

});

module.exports = router;
