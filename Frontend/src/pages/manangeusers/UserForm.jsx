import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { addUser } from '../../service/UserService'

const UserForm = () => {

  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [loading, setloading] = useState(false)

  async function submitHandler(e){
    e.preventDefault();

    if(name.length===0){
      toast.error('Enter user name')
      return
    }
    else if(email.length==0){
       toast.error('Enter user email')
    }
    else if(password.length===0 || password.length <4){
      toast.error('password length must between 4 and 8')
      return
    }
    else{
      try{
        setloading(true)
        const formdata=new FormData()
        formdata.append('name',name)
        formdata.append('email',email)
        formdata.append('password',password)
        const response=await addUser(formdata)
        setname('')
        setemail('')
        setpassword('')
        toast.success("User Saved Successfully")

      }
      catch(error){
        const status=error?.response?.status

        if(status===403){
          toast.error("Email already registered")
        }
      }
      finally{
        setloading(false)
      }
    }

  }



  return (
    <>
    <form action="" onSubmit={(e)=>submitHandler(e)} className='flex flex-col  mt-15'>
            <label htmlFor="name" className='font-poppins'>Name</label>
            <input type="text" placeholder='Customer Name' className='mt-1 border p-1 rounded-sm border-gray-300 ' name='name' id='name' onChange={(e)=>setname(e.target.value)} value={name}/>
            <label htmlFor="email" className='font-poppins mt-3'>Email</label>
            <input type="email" placeholder='@example.com' className='mt-1 border p-1 rounded-sm border-gray-300 ' name='email' id='email' onChange={(e)=>setemail(e.target.value)} value={email} />
            <label htmlFor="password" className='font-poppins mt-8'>Password</label>
            <input type="password"  className='mt-1 border p-1 rounded-sm border-gray-300 '  name='password' id='password' onChange={(e)=>setpassword(e.target.value)} value={password}/>
            <button type='submit' className='mt-7 border p-1 rounded-sm bg-yellow-500 font-poppins text-white shadow-md'>{loading ?"Loading...":"Save"}</button>
        </form>
    </>
  )
}

export default UserForm