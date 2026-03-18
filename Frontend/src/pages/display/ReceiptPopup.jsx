import React, { useContext } from 'react'
import { AppContext } from '../../Context/AppContext'
import { createOrder } from '../../service/OrderService'
import toast from 'react-hot-toast'

const ReceiptPopup = () => {

  const {orderdata}=useContext(AppContext)
  const {setcartItems}=useContext(AppContext)
  const {setcustomernumber}=useContext(AppContext)
  const {setcustomername,setpaymentDone,OrderResponse,setOrderResponse, setstripeOrder,stripeOrder,
        setstripePayment,stripePayment}=useContext(AppContext)
  

  async function show(){

    if(orderdata.customerName.length==0){
      toast.error("Enter Customer name")
      return;
    }
    if(orderdata.phoneNumber.length==0){
      toast.error("Enter Phone Number")
      return;
    }
    if(orderdata.cartItems.length==0){
      toast.error("Cart is empty")
      return; 
    }

    if(!(orderdata.paymentMethod==="CASH" || localStorage.getItem("paymentMethod") =="UPI")){
      toast.error("Select one Payment Method")
      return ;
    }
    
    try{
    const response=await createOrder(orderdata,JSON.parse(localStorage.getItem("response"))?.stripeSessionId);
    setOrderResponse(response.data)
    setstripeOrder(response.data?.stripeSessionId)
    setstripePayment(response.data?.stripePaymentId)
    setcartItems([])
    setcustomername("")
    setcustomernumber("")
    setpaymentDone(true)
    localStorage.setItem("orderResponse",JSON.stringify(response))
    localStorage.setItem("showReceipt",true)
    }
    catch(e){
      console.log(e)
    }
    finally{
      localStorage.removeItem("order")
      localStorage.removeItem("response")
      localStorage.setItem("payment",true)
      toast.success("Order Done")
    }
  }
  return (
    <div className='flex items-center mt-3  justify-center w-full'>
      <button className='w-[90%] border p-1 rounded-md bg-yellow-600 cursor-pointer active:scale-95 font-poppins' onClick={show}>Place Order</button>
    </div>
  )
}

export default ReceiptPopup