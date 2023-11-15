const mongoose=require('mongoose');
const path=require('path');
// const { buffer } = require('stream/consumers');


const userSchema=mongoose.Schema({
    user_id:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
    },
    email:{
        type:String,
        // required:true,
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
    alloted_children:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Child'
        }
    ],
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
    }
    
},{
    timestamps:true
});


const User=mongoose.model('User',userSchema);
module.exports=User;