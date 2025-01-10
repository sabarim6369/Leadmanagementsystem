// const express = require("express");
// const mongoose = require("mongoose");
// require("dotenv").config();
// const db = require("./config/db");

// const app = express();
// app.use(express.json());

// const mongodbUri = process.env.MONGODB_URI.replace(
//   "superadmin",
//   process.env.DATABASE_NAME
// );


// process.env.MONGODB_URI = mongodbUri;

// db(); 
// app.get("/",(req,res)=>{
// res.send("hello")
// })
// app.listen(8000, () => {
//   console.log("Server is running on port 8000");
// });



const express = require('express');
const twilio = require('twilio');
const mongoose = require('mongoose');
require("dotenv").config();
const db = require("./config/db");
const mongodbUri = process.env.MONGODB_URI.replace(
  "superadmin",
  process.env.DATABASE_NAME
);
process.env.MONGODB_URI = mongodbUri;

db();

// Define the call schema with speakingStartedTime
const callSchema = new mongoose.Schema({
  callSid: String,
  fromNumber: String,
  toNumber: String,
  status: String,
  direction: String,
  startTime: { type: Date }, // Call initiation time
  speakingStartedTime: { type: Date }, // Time when telecaller starts speaking
  endTime: { type: Date },   // Call end time
  durationInSeconds: { type: Number }, // Call duration in seconds
  timestamp: { type: Date, default: Date.now }
});

const CallHistory = mongoose.model('CallHistory', callSchema);

const accountSid = 'AC2ccac6e0f0afa41a1c17a0e3da2b7cae';
const authToken = '1a8a5882482167bf5c28857e6a6e8c04';  
const client = twilio(accountSid, authToken);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
const initiateOutgoingCall = async (telecallerPhoneNumber, leadPhoneNumber) => {
  try {
    const startTime = new Date(); 
    const call = await client.calls.create({
      url: ' https://12e6-43-250-42-50.ngrok-free.app/voice.xml', 
      to: leadPhoneNumber,
      from: telecallerPhoneNumber, 
      statusCallback: ' https://12e6-43-250-42-50.ngrok-free.app/call-status', 
      statusCallbackEvent: ['initiated', 'in-progress', 'completed', 'busy', 'failed']
    });

    const callHistory = new CallHistory({
      callSid: call.sid,
      fromNumber: telecallerPhoneNumber,
      toNumber: leadPhoneNumber,
      status: 'initiated', 
      direction: 'outgoing',
      startTime: startTime,
    });
    await callHistory.save();

    console.log('Call initiated and history saved');
  } catch (error) {
    console.error('Error initiating outgoing call:', error);
  }
};

app.post('/telecaller-call', async (req, res) => {
  const { telecallerPhoneNumber, leadPhoneNumber } = req.body;

  await initiateOutgoingCall(telecallerPhoneNumber, leadPhoneNumber);

  res.status(200).json({ message: 'Call initiated and logged automatically' });
});

app.post('/call-status', async (req, res) => {
  console.log("Request Body:", req.body); // Log the body to debug

  const { CallSid, CallStatus, StartTime } = req.body;

  try {
    const call = await CallHistory.findOne({ callSid: CallSid });

    if (call) {
      call.status = CallStatus;

      if (CallStatus === 'in-progress') {
        const speakingStartedTime = new Date(); // Capture the time when the telecaller starts speaking
        call.speakingStartedTime = speakingStartedTime;

        console.log(`Call ${CallSid} is in-progress. Speaking started at ${speakingStartedTime}`);
      }

      if (CallStatus === 'completed') {
        const endTime = new Date(); 
        call.endTime = endTime;

        const durationInSeconds = Math.floor((endTime - call.startTime) / 1000);
        call.durationInSeconds = durationInSeconds;

        console.log(`Call ${CallSid} ended. Duration: ${durationInSeconds} seconds`);
      }

      await call.save();
      console.log(`Call ${CallSid} updated to status: ${CallStatus}`);
    }

    res.sendStatus(200); // Send success response
  } catch (error) {
    console.error('Error updating call status:', error);
    res.status(500).send('Error updating status');
  }
});

// Start the server
app.listen(8000, () => {
  console.log('Server running on http://localhost:8000');
});
