import mongoose from "mongoose";

//Connecting to database
export const connectDB = () => {
  mongoose
    .connect(process.env.NODE_DB_URI, {
      useNewURLParser: true,
      dbName: "ecommerce",
    })
    .then((data) =>
      console.log(`Connected to database on ${data.connection.host}`)
    )
};
