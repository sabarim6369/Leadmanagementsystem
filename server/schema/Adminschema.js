const mongoose=require("mongoose");
const Adminschema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    databaseName:{
type:String
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin"]
    },
    username:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["active","inactive","paused"]
    }
})
const authentication=mongoose.model("Admin",Adminschema)
module.exports=authentication