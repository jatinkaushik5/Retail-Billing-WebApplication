import React, { useState } from 'react'
import { Handshake } from 'lucide-react';
import Bill from "../assets/Bill.png"
import { CiLogin } from "react-icons/ci";
import { login } from '../Service/LoginService';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Login = () => {


  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const navigate=useNavigate()

  async function loginUser(e){
    e.preventDefault();
    try{
      const formdata=new FormData();
    formdata.append("email",email)
    formdata.append("password",password)

    if(email.length==0){
      toast.error("Enter Your Email")
      return
    }
    if(password.length==0){
      toast.error("Enter Your Password")
      return 
    }
    const response=await login(formdata)
    localStorage.setItem("roles",response.data.roles)
    localStorage.setItem("username",response.data.username)
    localStorage.setItem("token",response.data.token)
    console.log(response)
    navigate('/view')
    }
    catch(ex){
      toast.error("Invalid Credential");
      
      return
    }
  }




  return (
    <>
    <main className='h-screen w-screen flex flex-col justify-between bg-gray-100'>
      <header className='h-auto w-full   pt-10 flex flex-col  justify-center items-center' >
        <img src={Bill} alt=""  className='h-15 w-15 '/>
        <h1 className='text-3xl'>Bill Sathi</h1>
    </header>
    <main className=' flex justify-center items-center '>
        <section className='flex flex-col gap-2 bg-white md:p-8 p-2  rounded-lg shadow-md'>
          <h1 className='text-2xl font-bold'>Welcome Back</h1>
          <p className='opacity-50 text-[13px]'> Please enter your work email to access your billing <br /> dashboard and inventory tools </p>
          <form onSubmit={(e)=>loginUser(e)} className='flex flex-col gap-4 mt-2'>
            <label htmlFor="">Email</label>
            <input type="email" name="email" id="email"  className='md:px-8 px-5 py-1 border border-gray-300 rounded-sm focus:outline-none' placeholder='Enter Your Work Email' onChange={(e)=>setemail(e.target.value)} value={email}/>
            <label htmlFor="">Password</label>
            <input type="password" name="password" id="password" className='md:px-8 px-5 py-1 border border-gray-300 rounded-sm focus:outline-none' placeholder='Enter Your Password' onChange={(e)=>setpassword(e.target.value)} value={password} />
            <div className='flex justify-center mt-6'>
              <button type='submit' className='flex items-center text-center  text-white shadow-md cursor-pointer px-20 py-1.5 bg-[#26819D]'>Login in <CiLogin /></button>
            </div>
          </form>
        </section>
    </main>

    <footer className='flex justify-center gap-6 text-[#26819D]'>
      <p>© 2024 Bill Sathi. All rights reserved.</p>
      <p>Privacy Policy</p>
      <p>Terms of Service</p>
      <p>Help Center</p>
    </footer>
    </main>
    </>
  )
}

export default Login