const mongoose=require('mongoose');
const path=require('path');
// const { buffer } = require('stream/consumers');


const userSchema=mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    zone:{
        type:String
    },
    address:{
        type:String
    },
    aadharCardNo:{
        type:String
    },
    contactNo:{
        type:Number
    },
    avatar:{
        type:Buffer
    },
    CVDScore:{
        type:Number
    }
    
},{
    timestamps:true
});


const User=mongoose.model('User',userSchema);
module.exports=User;