import mongoose from 'mongoose';

// Track the connection status
let isConnected = false;

export const connectToDatabase = async () => {
    if (isConnected) {
        console.log('=> Using existing database connection');
        return;
    }

    try {
        // Connect to MongoDB using the connection URI from environment variables
        const db = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Set the connection status
        isConnected = db.connections[0].readyState;
        console.log('=> Connected to database');
    } catch (error) {
        console.error('Database connection failed:', error);
        throw new Error('Database connection error');
    }
};

