// connection.js
import mongoose from "mongoose";

mongoose.set('strictQuery', true);

const connectDB = async () => {
  try {
    const URL = `mongodb+srv://mithileshjogale689:63tW3bgpDLqbWEf5@cluster0-rentkar.xjpvke2.mongodb.net/`;
    await mongoose.connect(URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error while connecting to database:", error);
  }
};

export default connectDB;
