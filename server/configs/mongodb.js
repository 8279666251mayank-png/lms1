import mongoose from "mongoose";

//connect to the MongoDB database


const connectDB = async ()=>{
    try{
     await mongoose.connect(process.env.MONGODB_URI);
     console.log("Data connected")
    }catch(error){
   console.log("Database Connection Failed")
   console.error(error)
   process.exit(1);
    }
}

export default connectDB;