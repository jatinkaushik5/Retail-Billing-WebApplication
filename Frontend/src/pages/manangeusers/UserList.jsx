import React, { useEffect, useState } from 'react'
import Search from "../../assets/Search.png"
import { deleteUser, fetchUser } from '../../service/UserService'
import Delete from "../../assets/Delete.png"
import { deleteCategory } from '../../service/CategoryService'
import toast from 'react-hot-toast'

const UserList = () => {

  const [users, setusers] = useState([])
  const [searchterm, setsearchterm] = useState("")

  useEffect(()=>{
    const loadUsers = async () => {
    const response = await fetchUser()
    
    setusers(response.data)
  }

  loadUsers()
  },users)

  const filterUser=users.filter(user=>user.name.toLowerCase().includes(searchterm.toLowerCase()))


  async function deleteCategory(id){
    try{
      await deleteUser(id)
      toast.success("User deleted Successfully")
      setusers(prev=>prev.filter(user=>user.userid!==id))
    }
    catch(error){
      toast.error("Something went wrong")
    }
  }


  
  



  return (
    <>
    <div className='h-full w-full flex flex-col overflow-auto scroll' > 
      <div className='flex justify-center w-full mt-5  border-b border-gray-400 pb-4'>
            <input type="text" placeholder='Search By Keyword' className='w-[70%] bg-white p-1' onChange={(e)=>setsearchterm(e.target.value)} />
            <img src={Search} alt="" className='h-8 cursor-pointer bg-yellow-300' />
          </div>

        <div className='h-full w-full flex flex-col items-center gap-6 mt-2'>
          {filterUser.map((user)=>(
            <div className='flex h-16 w-[90%] border bg-slate-700 rounded-lg font-poppins min-h-fit'>
              <div className='flex flex-col  w-full justify-between pl-2'>
                <h1 className='text-white p-1 text-[17px] '>{user.name}</h1>
                <p className='text-[14px] pl-1 text-white opacity-70 '>{user.email}</p>
              </div>
              <div className='flex justify-end w-full items-center mr-2 '>
                <img src={Delete} alt=""  className='h-8 cursor-pointer' onClick={()=>deleteCategory(user.userid)}/>
              </div>
            </div>
          ))}
        </div>
    </div>
    </>
  )
}

export default UserList