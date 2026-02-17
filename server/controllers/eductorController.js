import {clerkClient} from "@clerk/express"
import Course from "../models/Course.js"
import {v2 as cloudinary} from "cloudinary"

//update role to educator
export const updateRoleToEducator = async(req,res)=>{
  try{
    const {userId} = req.auth()

    await clerkClient.users.updateUserMetadata(userId,{
        publicMetadata:{
            role:"educator"
        }
    })
    res.json({success:true,message:"you can publish a course now"})
  }catch(error){
    res.json({success:false,message:error})
  }
}


//Add New Course
export const addCourse = async(req,res)=>{
  try{
  const {courseData} = req.body
  const imageFile = req.file
  const educaterId = req.auth.userId
 
  console.log("imagefile",imageFile)
  console.log(courseData,"courseData")

  if(!imageFile){
    return res.json({success:false,message:"Thumbail NOt Attached"})
  }
 
  const parsedCourseData =  JSON.parse(courseData)
  parsedCourseData.educator = educaterId
  const newCourse = await Course.create(parsedCourseData)
  const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
  folder: "lms_thumbnails",
  resource_type: "image",
  quality: "auto:good",
  fetch_format: "auto",
  transformation: [
    { width: 1280, height: 720, crop: "limit" }
  ]
})
  newCourse.courseThumbnail = imageUpload.secure_url
  await newCourse.save()

  res.json({success:true,message:"Course Added"})

  }catch(error){
res.json({success:false,message:error.message})
  }
}

//Get Educator Courses
export const getEducatorCourses = async(req,res)=>{
  try{
    const educator = req.auth.userId

    const courses = await Course.find({educator})
    res.json({success:true,courses})
  }catch(error){
    res.json({success:false,message:error.message})
  }
}


