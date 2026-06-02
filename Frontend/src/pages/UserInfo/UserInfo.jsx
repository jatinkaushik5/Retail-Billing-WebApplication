import React, { useEffect, useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { FaBook } from "react-icons/fa";
const UserInfo = ({view}) => {
    const[showform,setshowform]=useState(false)
    const[show,setshow]=useState(true)
    useEffect(()=>{
        setshow(view)
    },[view])
  return (
    <>
   {show &&
    <main className='absolute h-full w-full bg-black/20'>
    <header className='h-12  flex justify-end p-2'>
        <div className='bg-white rounded-full p-2 min-h-fit min-w-fit' onClick={()=>setshow(!show)}><RxCross1/></div>
    </header>

    <section className='h-[90vh] w-full  bg-white flex flex-col min-h-fit '>
        {/* 1 */}
        <div className='md:h-[40%] h-[60%]   w-full md:pl-0 pl-8  flex md:flex-row flex-col '>
            <div className='md:h-full h-[20%]    md:w-[60%] w-full  flex items-center'>
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWgyOr4nt2G36R1rcgHml4mkTZPTYi8eYJn4XotkamD988KC0kJhILWzQk_XXzsSNEVn8vURdbQAhCGjCWUM1V7QW1NIclqDUdcbUF4aol5QXVfEHz-gV1Vb3WOvS7cQRoDKJ6RigjXO6RR0tb5Vw7sccjGEZIoc9DV86R49dckVNeC_z-pYscosHAOw_uw6jaeaJtPhWrBvt6vBQie3m_k2ZJQmmoxvf28dAghY40P60oAqb8fIIZ_AHRgXubnDUtCWneYnc3rJE" className=' md:h-[80%] h-[40%]' alt="" />
                <div className='flex flex-col  p-4 gap-2'>
                    <h1 className='md:text-6xl text-3xl'>Jatin Kaushik</h1>
                    <h2 className='text-center md:text-2xl font-bold text-gray-900 opacity-50'>Admin</h2>
                </div>
            </div>
            <div className='md:h-full  h-[30%]  min-h-fit md:w-[40%] w-full md:p-4 p-1'>
                <div className='h-full w-full bg-[#00647E]  rounded-2xl shadow-lg p-5 min-h-fit flex flex-col border-red-500'>
                    <FaBook size={30} className='text-white'/>
                    <span className='text-center pt-10'>
                        <p className='text-white opacity-85'>System Authority</p>
                        <p className='text-2xl text-white font-extrabold'>Full Admin</p>
                    </span>
                    <div className=' h-10 mt-10 flex justify-center gap-3 '>
                        <button className='w-[50%]  shadow-md rounded-lg  bg-green-950 text-white' onClick={()=>setshowform(!showform)}>Change Details</button>
                        <button className='w-[50%]  shadow-md rounded-lg bg-red-700 text-white' onClick={()=>setshowform(!showform)}>Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
        {/* 2 */}
           {showform &&
           <>
        <div className='h-[60%] w-full  flex  justify-center md:bg-white bg-gray-300'>
            <form   className='flex flex-col  gap-2 pt-10  p-4  py-2 '>
                <h1 className='text-center font-extrabold'>Updation Form</h1>
            <label htmlFor="" className='text-[14px] text-gray-800 font-semibold'>Username</label>
            <input type="text " placeholder='e.g John Doe' className=' w-full focus:outline-none p-1 text-[15px]  '  />
            <label htmlFor="" className='text-[14px] text-gray-800 font-semibold'>Email Address</label>
            <input type="email" name="" id="" placeholder='john@example.com' className=' w-full focus:outline-none p-1 text-[15px] text-gray-800'  />
                        <label htmlFor="" className='text-[14px] text-gray-800  font-semibold'>Password</label>
            <input type="password" name="" id=""  className=' w-full focus:outline-none p-1 text-[15px] 'placeholder='......'  />

            <input type="text"   hidden/>
            <div className='flex  md:pl-4 pr-8 mb-2 mt-6 justify-between gap-3'>
                <button type='submit' className='px-11 py-2  rounded-md shadow-md bg-[#26819D] font-medium text-white text-nowrap'>Update Data</button>
            </div>
</form>
        </div>
</>}
    </section>
    </main>
   }
    </>
    
  )
}

export default UserInfo