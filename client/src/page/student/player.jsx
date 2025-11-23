import React, { useEffect, useState } from "react"
import {useContext} from "react"
import { AppContext } from "../../context/AppContent"
import {useParams} from "react-router-dom"
import { assets } from "../../assets/assets"
import humanizeDuration from "humanize-duration"
import { useUser } from "@clerk/clerk-react"
import YouTube from "react-youtube"
import Footer from "../../components/student/Footer"
import Rating from "../../components/student/Rating"

const Player=()=>{

    const {enrolledCourses,CalCulateChapterTime} = useContext(AppContext)
    const {courseId} = useParams()
    const [courseData,setCourseData] = useState(null)
    const [openSections,setOpenSections] = useState({})
    const [playerData,setplayerData]= useState(null)


     const {isLoaded} = useUser()
     console.log("enrolled",enrolledCourses);

    const getCourseData =()=>{
        enrolledCourses.map((course)=>{
            if(course._id.toString()===courseId.toString()){
                console.log("course",course);
                setCourseData(course)
            }
        })
    }

useEffect(()=>{
    if (!isLoaded) return;
  getCourseData()
},[isLoaded])


    const toggleSection = (index)=>{
        setOpenSections((prev)=>(
            {
                ...prev,
                [index]:!prev[index],
            }
        ))
    };



    return(
        <div>
        <div className="p-4 sm:p-10 flex flex-col md:grid md:grid-cols-2 gap-10 md:px-36">
         {/*left*/}
         <div className="text-gray-800">
         <h2 className="text-xl font-semibold">Course Structure</h2>

  <div className='pt-5'>
     { courseData && courseData.courseContent.map((chapter,index)=>(
        <div key ={index} className='border border-gray-300 bg-white mb-2 rounded'>
            <div className='flex items-center justify-between px-4 py-3 cursor-pointer  select-none' >
              <div className="flex items-center gap-2">
                <img src={assets.down_arrow_icon} alt="arrow icon" onClick={()=>toggleSection(index)} className={`w-2 h-2 transform transition-transform duration-300 ${openSections[index]? "rotate-180":""}`}/>
                <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                </div>
                <p className='text-sm md:text-default'>{chapter.chapterContent.length} lectures-{CalCulateChapterTime(chapter)}</p>
            </div>
     
     { openSections[index] &&
    <div className='overflow-hidden transition-all duration-300 max-h-96'>
     <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
        {
            chapter.chapterContent.map((lecture,i)=>(
                <li key ={i} className='flex items-start gap-2 py-1'>
                    <img src={false ? assets.blue_tick_icon : assets.play_icon}   alt="play " className='w-4 h-4 mt-1'/>
                    <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                        <p>{lecture.lectureTitle}</p>
                        <div className='flex gap-2'>
                            {lecture.lectureUrl&& <p onClick={()=>setplayerData({
                               ...lecture,chapter:index+1,lecture:i+1
                            })}   className='text-blue-500 cursor-pointer'>Watch</p>}
                            <p>{humanizeDuration(lecture.lectureDuration*60*1000 ,{units:["h","m"]})}</p>
                        </div>
                    </div>
                </li>
            ))
        }
     </ul>
    </div>    

    }
        </div>
     ))
     }
  </div>

     <div className="flex items-center gap-2 py-3 mt-10">
    <h1 className="text-xl font-bold">Rate this Courses:</h1>
    <Rating initialRating={0}/>
     </div>


         </div>
       {/* right coloum */}
        <div className="md:mt-10">
       { playerData ?(
        <div>
           <YouTube videoId={playerData.lectureUrl.split("/").pop()} iframeClassName="w-full aspect-video"/>
           <div className="flex justify-between items-center mt-1">
            <p>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
            <button className="text-blue-600">{false?"Complete":"Mark Complete"}</button>
           </div>
        </div>
       ):
            <img src={courseData ? courseData.courseThumbnail:" "}  alt=""/>
       }
        </div>
          

        </div>
        <Footer/>
        </div>
    )
}

export default Player