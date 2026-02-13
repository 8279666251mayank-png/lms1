import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContent'
import SearchBar from '../../components/student/SearchBar'
import { useParams } from 'react-router-dom'
import CourseCard from '../../components/student/CourseCard'
import { assets } from '../../assets/assets'

const CoursesList = () =>{

  const {navigate,allCourses} = useContext(AppContext)
  const [data,setdata] = useState(" ")
  const [FilteredCourse,setFilteredCourse] = useState([]);


  useEffect(()=>{
    if(allCourses && allCourses.length >0){
        const tempCourses = allCourses.slice()
        data?setFilteredCourse(
            tempCourses.filter(
                item=>item.courseTitle.toLowerCase().includes(data.toLowerCase())
            )
        ):setFilteredCourse(tempCourses)
    }

},[allCourses,data] 
  )





  return (
    <>
    <div className='relative md:px-36 px-8 pt-20 text-left'>
       <div className='flex md:flex-row flex-col gap-6 items-start justify-between w-full'>
        <div>
        <h1 className='text-4xl font-semibold text-gray-800'>Course List</h1>
        <p className='text-gray-500'>
        <span className='text-blue-600 cursor-pointer' onClick={()=>navigate("/")}>Home  </span>/<span>Course List</span>
        </p>
        </div>
        <SearchBar value={data} setdata={setdata}/>
       </div>
       {data && <div className='inline-flex items-center gap-4 px-4 py-2 border border-gray-300 mt-8 -mb-8 text-gray-600'>
        <p>{data}</p>
        <img src={assets.cross_icon} alt="" className='cursor-pointer' onClick={()=>setdata("")}/>
        </div>
       }
       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0'>
        {FilteredCourse.map((course,index)=><CourseCard key={index} course={course}/>)}
       </div>
    </div>
    </>
  )
}

export default CoursesList