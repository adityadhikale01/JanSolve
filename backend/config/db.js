//this part of code is needed to configure the database
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function connectDB() {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected");

    } catch (err) {

        console.log(err);

        process.exit(1);

    }

}