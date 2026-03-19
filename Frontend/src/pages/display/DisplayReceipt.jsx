import React, { useContext } from 'react'
import TICK from "../../assets/TICK.png"
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { useRef } from "react";
import { AppContext } from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';

const DisplayReceipt = () => {

  const {setpaymentDone} =useContext(AppContext)
  const storedOrder = localStorage.getItem("orderResponse");
const orderResponse = storedOrder ? JSON.parse(storedOrder).data : null;
const navigate=useNavigate()

  function backReceipt(){
     setpaymentDone(false)
     localStorage.removeItem('showReceipt')
     localStorage.removeItem("payment")
     localStorage.removeItem("orderResponse")
     localStorage.removeItem("paymentMethod")
     navigate("/explore")
  }





  const downloadPDF = async () => {

  const element = receiptRef.current;

  
const canvas = await html2canvas(element, {
  backgroundColor: "#ffffff",
  scale: 2,
  useCORS: true,
  logging: false,
  onclone: (document) => {
    document.querySelectorAll("*").forEach((el) => {
      const style = window.getComputedStyle(el);
      if (style.color.includes("oklch")) {
        el.style.color = "#000";
      }
      if (style.backgroundColor.includes("oklch")) {
        el.style.backgroundColor = "#fff";
      }
    });
  }
});

  const data = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const imgWidth = 210;
  const pageHeight = 295;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(data, "PNG", 0, 0, imgWidth, imgHeight);

  pdf.save("Receipt.pdf");

};
  const receiptRef = useRef();
  return (
      <div ref={receiptRef} className='flex flex-col items-center bg-white  rounded-md shadow-md  relative'>
      <img src={TICK} alt="" className='h-6' />
      <h1>Order Receipt</h1>
      <div className='flex w-full flex-col mt-7 '>
        <span className='flex justify-between items-center'><p className='font-poppins font-bold text-[14px] mr-35'>OrderId</p><p className='font-poppins text-[14px]'>{orderResponse.Orderid}</p></span>
        <span className='flex justify-between'><p className='font-poppins font-bold text-[14px] mr-35'>Name</p><p className='font-poppins text-[14px]'>{orderResponse.customerName}</p></span>
        <span className='flex justify-between'><p className='font-poppins font-bold text-[14px] mr-35'>Phone</p ><p className='font-poppins text-[14px]'>{orderResponse.phoneNumber}</p></span>
      </div>
      <div className='mt-4 border w-[90%] mb-2 border-gray-400 '></div>
      <div className='flex flex-col overflow-auto scroll h-30 w-full'>
        <h1 className='text-[14px] font-poppins font-bold'>Items Ordered</h1>

        {orderResponse.items.map((item)=>(
          <div className='w-full flex justify-between pl-2 pr-2'> 
          <h1>{item.name}</h1>
          <span className='flex'><p className='font-bold'>₹</p><p>{item.price}</p></span>
          </div>

        ))}
      </div>
      <div className='mt-4 border w-[90%] mb-2 border-gray-400 '></div> 
      <div className='flex flex-col w-full'>
        {/* 1 */}
        <div className='flex justify-between'>
          <p className='font-poppins text-[14px]'>Total</p>
          <p className='font-poppins text-[14px] mr-2'>₹{orderResponse.grandTotal}</p>
        </div>
        {/* 2 */}
        <div className='flex gap-4'>
          <p className='font-poppins text-[14px]'>Payment Method</p>
          <p className='font-poppins text-[14px] font-bold'>{orderResponse.paymentMethod}</p>
        </div>
        {/* 3 */}
        {orderResponse.stripePayment &&(
          <>
                   <span className='flex flex-col pl-2 mt-5'><p className='font-poppins font-bold text-[14px] mr-35'>StripeID</p><p className='font-poppins text-[10px] ww-fit text-wrap'>{orderResponse.stripeOrder}</p></span>
         {/* 4 */}
         <span className='flex flex-col pl-2'><p className='font-poppins font-bold text-[14px] mr-35'>StripePaymentId</p><p className='font-poppins text-[10px] text-wrap  '>{orderResponse.stripePayment}</p></span>
          </>
        )}
      </div>
      <div className='flex justify-end gap-6 mt-7 w-full mr-7 mb-5'>
        <button className='border p-1 bg-yellow-400 text-white rounded-md font-poppins text-[14px] cursor-pointer active:scale-105' onClick={downloadPDF}>Print Receipt</button>
        <p className='border p-1 bg-red-500 text-white rounded-md font-poppins text-[14px]' onClick={backReceipt}>Back</p>
      </div>
    </div>
    )
}

export default DisplayReceipt