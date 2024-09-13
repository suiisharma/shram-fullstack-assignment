import mongoose from "mongoose";
import Logger from "../logger/winston_logger.js";



const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        Logger.info('Database connected successfully!')
    } catch (error) {
        Logger.error(`Error : ${error?.message}`);
        process.exit(1);
    }
}


export default connectDb;