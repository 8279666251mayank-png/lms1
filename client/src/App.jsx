import React from 'react'
import { AppContextProvider } from './context/AppContent';
import { Outlet, useMatch } from 'react-router-dom';
import Navbar from './components/student/Navbar';
import "quill/dist/quill.snow.css";


 const App = () => {
  const isEducatorRouter =useMatch('/educator/*')
  
  return (
    <AppContextProvider>
     <div className='text-default min-h-screen bg-white'>
    {!isEducatorRouter && <Navbar/>}
    <main>
     <Outlet/>
    </main>
    </div>
    </AppContextProvider>
  )
}

export default App;