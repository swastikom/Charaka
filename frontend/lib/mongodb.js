import mongoose from "mongoose";

let dbConnection = null;

export const connectMongoDB = async () => {
  if (dbConnection) {
    return dbConnection; // If the connection is already established, return it
  }

  try {
    dbConnection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    return dbConnection;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error; // Rethrow the error to handle it at the calling site
  }
};
