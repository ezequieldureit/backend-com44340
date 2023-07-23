import mongoose from "mongoose";

// Configuring the connection to the database
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ezequieldureit:ChKf1MXeRxz6ajz3@cluster0-ezequieldure.vjcwgnh.mongodb.net/ecommerce",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Successful connection to the database");
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    process.exit(1); // Exit process with error
  }
};

export default connectDB;
