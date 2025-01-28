const mongoose = require("mongoose");
let isConnected = false;
let currentDbUri = ""; 
const connectToDatabase = async (dbUri) => {
    if (isConnected && dbUri === currentDbUri) {
        console.log('Using existing database connection');
        return;
    }

    try {
        if (isConnected) {
            await mongoose.disconnect();
            console.log('Disconnected from previous database');
        }

        await mongoose.connect(dbUri);
        
        isConnected = true;
        currentDbUri = dbUri; 
        console.log(currentDbUri)
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        throw new Error('Failed to connect to database');
    }
};

module.exports = { connectToDatabase };
