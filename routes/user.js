const router = require('express').Router();
let User = require('../models/user.model');
let UserCustomer = require('../models/userCustomer.model');
const sha256=require("js-sha256");
const jwt =require("jwt-then");




router.route('/').get(async (req, res) => {
   let token;
  try{
        
    if(!req.headers.authorization) throw "Forbidden!";
     token=req.headers.authorization.split(" ")[1];
    
    const payload= await jwt.verify(token,process.env.SECRET);
    req.payload=payload;
    
    next();
}


catch(err){
    res.status(401).json({
        message: "Forbidden... "
    })
}
  


  UserCustomer.find({uniquedId:{$regex:token}})
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/register').post(async (req, res) => {
  const name = req.body.name;
  const email=req.body.email;
  const password=req.body.password;

  const checke=await User.findOne({email});
  const checkn=await User.findOne({name});
 
try{
  if(checkn) throw "User with this name already exists";
  if(checke) throw "User with this email already exists";
}
catch(err){
    res.json(err);

}


  
  
  const newUser = new User({
      name,
      email,     
      password: sha256(password+process.env.salt)    
    });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
}); 

router.route('/login').post(async (req, res) => {
  
  const email=req.body.email;
 
  const password=req.body.password;

  const user= await User.findOne({email,password:sha256(password+process.env.salt)});
  try{
  if(!user) throw "email or password did not match.";
  }
  catch(err)
  {
    res.json(err);
  }
  
   const token= await jwt.sign({_id: user._id}, process.env.SECRET);
   
   res.json({
     message:"User logged in successfully",
     token
   })
    
}); 

module.exports = router;