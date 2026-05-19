import mongoose from "mongoose";

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected.");
        
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

export default db;