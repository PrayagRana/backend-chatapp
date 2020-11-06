const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//require('./models/users.model');
//require('./models/Chatmessage.model');

require("dotenv").config();

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateindex: true });

const connection = mongoose.connection;

connection.once("open", () =>
  console.log("you are connceted to your mongo database")
);

const user = require("./routes/user");
const userCustomer=require("./routes/userCustomer")
const chatRoom=require('./routes/chatroom');


app.use("/user", user);
app.use("/userCustomer",userCustomer);
app.use("/chatroom",chatRoom);


const server=app.listen(port, () => console.log(`your server is running on port: ${port}`));

// const io=require("socket.io")(server);
// const jwt=require("jwt-then");

// const Message=mongoose.model("Message");
// const User=mongoose.model("User");

// io.use( async (socket,next)=>{
// const token=socket.handshake.query.token;

// try{
  
//   const payload= await jwt.verify(token,process.env.SECRET);
//   console.log("sdf");
//   socket.userId=payload.id;  
//   next();
// }
// catch(err){
//   // res.status(401).json({
//   //     message: "Forbidden... "
//   // })
//  // console.log("err");
// }});
// io.on('connection',(socket)=>{
//   console.log("Conencted: "+socket.userId);
//  console.log(socket.userId);
//   socket.on("disconnect",()=>{
//     console.log('Disconnected: '+socket.userId);
//   });
//   socket.on("joinRoom",(chatroomId)=>{
//  socket.join(chatroomId);
//  console.log("A user join chat room");
//   })
//   socket.on("leaveRoom",(chatroomId)=>{
//     socket.join(chatroomId);
//     console.log("A user left chat room");
//      })
//    socket.on("chatroomMessage",async ({chatroomId,message})=>{
//     if (message.trim().length > 0) {
//       const users = await User.findOne({ _id: socket.userId });
//       const newMessage = new Message({
//         chatroom: chatroomId,
//         user: socket.userId,
//         message,
//       });
//       console.log(`name of the user${socket.userId}`);
//       io.to(chatroomId).emit("newMessage", {
//         message,
//         name: user.name,
//         userId: socket.userId,
//       });
//       await newMessage.save();
//     }
//   });
// });