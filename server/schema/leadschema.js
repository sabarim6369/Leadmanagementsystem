const mongoose=require("mongoose");
const leadschema=new mongoose.Schema({
    name:{
        type:String
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',  
        required: true,
      },
    mobilenumber:{
        type:Number
    },
    address:{
        type:String
    },
    status:{
        type:String,
        enum:["unassigned","warm","cold","hot","fulfilled"],
        default: "unassigned"
    },
    assignedTo: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Telecaller",
        default: null
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
})
const Lead = mongoose.model("Lead", leadschema);
module.exports = Lead;