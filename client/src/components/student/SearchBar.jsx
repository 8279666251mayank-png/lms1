import React from "react"
import { assets } from "../../assets/assets"


const SearchBar =({value,setdata})=>{
    return(
       <div className='flex  items-center justify-between w-95 h-11   border border-gray-500/20 '>
        <div className="flex">
         <img src= {assets.search_icon} alt="search icon" className="h-4 w-4" />
         <input type="email" placeholder='Enter for courses' value={value} onChange={(e)=>setdata(e.target.value)}
         className=' text-gray-500 placeholder-gray-500 outline-none  rounded px-2 text-sm'/>
        </div>
         <button className='  bg-blue-600 w-24 h-9 text-white mr-0.5 right-0 rounded cursor-pointer'>Search</button>
        </div>
    )

}

export default SearchBar