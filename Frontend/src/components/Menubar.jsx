import React, { useState } from 'react'
import logo from '../assets/logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Userlogo from "../assets/Userlogo.png"
import Dropdown from "../assets/Dropdown.png"
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";
import toast from 'react-hot-toast';

const Menubar = () => {

   const name=localStorage.getItem("username");
   const roles=JSON.stringify(localStorage.getItem("roles") || "[]")
   const navigate=useNavigate()
   const location=useLocation()
   

   function logoutUser(){
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("roles");
      navigate("/loginPage")
   }

   function isActive(path){
      return location.pathname===path
   }

 
   function isAdmin(role) {
   if (roles.includes(role)) {
    return true;
   }
  return false;
}


   const [show, setshow] = useState(false)
  return (
     <header className='h-13 w-full  bg-slate-950 flex justify-evenly '>
        <div className='h-full '>
           <Link className='h-full flex items-center'> <img src={logo} alt="" className='h-[80%]'/></Link>
        </div>
         <nav className='flex gap-7 items-center font-mono text-white'>
                <Link className={`  opacity-70 hover:opacity-100 transition-all duration-75 font-Roboto text-[14px]  d ${isActive("/dashboard")?'border-b-2 text-blue-500':''}`} to={'/dashboard'}>DASHBOARD</Link>
                <Link className={`  opacity-70 hover:opacity-100 transition-all duration-75 font-Roboto text-[14px]  d ${isActive("/explore")?'border-b-2 text-blue-500':''}`} to={'/explore'}>EXPLORE</Link>
               {isAdmin("ROLE_ADMIN") ?
               <>                <Link className={`  opacity-70 hover:opacity-100 transition-all font-Roboto text-[14px] duration-75  d ${isActive("/manage_items")?'border-b-2 text-blue-500':''}`} to={'/manage_items'}>MANAGE ITEMS</Link>
                <Link className={`  opacity-70 hover:opacity-100 transition-all duration-75 font-Roboto text-[14px]  d ${isActive("/manage_categories")?'border-b-2 text-blue-500':''}`} to={'manage_categories'}>MANAGE CATEGORIES</Link>
                <Link className={`  opacity-70 hover:opacity-100 transition-all duration-75 font-Roboto text-[14px]  d ${isActive("/manage_users")?'border-b-2 text-blue-500':''}`} to={'manage_users'}>MANAGE USERS</Link>
                </>

               :
               <div></div>
               }
            </nav>

          <div className='flex items-center mt-2 h-full  '>
             <div className='h-full flex relative z-50 '>
        <img src={Userlogo} alt="" className='h-9 w-9 rounded-full' onClick={()=>setshow(!show)} />
          {show && 
          <div className='absolute right-0 mt-9 w-40 bg-white rounded shadow-lg'>
              <span className='flex justify-between pl-1 pr-1'>
               <p className='font-bold  '>Name</p>
               <p className=''>{name}</p>
              </span>
               <span className='flex justify-between pl-1 pr-1'>
               <p className='font-bold  '>Role</p>
               <p className=''>{isAdmin("ROLE_ADMIN")?"Admin":"Employee"}</p>
              </span>
              <p className='p-2 cursor-pointer bg-red-600 text-white' onClick={logoutUser}>Logout</p>
            </div>}
            
      </div>
          </div>

    </header>
  )
}

export default Menubar