import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./configs/mongodb.js"
import { ClerkWebhook } from "./controllers/webhook.js"


//Initilizer
const app = express()

//Middleware
app.use(cors())

//Coonnect to database
await connectDB()

//Routes
app.get("/",(req,res)=>res.send("API Working"))
app.post("/clerk",express.raw({ type:"application/json" }),ClerkWebhook)

app.use(express.json());

//port 
const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})

