import React, { useState } from 'react'
import { loginUser } from '../service/CategoryService';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setemail] = useState("")
    const[password,setpassword]=useState("")
    const [loading, setloading] = useState(false)

    const navigate=useNavigate();

    async function submitHandler(e){
        e.preventDefault();
        const form=new FormData();
        form.append("email",email)
        form.append("password",password)

        try{
        const response=await loginUser(form)

        const token=response.data
        console.log("data fetch:")
        console.log(token)

        localStorage.setItem("token",response.data.token)
        localStorage.setItem("roles",response.data.roles)
        localStorage.setItem("username",response.data.username)

        setemail("")
        setpassword("")

        toast.success("User Verified")

        navigate("/dashboard")

        }
        catch(error){
            toast.error("Wrong Credentials!!")
        }
    }

  return (
    <main className='h-[99vh] w-full bg-[url("https://imgs.search.brave.com/6BrUSXrEEN9jTRzswW07UW1tEQweBzrspwqBCXLzgaw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzYyLzkxLzM5/LzM2MF9GXzE2Mjkx/Mzk4NV9qZjdxZkw0/UmVreEZxWFlwTXVq/ZWx1YlN5cDB5emtQ/Wi5qcGc")] bg-center bg-no-repeat bg-cover flex justify-center items-center' >
        <section className='flex flex-col p-8 bg-white w-[25%] rounded-lg shadow-md'>
            <h1 className='text-center font-bold text-2xl'>Sign in</h1>
            <p className='text-center text-[13px]'>Sign in to acess your account</p>
            <form onSubmit={(e)=>submitHandler(e)} className='flex flex-col mt-4 '>
                <label htmlFor="email" className='text-[13px]'>Email Address</label>
                <input type="email" placeholder='yournameexample@.com' className='mt-3 border p-1 rounded-md text-[15px] w-full  ' name='email' id='email' onChange={(e)=>setemail(e.target.value)} value={email}/>
                <label htmlFor="" className='text-[13px] mt-4'>Password</label>
                <input type="password" className='mt-3 border p-1 rounded-md text-[15px] w-full  ' onChange={(e)=>setpassword(e.target.value)} value={password} />
                <button type='submit' className='mt-10 bg-black p-1.5 text-white rounded-md cursor-pointer'>{loading?"Loading....":"Sign in"} </button>

            </form>
        </section>
    </main>
  )
}

export default Login