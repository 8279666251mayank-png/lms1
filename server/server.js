import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"



//Initialize Express
const app = express()

//Midleware
app.use(cors())

//Routes
app.get("/",(req,res)=>res.send("API Working"))
app.post("/cleark",express.json(),clearkWebhooks)

//Port 
const PORT = process.env.PORT || 5000

connectDB().then(()=>{
    app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
});