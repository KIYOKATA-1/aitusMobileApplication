const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://Pavel:1129Park@aitus.9a5rx.mongodb.net/YourDatabaseName?retryWrites=true&w=majority&appName=Aitus');
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
