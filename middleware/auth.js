const jwt = require('jsonwebtoken');
const User = require('../models/user');
const auth = async (req,res,next)=>{
  try {
    const token = req.header('Authorization').replace('Bearer ','');
    const decode = jwt.verify(token,process.env.JWT_SECRET);
    const user = await User.findOne({_id:decode._id,'token.token':token});

    if(!user){
      throw new Error();
    }
      //console.log(req);
      req.user=user;
      next();
  } catch (e) {
    res.status(401).send({error:'Invalid Authentication token'});
  }
}

module.exports = auth;
