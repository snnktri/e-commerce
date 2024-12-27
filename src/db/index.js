import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";


const connectDB = async ()=>{
    try {
        const connectionINstances = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
       // console.log(connectionINstances);
    } catch (error) {
        console.error("MONGODB Error: ", error);
        process.exit(1);
    }
}

export default connectDB