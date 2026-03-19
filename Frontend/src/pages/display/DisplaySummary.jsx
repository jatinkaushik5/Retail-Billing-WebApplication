import React, { useContext, useEffect } from 'react'
import ReceiptPopup from './ReceiptPopup'
import { AppContext } from '../../Context/AppContext'
import axios from 'axios'
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../axiosConfig';
import { compile } from 'tailwindcss';

const stripePromise = loadStripe("pk_test_51T9RFAFXEowWx1FFQ4qS7SMVOQ2ppCjZc6kPubrjQY1zH5xk3dvkJEn0SVN6aSskMK6FQcGzWKaslncBcOlzzNOJ00hpN2YbtP");
const DisplaySummary = () => {

    const {setpaymentMethod,amount}=useContext(AppContext)
    const {orderdata}=useContext(AppContext)
    const {setpaymentDone,setstripeOrder,setshowReceipt}=useContext(AppContext)

    const Amount=amount;
    let res;

    function selection(value){
      toast.success("Cash Recieved")
      localStorage.setItem("order",JSON.stringify(orderdata))
      setpaymentMethod(value)
    }
    const navigate=useNavigate(null)

    async function goToPayment(amount) {
        localStorage.setItem("order",JSON.stringify(orderdata))
        localStorage.setItem("paymentMethod","UPI")
  try {
    res = await api.post(
      `http://localhost:8080/order/create-checkout-session?amount=${amount}`);
    
    const stripe = await stripePromise;

    console.log(res)
    
    
  }
  catch (error) {
    console.error(error);
    
  }
  finally{
    localStorage.setItem("response",JSON.stringify(res.data))
    window.location.href = res.data.url
  }

  } 




  return (
    <>
    <section className='h-full w-full flex flex-col gap-2'> 
        {/* <span className='flex justify-between '>
            <p>items</p>
            <p>Rs.</p>
        </span> */}
        <span className='flex justify-between  mb-2'>
            <p>Total</p>
            <p>Rs.{amount}</p>
        </span>
        <div className='flex justify-center gap-4 w-full'>
            <button className='px-15 rounded-md cursor-pointer py-1 shadow-md bg-green-800 ' onClick={()=>selection("CASH")}>Cash</button>
            <button  onClick={()=>goToPayment(amount)}className='px-15 rounded-md cursor-pointer py-1 shadow-md bg-blue-700'>UPI</button>
        </div>
        <div>
            <ReceiptPopup/>
        </div>
    </section>
    </>
  )
}


export default DisplaySummary