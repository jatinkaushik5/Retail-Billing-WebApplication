import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { IoBag } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { CiBank } from "react-icons/ci";
import { getOrderDetails } from '../Inventory/InventoryService';
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useLocation } from 'react-router-dom';
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import UserInfo from '../UserInfo/UserInfo';
import { GoArrowRight } from "react-icons/go";


const Dashboard = () => {
    const location = useLocation() 

    const [dashdetails, setdashdetails] = useState({})
    const [todayorder, settodayorder] = useState(0)
    const [todayEarning, settodayEarning] = useState(0)
    const [orders, setorders] = useState([])
    const [searchterm, setsearchterm] = useState("")
    const [filterorders, setfilterorders] = useState([])
    const [totalOrder, settotalOrder] = useState(0)
    const[currentMonth,setcurrentMonth]=useState("")

    const [currentPage, setcurrentPage] = useState(0)
    const [index,setindex]=useState(0)

    const dataperblock=10;
    const windowsize=3;
    const[windowStart,setwindowStart]=useState(0)
    const endPage=Math.ceil(totalOrder/dataperblock);

    useEffect(() => {
        async function fetch() {
            const page=currentPage;
            const response = await getOrderDetails(currentPage);
            console.log(response.data)
            settodayorder(response.data.todayOrders)
            settodayEarning(response.data.totalSale)
            settotalOrder(response.data.totalOrder)
            setorders(response.data.Orders)
            setfilterorders(response.data.Orders)
            setcurrentMonth(response.data.currentMonth)
            console.log(response.data.Orders)
        }

        fetch()
    }, [location,currentPage])


    useEffect(() => {
        if (searchterm.length > 0) {
            setfilterorders(orders.filter(o => o.customerName.toLowerCase().includes(searchterm.toLowerCase())))
        }
        else {
            setfilterorders(orders)
        }
    }, [searchterm])
    function isAdmin(roles) {
        if (roles.includes("ROLE_ADMIN")) {
            return "Store Manager";
        }
        else {
            return "Employee";
        }
    }

    function moveNext(){

        if(windowStart>=endPage-3){
            return
        }
       
        setwindowStart(windowStart+windowsize)
        setindex(windowStart+windowsize)
    }

    function movePrev(){
         if(windowStart<=0){
            return
        }
        setwindowStart(windowStart-windowsize)
        setindex(windowStart-windowsize)
    }

   

    const name = localStorage.getItem("username")
    return (
        <>
            {/* 1 */}
            <div className='h-17   flex items-center  justify-between  md:px-8 md:py-2 px-2 py-2 md:gap-0 gap-3 bg-white border-b border-gray-200'>
                <div className=' flex items-center bg-[#ECEEF0]  rounded-md'>
                    <CiSearch className=' md:h-10 h-8 w-7 p-1 rounded-l-md '  />
                    <input type="text" placeholder='Search By CustomerName' className=' h-8 bg-[#ECEEF0] md:w-65  sm:w-50  p-2 text-[10px] md:text-[12px] tracking-wider focus:outline-none rounded-r-md font-inter ' onChange={((e) => setsearchterm(e.target.value))} value={searchterm} />
                </div>
                <div className='flex h-full mr-10 items-center gap-4  '>
                    <span className='flex flex-col'>
                        <p className='font-extrabold font-inter md:text-[12px] text-[7px] text-nowrap  text-[#191C1E] '>{localStorage.getItem("username")}</p>
                        <p className='opacity-65 md:text-[12px] text-[7px] text-nowrap'>{isAdmin(localStorage.getItem("roles"))}</p>
                    </span>
                    <img onClick={()=>setshowinfo(!showinfo)} src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWgyOr4nt2G36R1rcgHml4mkTZPTYi8eYJn4XotkamD988KC0kJhILWzQk_XXzsSNEVn8vURdbQAhCGjCWUM1V7QW1NIclqDUdcbUF4aol5QXVfEHz-gV1Vb3WOvS7cQRoDKJ6RigjXO6RR0tb5Vw7sccjGEZIoc9DV86R49dckVNeC_z-pYscosHAOw_uw6jaeaJtPhWrBvt6vBQie3m_k2ZJQmmoxvf28dAghY40P60oAqb8fIIZ_AHRgXubnDUtCWneYnc3rJE" alt=""  className='md:h-9 md:w-9 h-7 w-7  bg-gray-400 md:p-1 p-0.5 rounded-2xl' />
                </div>
            </div>

           <div className='flex items-center justify-between sm:pr-10'> 
             <span className='sm:pl-8 sm:pt-3 sm:pr-8 flex flex-col gap-3 mb-5 p-3  '>
                <p className='text-[23px]  font-extrabold  h-9'>Dashboard Overview</p>
                <p className='text-[14px]  text-[#3E484D]'>Welcome back,<span >{name}</span>.Here's what happening in your Store </p>
            </span>
            
           </div>
            {/* 2 */}
            <section className=' w-full h-[83.6vh]  min-h-fit    bg-blue-50  flex flex-col   justify-start  md:pl-8 pl-1 md:pr-8'>

                <div className=' w-full flex  gap-5 md:gap-10 flex-wrap max-sm:justify-center  md:mt-6 mt-5 min-h-fit '>
                    <div className='flex  items-center justify-between shadow-md  md:h-35 w-76  p-6 gap-4 bg-[#F2F4F6] rounded-md   border border-gray-300 shrink-0 '>
                        <span className='flex flex-col gap-1'>
                            <p className='text-[14px] font-medium text-[#3E484D]'>Total Orders</p>
                            <p className='md:text-[36px] text-[20px]  font-extrabold'>{totalOrder}</p>
                        </span>
                        <div className='bg-[#26819D] rounded-md h-11 w-11 flex items-center '>
                            <div className='bg-white/60 p-1 rounded-md h-full w-full flex justify-center items-center'>
                                <IoBag className='text-2xl text-[#26819D]' />
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-between shadow-md md:h-35 w-76  p-6 gap-7 bg-[#F2F4F6] rounded-md border border-gray-300 shrink-0'>
                        <span className='flex flex-col gap-1'>
                            <p className='text-[14px] font-medium text-[#3E484D]'>Today's Orders</p>
                            <p className='md:text-[36px] text-[20px]  font-extrabold'>{todayorder}</p>
                        </span>
                        <div className='bg-gray-400 rounded-md h-11 w-11 '>
                            <div className='bg-white/60 p-2 rounded-md h-full w-full flex justify-center items-center'>
                                <SlCalender className='text-2xl text-gray-400' />
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-between shadow-md max-sm:w-[90vw]  md:h-35 md:w-76     p-6 gap-7 bg-[#26819D]  min-w-fit   shadow-[#26819D] text-white  rounded-md shrink-0'>
                        <span className='flex flex-col gap-1'>
                            <p className='text-[14px]  text-white font-medium'><span className='font-extrabold'>{currentMonth}</span>  Month Earning</p>
                            <p className='md:text-[36px] text-[20px] font-extrabold'>₹{todayEarning.toFixed(2)}</p>
                        </span>
                        <div className='bg-[#26819D] rounded-md h-11 w-11'>
                            <div className='bg-white/60 p-2 rounded-md h-full w-full flex justify-center items-center' >
                                <CiBank className='text-2xl text-[#26819D]' />
                            </div>
                        </div>

                    </div>
                </div>


                <div className=' h-140  min-h-fit  md:w-[90%] w-screen  flex flex-col rounded-lg  sm:p-8 sm:pt-10 sm:pr-8 sm:pb-8 mt-10 bg-white shadow-md mb-5 overflow-auto min-w-fit'>
                    <div className='flex justify-between '>
                        <span>
                            <p className='text-[14px] md:text-[20px] font-bold'>Latest Orders</p>
                            <p className='opacity-65 text-[11px] md:text-[14px] text-[#3E484D  ]'> Recent transactions processed through Bill Saathi </p>
                        </span>
                    
                    </div>

                    <table className=' border-separate border-spacing-y-4 md:border-spacing-x-0 border-spacing-x-2'>
                        <thead className=''>
                            <th className=' text-[10px] md:text-[13px] text-[#a3abaf] font-extrabold  text-start'>Order ID</th>
                            <th className=' text-[10px] md:text-[13px] text-[#a3abaf] font-extrabold text-start'>Customer</th>
                            <th className=' text-[10px] md:text-[13px] text-[#a3abaf] font-extrabold text-start'>Payment</th>
                            <th className=' text-[10px] md:text-[13px] text-[#a3abaf] font-extrabold text-start'>Amount</th>
                            <th className=' text-[10px] md:text-[13px] text-[#a3abaf] font-extrabold text-start'>Date</th>
                        </thead>
                        <tbody >
                            {filterorders.map((order, index) => (
                                <tr key={index} >
                                    <td className=' text-[#00647E] text-[8px] md:text-[10px] font-liberity font-extrabold'>{order.orderId}</td>
                                    <td className=' text-[10px] md:text-[14px] text-[#191C1E] font-bold flex items-center' ><div className='bg-blue-200 rounded-lg mr-2 w-fit'> <div className='bg-white/40  px-2 py-1  rounded-lg  text-blue-600 '>{order.customerName.charAt(0).toUpperCase()}</div></div>{order.customerName}</td>
                                    <td className=' text-[10px] md:text-[12px] text-start font-bold text-[#3E484D]'>{order.paymentMethod}</td>
                                    <td className=' text-[10px] md:text-[13px] font-bold'>₹{order.grandTotal.toFixed(2)}</td>
                                    <td className=' text-[10px] md:text-[13px] font-medium '>{new Date(order.createdAt).toLocaleString('en-IN', {
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
                    </table>


                </div>
                <div className='h-8 md:w-[90%] w-screen  flex justify-center gap-4 pb-32 min-h-fit'>
                <div className='h-full w-15 rounded-md  flex items-center justify-center bg-blue-500 text-white shadow-md cursor-pointer' onClick={movePrev}>
                  <span ><FaAngleDoubleLeft /></span>  <p>Prev</p>
                </div>
                    {Array.from({length:Math.ceil(totalOrder/dataperblock)}).slice(windowStart,windowStart+windowsize).map((_,i)=>{
                        if(index<=(endPage-1)){
                            const pageNumber = windowStart + i; // ✅ actual page index
                            return (
                                <div className='h-full w-9 rounded-md  flex items-center justify-center bg-blue-500 text-white shadow-md cursor-pointer' onClick={()=>setcurrentPage(pageNumber)}>
                            <p>{pageNumber+1}</p>
                        </div>
                            )
                           
                        }
                        return null;
                    })}
                    <div className='h-full w-15 rounded-md  flex items-center justify-center bg-blue-500 text-white shadow-md cursor-pointer' onClick={moveNext}>
                   <p>Next</p><span><FaAngleDoubleRight  /></span> 
                </div>
                </div>
                {/* <div className='md:mb-0 mb-50'>
                </div> */}
            </section>

         
        </>
    )
}

export default Dashboard