import mongoose from "mongoose";

interface connectionType {
  isConnected?: any;
}

const connection: connectionType = {};

export async function connectDB() {
  try {
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }

    const db = await mongoose.connect(process.env.MONGODB_URI!);
    if (db.connection) console.log("Mongodb Connected Successfully!");
    connection.isConnected = db.connections[0].readyState;
  } catch (error: any) {
    console.log(error.message);
  }
}
