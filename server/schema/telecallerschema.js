const mongoose = require("mongoose");

const telecallerschema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin', 
        required: true,
      },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["telecaller"], 
        default: "telecaller",  
        required: true
    },
    username: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        required: true,
        default:"active"
    },
    number:{
        type:Number
    },
    address:{
        type:String
    },
    leads: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Lead"
        }
    ],
    history: [
        {
            leadId: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Lead",
                required: true
            },
            action: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now
            },
            notes: {
                type: String
            }
        }
    ]
});

const Telecaller = mongoose.model("Telecaller", telecallerschema);
module.exports = Telecaller;
