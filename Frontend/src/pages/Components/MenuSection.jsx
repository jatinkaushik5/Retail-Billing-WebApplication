import React from 'react'
import Bill from "../../assets/Bill.png"
import { MdOutlineDashboard } from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { MdOutlineInventory2 } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
const MenuSection = ({width}) => {
  const navigate=useNavigate()

  function logoutUser(){
    localStorage.removeItem("roles")
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    navigate("/")

  }

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
    <header className={`h-full w-100  md:flex hidden flex-col gap-10 p-4    `}>
        <div className='flex  items-center md:justify-start justify-center  h-15'>
            <img src={Bill} alt="" className='h-11' />
            <h1 className='text-[20px] font-bold text-[#00647E] '>BillSathi</h1>
        </div>
        <nav className='flex flex-col gap-4 '>
                            <Link to='/view'  className='flex   h-11 gap-3 font-inter items-center  text-gray-700  hover:text-blue-500 cursor-pointer transition-all duration-150 p-4'><MdOutlineDashboard />Dashboard</Link>
                            <Link to='/view/billing' className='flex h-11  font-inter gap-3  items-center text-gray-700 hover:text-blue-500 cursor-pointer transition-all duration-150 p-4'><FaMoneyCheckAlt />Billing</Link>
                         {isAdmin() &&    <Link to={'/view/inventory'} className='flex font-inter h-11  gap-3 items-center text-gray-700 hover:text-blue-500 cursor-pointer transition-all duration-150 p-4'><MdOutlineInventory2 />Inventory</Link>}
                          {isAdmin() &&   <Link to='/view/users' className='flex h-11 font-inter gap-3  items-center text-gray-700 hover:text-blue-500 cursor-pointer transition-all duration-150 p-4'><FaUsers />Users</Link>}
        </nav>

        <div className='flex flex-col items-center justify-end h-full mb-4 gap-10'>
          <Link to={'/view/billing'} >  <button className='flex items-center justify-center text-center  gap-2 rounded-md cursor-pointer h-11 w-52 font-inter font-semibold text-[14px] p-1 bg-[#00647E] text-white'> <FaPlus />New Transaction</button></Link>
            <button className='flex items-center justify-center text-center  gap-2 rounded-md cursor-pointer h-11 w-52 font-inter font-semibold text-[14px] p-1 bg-blue-500  text-white' onClick={logoutUser}> Logout</button>
        </div>
    </header>
    
    </>
  )
}

export default MenuSection