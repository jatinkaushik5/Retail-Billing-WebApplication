import React, { useContext, useState } from 'react'
import { AppContext } from '../../Context/AppContext'
import { data } from 'react-router-dom';

const Customerform = () => {

  const {setcustomername,setcustomernumber,customername,customernumber}=useContext(AppContext);

  const Data=localStorage.getItem("order")

  if(Data){
    console.log("inside data")
    const orderdata=JSON.parse(localStorage.getItem("order"))
    setcustomername(orderdata.customerName)
    setcustomernumber(orderdata.phoneNumber)

  }

  return (
    <form action=""  className='h-full w-full p-3 flex flex-col gap-6'>
        <div className='flex gap-4'>
            <label htmlFor="name" className='font-poppins text-[15px]'>Customer Name</label>
            <input type="text" name='name' id='name' className='border bg-white rounded-md text-black pl-1' value={customername} onChange={(e)=>setcustomername(e.target.value)} />
        </div>
        <div className='flex gap-6'>
            <label htmlFor="number" className='font-poppins text-[15px]'>Mobile Number</label>
            <input type="tel" name='number' id='number' className='border bg-white rounded-md text-black pl-1' value={customernumber} onChange={(e)=>setcustomernumber(e.target.value)} />
        </div>
    </form>
  )
}

export default Customerform