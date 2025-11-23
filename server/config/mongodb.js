import mongoose  from "mongoose";


if(!process.env.MONGODB_URI){
    throw new Error(
        "please provide MONGO_URI in the the .env file"
    )
}

   async function connectDB(){
    try{
   await mongoose.connect(`${process.env.MONGODB_URI}/Lms`)
   console.log("connect DB");
    }catch(err){
        console.log(err)
    }
}

export default connectDB