import React from 'react'
import { MdOutlineDashboard } from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { MdOutlineInventory2 } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import MenuSection from './Components/MenuSection';
import Dashboard from './DashBoard/Dashboard';
import Users from './User/Users';
import { Link, Outlet } from 'react-router-dom';

const View = () => {
  const roles=localStorage.getItem("roles")
   function isAdmin(){
    if(roles.includes("ROLE_ADMIN")){
      console.log(true)
      return true;
    }
    else{
      console.log(false)
      return false;
    }
  }
  return (
    <>
    <main className='h-screen w-screen flex   min-h-fit bg-[#F2F4F6] relative'>
        <MenuSection/>
        <section className='h-full w-full  flex flex-col  overflow-auto scroll-smooth relative ' >
        <Outlet/>



            {/* smallNav */}
        </section>
         <footer className='  flex flex-col md:hidden w-full border-t border-[#26819D] fixed bottom-1 z-88 bg-[#26819D] '>
                <nav className={`flex ${isAdmin() ?"justify-between":"justify-evenly"} w-full p-2`}>
                            <Link to='/view'  className='flex flex-col  gap-1 items-center text-[12px] text-white hover:text-blue-500 cursor-pointer transition-all duration-150'><MdOutlineDashboard />Dashboard</Link>
                            <Link  to ='/view/billing' className='flex flex-col  gap-1 text-[12px] items-center text-white hover:text-blue-500 cursor-pointer transition-all duration-150'><FaMoneyCheckAlt />Billing</Link>
                           {isAdmin() &&  <Link to={'/view/inventory'} className='flex flex-col  gap-1 text-[12px] items-center text-white hover:text-blue-500 cursor-pointer transition-all duration-150'><MdOutlineInventory2 />Inventory</Link>}
                           {isAdmin() &&  <Link to='/view/users' className='flex flex-col  gap-1 text-[12px] items-center text-white hover:text-blue-500 cursor-pointer transition-all duration-150'><FaUsers />Users</Link>}
                        </nav>
            </footer> 
    </main>
    </>
  )
}

export default View