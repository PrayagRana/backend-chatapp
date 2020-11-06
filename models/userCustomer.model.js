const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userCustomerSchema = new Schema(
  {
    
    email: { type: String, required: true, trim: true }, 
    uniqueId:{ type: String, required: true, trim: true }
    
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("UserCustomer", userCustomerSchema);

module.exports = User;
