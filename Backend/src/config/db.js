import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/blood_bank_db");
        console.log("DB is connected");
    }catch(e){
        console.error("DB connection failed ", e.message);
    }
}

export default connectDB;