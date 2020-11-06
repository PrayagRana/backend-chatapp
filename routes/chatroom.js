const router = require('express').Router();
let chatRoom = require('../models/Chatroom.model');
const sha256=require("js-sha256");
const jwt =require("jwt-then");
//const auth=require("../middleware/auth");
let UserCustomer = require('../models/userCustomer.model');



router.route('/').get(async (req, res) => {
  
    let token;
    try{
          console.log(`this is authorization id ${req.headers.authorization}`);
     if(!req.headers.authorization) throw "Forbidden!";
       token=req.headers.authorization.split(" ")[1];
      
      const payload= await jwt.verify(token,process.env.SECRET);
      req.payload=payload;
      console.log("error occur here")

      
    
  }
  
  
  catch(err){
      res.status(401).json({
          message: "Forbidden...2 "
      })
  }
    
  let k=token+' '+"v2Customer@gmail.com";
  console.log(k);
    UserCustomer.find({uniquedId:k})
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/').post(async(req, res) => {
    const email=req.body.email;
    
    let token;
    try{
          
      if(!req.headers.authorization) throw "Forbidden!";
       token=req.headers.authorization.split(" ")[1];
      
      const payload= await jwt.verify(token,process.env.SECRET);
      req.payload=payload;
      
     
  }
 
  catch(err){
    res.status(401).json({
        message: "Forbidden... "
    })
}
   console.log(email);
    const uniqueId=token+" "+email; 
  
    const UniqueId=await UserCustomer.findOne({uniqueId});  
    console.log(uniqueId)
     if(UniqueId) 
     res.json('user already exists');
    const newUserCustomer = new UserCustomer({
        
        email,     
        uniqueId    
      });
  
    newUserCustomer.save()
      .then(() => res.json('UserCustomer added!'))
        .catch(err => res.status(400).json('Error: ' + err));
     
}); 



module.exports = router;