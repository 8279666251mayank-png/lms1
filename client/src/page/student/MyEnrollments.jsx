import React, { useContext } from "react"
import { AppContext } from "../../context/AppContent"
import {Line} from "rc-progress"
import Footer from "../../components/student/Footer"

import { useState } from "react"
const MyEnrollments =()=>{

  const {enrolledCourses,calculateCourseDuration,navigate}= useContext(AppContext)

  const [progressArray,setProgressArray] = useState([
    {lectureCompleted:2,totalLectures:4},
    {lectureCompleted:1,totalLectures:5},
    {lectureCompleted:3,totalLectures:6},
    {lectureCompleted:4,totalLectures:4},
    {lectureCompleted:2,totalLectures:4},
    {lectureCompleted:1,totalLectures:5},
    {lectureCompleted:9,totalLectures:12},
    {lectureCompleted:6,totalLectures:8},
    {lectureCompleted:2,totalLectures:4},
    {lectureCompleted:9,totalLectures:10},
    {lectureCompleted:7,totalLectures:9},
    {lectureCompleted:4,totalLectures:8},
    {lectureCompleted:6,totalLectures:10},
    {lectureCompleted:3,totalLectures:5},
    {lectureCompleted:3,totalLectures:7},
    {lectureCompleted:6,totalLectures:9},

  ])


    return(
        <>
        <div className="md:px-36 px-8 pt-10">
            <h1 className="text-2xl font-semibold ">My Enrollments page</h1>
            <table className="md:table-auto table-fixed  overflow-hidden  w-full border-b  border mt-10 mb-3">
                <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden">
                    <tr>
                        <th className="px-4 py-3 font-semibold truncate">Course</th>
                        <th className="px-4 py-3 font-semibold truncate">Duration</th>
                        <th className="px-4 py-3 font-semibold truncate">Completed</th>
                          <th className="px-4 py-3 font-semibold truncate">status</th> 
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {enrolledCourses.map((course,index)=>(
                        <tr key={index} className="border-b border-gray-500/20">
                            <td className="md:px-4 pl-2 md:pl-4 py-3 md:flex flex-cols items-center space-x-3">
                          <img src={course.courseThumbnail} alt="" className="w-14 sm:w-24 md:w-28" />
                          <div className="flex-1">
                            <p className="mb-1 max-sm:text-sm">{course.courseTitle}</p>
                            <Line strokeWidth={2} percent={progressArray[index]?progressArray[index].lectureCompleted*100/progressArray[index].totalLectures:0} className="bg-gray-300 rounded-full"/> 
                          </div>
                             </td>

                              <td className="px-4 py-3 max-sm:hidden">
                               {calculateCourseDuration(course)}
                              </td>
                              <td className="px-4 py-3 max-sm:hidden">
                                {progressArray[index] && `${progressArray[index].lectureCompleted}/${progressArray[index].totalLectures}`}<span className="px-2">Lectures</span>
                              </td>
                               <td className="px-4 py-3 max-sm:text-right">
                            {
                            progressArray[index] && progressArray[index].lectureCompleted/progressArray[index].totalLectures===1?<button className="bg-emerald-500 px-3 sm:px-5 py-1.5 sm:py-2  max-sm:text-xs cursor-pointer text-white" onClick={()=>navigate("/player/"+course._id)}>complete</button>:<button className="px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:text-xs cursor-pointer text-white" onClick={()=>navigate("/player/"+course._id)} >On Going</button>
                            }
                              </td>

                        </tr>
                        
                    ))

                    }

                   
                </tbody>
            </table>
        </div>
        <Footer/>
        </>
    )
}

export default MyEnrollments