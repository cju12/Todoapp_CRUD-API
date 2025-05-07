import mongoose from "mongoose";

/**
 * implement a connectToDB async function to export the function to the server-side javascript file.
 * 
 * Thus, connection to the DB will be much easier on the server.
 */

const connectToDB = async () => {
    await mongoose.connect(process.env.URI).then((res) => {
        console.log("MongoDB connected successfully");
    })
}

// Export the connectToDB function as the default export to allow easy import and usage in server-side javascript file. 
export default connectToDB;