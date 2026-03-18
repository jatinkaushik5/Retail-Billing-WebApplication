import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../Context/AppContext'
import Add from "../../assets/Add.png"
import Delete from "../../assets/Delete.png"
import Dustbin from "../../assets/Dustbin.png"


const DisplayCart = () => {

  const {cartItems,deleteCartItem,UpdateQuantity}=useContext(AppContext)

    const Data=localStorage.getItem("order")
    const {setcartItems}=useContext(AppContext)

    useEffect(()=>{
        if(Data){
    const orderdata=JSON.parse(localStorage.getItem("order"))
    setcartItems(orderdata.cartItems)
  }
    },[])




  return (
    <section className='h-full w-full flex flex-col items-center p-1 mt-2 gap-4'>
      {cartItems.map((item)=>(  
        <div className='flex flex-col  w-full bg-slate-600 '>
          <div className='flex  justify-between w-full '>
            <h1 className='font-poppins text-[15px]  pl-1 h-fit'>{item.name}</h1>
            <p className='font-poppins text-[13px] h-fit pr-2'>₹{item.price}/unit</p>
            </div>
            <div className='flex gap-4 justify-between w-full  '>
              <div className='flex gap-2'>
                <img src={Add} alt="" className='h-7 cursor-pointer' onClick={()=>UpdateQuantity(item.itemId,item.quantity+1)} />
              <p>{item.quantity}</p>
              <img src={Dustbin} alt="" className='h-7 cursor-pointer' onClick={()=>UpdateQuantity(item.itemId,item.quantity-1)} />
              </div>
              <div>
                <img src={Delete} alt="" className='h-6 mr-2 cursor-pointer' onClick={()=>deleteCartItem(item.itemId)}/>
              </div>
            </div>
        </div>
      ))}
    </section>
  )
}

export default DisplayCart