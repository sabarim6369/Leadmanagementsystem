const mongoose = require("mongoose");
let isConnected = false; // Track if we are already connected
let currentDbUri = ""; // Track the current URI

const connectToDatabase = async (dbUri) => {
    if (isConnected && dbUri === currentDbUri) {
        console.log('Using existing database connection');
        return;
    }

    try {
        if (isConnected) {
            // Disconnect from the current connection if it's different
            await mongoose.disconnect();
            console.log('Disconnected from previous database');
        }

        // Connect to the new database
        await mongoose.connect(dbUri);
        
        isConnected = true;
        currentDbUri = dbUri; // Update the current URI
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        throw new Error('Failed to connect to database');
    }
};

module.exports = { connectToDatabase };
