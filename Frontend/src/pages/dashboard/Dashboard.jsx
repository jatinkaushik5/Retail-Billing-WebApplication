import React, { useEffect, useState } from 'react'
import { fetchDetails } from '../../service/OrderService'
import Rupee from "../../assets/Rupee.png"
import cart2 from "../../assets/cart2.png"
import Clock from "../../assets/Clock.png"

const Dashboard = () => {
  const[response,setresponse]=useState({
    totalSale: 0,
  Size: 0,
  Orders: []
  })

  const[show,setshow]=useState(null)

  useEffect(()=>{
    async function fetch(){
     try{
       const response1=await fetchDetails();
       setresponse(response1.data)
       setshow(true)
     }
     catch(e){
      console.log(e)
     }
    }
    fetch()
  },[])
 
  return (
    <section className='h-[93.7vh] bg-slate-900 w-full border flex flex-col items-center'>
      {/* 1 */}
      <div className='h-[15%] w-[95%]  mt-10 flex justify-evenly  items-center'>
        <div className='h-[80%] w-[40%] bg-gray-700 flex items-center rounded-lg shadow-md'>
          <img src={Rupee} alt="" />
          <span className=' ml-7 flex flex-col justify-between h-full pt-2 pb-3'>
            <p className='text-white opacity-77 font-poppins text-[15px]'>Today's Earning</p>
            {show ? <p className='text-white font-bold text-[20px] font-poppins'> ₹{response.totalSale}</p>:<p className='text-white font-bold text-[20px] font-poppins'> ₹0</p>}
          </span>
        </div>
        <div className='h-[80%] w-[40%] border bg-gray-700 flex justify-evenly items-center rounded-lg shadow-md'>
          <img src={cart2} alt="" />
          <span className='flex flex-col justify-between pt-2 pb-2'>
            <p className='text-white opacity-77'>Today's Orders</p>
            {show ? <p className='text-center font-bold text-white text-[20px] font-poppins'>{response.Size}</p>:<p className='text-center font-bold text-white text-[20px] font-poppins'>0</p>}
          </span>
        </div>
      </div>
      {/* 2 */}
      <div className='mt-10 flex flex-col w-[95%] bg-slate-700 p-3 rounded-lg'>
        <div className='flex w-full  items-center pl-5 gap-5'>
          <img src={Clock} alt="Not found" className='h-11' />
          <p className='text-white font-bold  text-2xl font-poppins'>Recent Orders</p>
        </div>
       {show ?
        <table className='w-full'>
          <thead className='bg-slate-500 text-white text-[17px]'>
            <th>Order Id</th>
            <th>CustomerName</th>
            <th>Phone Number</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Time</th>
          </thead>
          <tbody>
            {response.Orders.map((res)=>(
              <tr className='w-full text-white mt-1'>
              <td className='w-[18%]  text-[12px]  font-poppins '>{res.id}</td>
              <td className='w-[18%] text-center overflow-auto scroll font-poppins text-[14px]'>{res.customerName}</td >
              <td className='w-[18%] text-center overflow-auto scroll font-poppins text-[14px]'>{res.phoneNumber}</td>
              <td className='w-[18%] text-center overflow-auto scroll font-poppins text-[14px]'>₹{res.grandTotal}</td>
              <td className='w-[15%] text-center overflow-auto scroll font-poppins text-[14px]'>{res.paymentMethod}</td>
              <td className='w-[18%] text-center overflow-auto scroll font-poppins text-[14px]'>{new Date(res.createdAt).toLocaleString('en-IN', {
                day: 'numeric',      // "14"
                year: 'numeric',     // "2026"
                month: 'short',      // "Mar"
                hour: '2-digit',     // "06 PM"
                minute: '2-digit',   // "30"
  hour12: true         // 12-hour format
})}</td>
              </tr>
            ))} 
          </tbody>
        </table>:
        <div className='h-20vh w-full'>
          <p className='text-center text-4xl font-poppins'>Order List Empty</p>
        </div>
        }
      </div>
    </section>
  )
}

export default Dashboard