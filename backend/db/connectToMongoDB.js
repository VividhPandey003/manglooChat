import mongoose from 'mongoose';

const connectToMongoDB = async () => {
    try {
        const response = await mongoose.connect(process.env.MONGO_DB_URI);
        console.log(`MongoDB connected: ${response.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

export default connectToMongoDB;
