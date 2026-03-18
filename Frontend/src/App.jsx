import React, { useContext, useEffect } from 'react'
import logo from './assets/logo.png'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Routes,Route } from 'react-router-dom'
import Menubar from './components/Menubar'
import Dashboard from './pages/dashboard/Dashboard'
import Explore from './pages/explore/Explore';
import Manage_items from './pages/manageitems/Manage_items'
import Manage_Categories from './pages/managecategories/Manage_Categories'
import Manage_Users from './pages/manangeusers/Manage_users'
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login'
import DisplayReceipt from   "./pages/display/DisplayReceipt"
import { AppContext } from './Context/AppContext'


const App = () => {

  const location=useLocation();
  const token=localStorage.getItem("token")
  const navigation=useNavigate()
  const {showReceipt,setshowReceipt}=useContext(AppContext)
  const paymentDone=JSON.parse(localStorage.getItem("payment"))
  const roles=JSON.stringify(localStorage.getItem("roles"))
  

  useEffect(() => {
    const showres = localStorage.getItem("showReceipt");
    const ShowReceipt = showres ? JSON.parse(showres) : null;
    setshowReceipt(ShowReceipt);
  }, [setshowReceipt]);

  

 const LoginRoute=({children})=>{
  return !token ?children: <Navigate to={'/dashboard'}/>
 }

 const Routing=({children,role})=>{
  if(token){
    if(roles.includes(role)){
    return children;
  }
  else{
    return <Navigate to={'/dashboard'}/>
  }
  }
  else{
    return <Navigate to='/loginPage'/>
  }
 }


  
  return (
    <>
    {location.pathname !=="/loginPage" && <Menubar/>}
    <Toaster/>
    <Routes>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/explore' element={<Explore/>}/>
        <Route path='/manage_items' element={<Routing role="ROLE_ADMIN"><Manage_items/></Routing>}/>
        <Route path='/manage_categories' element={<Routing role="ROLE_ADMIN"><Manage_Categories/></Routing>}/>
        <Route path='/manage_users' element={<Routing role='ROLE_ADMIN'><Manage_Users/></Routing>}/>
        <Route path='/loginPage' element={<LoginRoute><Login/></LoginRoute>}/>

    </Routes>
    {showReceipt &&
    <div className='h-[93vh] inset-0 fixed w-full border bg-black/70 flex justify-center items-center z-89'> <DisplayReceipt/>
    </div>
    }
    </>
  )
}

export default App