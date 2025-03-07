import mongoose from 'mongoose'

export async function connenctToMongoDB() {

    try {
        await mongoose.connect(process.env.MONGO_URL as string)
        console.log('connected to mongodb');
    } catch (error) {
        console.log(error);
    }
    
}