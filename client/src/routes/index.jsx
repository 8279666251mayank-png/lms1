import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import Home from "../page/student/Home";
import CoursesList from "../page/student/CoursesList";
import CourseDetails from "../page/student/CourseDetails";
import MyEnrollments from "../page/student/MyEnrollments";
import Player from "../page/student/player";
import Loading from "../components/student/Loading";
import Educator from "../page/educator/Educator";
import AddCourse from "../page/educator/AddCourse";
import Dashboard from "../page/educator/Dashboard";
import MyCourses from "../page/educator/MyCourse";
import StudentsEnrolled from "../page/educator/StudentsEnrolled";

const router = new createBrowserRouter([
    {
       path:"",
       element:<App/>,
       children:[
        {
            path:"/",
            element:<Home/>

        },
        {
           path:"/course-list", 
           element:<CoursesList/>
        },
        {
          path:"/course-list/:input",
          element:<CoursesList/>
        },
        {
            path:"/course/:id",
            element:<CourseDetails/>
        },
        {
            path:"/my-enrollments",
            element:<MyEnrollments/>
        },
        {
            path:"/player/:courseId",
            element:<Player/>
        },
        {
            path:"/loading/:path",
            element:<Loading/>
        },
        {
            path:"/educator",
            element:<Educator/>,
            children:[
             {
            path:"",
            element:<Dashboard/>
             },
             {
                path:"add-course",
                element:<AddCourse/>
             },
             {
                path:"my-courses",
                element:<MyCourses/>
             },
             {
                path:"student-enrolled",
                element:<StudentsEnrolled/>
             },
            
            ]
        }
        

       ]
    }
])

export default router