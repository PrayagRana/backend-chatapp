const router = require('express').Router();
let UserCustomer = require('../models/userCustomer.model');
const sha256=require("js-sha256");
const jwt =require("jwt-then");
const { json } = require('express');




router.route('/').get((req, res) => {
    


  UserCustomer.find()
    .then(UserCustomers => res.json(UserCustomers))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/usercustomer').post(async (req, res) => {
  
  const email=req.body.email;
  const token=req.body.token;

  const uniqueId=token+" "+email; 

  const UniqueId=await UserCustomer.findOne({uniqueId});  

   if(!UniqueId)
  {const newUserCustomer = new UserCustomer({
      
      email,     
      uniqueId    
    });

  newUserCustomer.save()
    .then(() => res.json('UserCustomer added!'))
    .catch(err => res.status(400).json('Error: ' + err));}
}); 

// router.route('/login').post(async (req, res) => {
  
//   const email=req.body.email;
 
//   const password=req.body.password;

//   const UserCustomer= await UserCustomer.findOne({email,password:sha256(password+process.env.slat)});
//   if(!UserCustomer) throw "email or password did not match.";
  
//    const token= await jwt.sign({_id: UserCustomer._id}, process.env.SECRET);
   
//    res.json({
//      message:"UserCustomer logged in successfully",
//      token
//    })
    
// }); 

module.exports = router;