const mongoose = require("mongoose")

const connect = mongoose.connect("mongodb://0.0.0.0:27017/Application")

connect.then(()=>{
    console.log(`Connection successful`);
})
.catch((err)=>{
    console.log({error:`Error:${err.message}`});
})

const LoginSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
         required:true
    },
    email:{
        type:String,
       required:true
    },
    phoneno:{
        type:Number,
       required:true
    },
    status:{
        type:String,
         required:true
    }
});



const collection1 = new mongoose.model("Userstatus",LoginSchema);


module.exports = collection1;
