const mongoose = require("mongoose")

const connect = mongoose.connect("mongodb://0.0.0.0:27017/Application")

connect.then(()=>{
    console.log(`Connection successful`);
})
.catch((err)=>{
    console.log({error:`Error:${err.message}`});
})
const SellerSchema = new mongoose.Schema({
    place:{
        type:String,
        // required:true
    },
    area:{
        type:String,
        //  required:true
    },
    bedrooms:{
        type:String,
    //    required:true
    },
    bathroom:{
        type:String,
    //    required:true
    },
    hospital:{
        type:String,
        //  required:true
    },
    colleges:{
        type:String,

    }
});
const collection2 = new mongoose.model("Sellerstatus",SellerSchema);
module.exports = collection2;