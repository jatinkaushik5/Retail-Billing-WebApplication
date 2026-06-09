import React, { useEffect, useState } from 'react'
import { CiBarcode } from "react-icons/ci";
import { deleteAllCart, deletecart, getallitem, getcart, getitem, getitems, itemByName, placeorder, savecart } from '../Inventory/InventoryService';
import { FaUser } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { FaReceipt } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";
import { FaMinusCircle } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";
import BarcodeScanner from 'react-qr-barcode-scanner';
import { data, useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { IoAddOutline } from "react-icons/io5";
import { FiMinus } from "react-icons/fi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FaAddressCard } from "react-icons/fa";

const stripePromise = loadStripe("pk_test_51T9RFAFXEowWx1FFQ4qS7SMVOQ2ppCjZc6kPubrjQY1zH5xk3dvkJEn0SVN6aSskMK6FQcGzWKaslncBcOlzzNOJ00hpN2YbtP");
const Billing = () => {
    const [cartId, setcartId] = useState(null)
    const navigate=useNavigate()
    const [loading, setloading] = useState(false)

    const[show,setshow]=useState(false)
    const [items, setitems] = useState([])
    const [filterdata, setfilterdata] = useState([])
    const [searchterm, setsearchterm] = useState("")
    const [paymentMethod, setpaymentMethod] = useState("UPI")
    const[cartitems,setcartitems]=useState([])
    const[totaltax,settotaltax]=useState(0)
    const[mydata,setmydata]=useState("")

    const[name,setname]=useState("")
    const[phoneNumber,setphoneNumber]=useState("")

    const location=useLocation()
    useEffect(() => {
  const params = new URLSearchParams(location.search);
  const id = params.get("cartId");

  if (id) {
    setcartId(id);
  }
}, [location.search]);


    useEffect(()=>{
        async function fetch(){
             const response1 = await getallitem();
                setitems(response1.data)
        }

        fetch();
},[])



let Subtotal=(cartitems || []).reduce((total,item)=>{
    return total+item.price*item.quantity;
}
,0)

useEffect(() => {
  const tax = cartitems.reduce((total, item) => {
    return total + ((item.tax / 100) * item.price * item.quantity);
  }, 0);

  settotaltax(tax);
}, [cartitems]);

let totalDiscount=(cartitems || []).reduce((total,item)=>{
    return total+((item.discount/100)*item.price)
},0)

function addtoCart(item){

    setcartitems(prev=>{
        const found=prev.find(i=>i.name===item.name);
        if(found){
            return prev.map(p=>p.name===item.name?{...p,quantity:p.quantity+1}:p);
        }
        else{
            return [...prev,{...item,quantity:1}]
        }
    })
}


function removeFromItem(item){
    let newitem=cartitems.filter(i=>i.name!=item.name)
    setcartitems(newitem)
}

function decreaseQuantity(item) {
  setcartitems(prev =>
    prev
      .map(i =>
        i.name === item.name
          ? { ...i, quantity: i.quantity - 1 }
          : i
      )
      .filter(i => i.quantity > 0)
  );
}

// useEffect(()=>{
//   let id=cartId;
//   if(cartId){
//     console.log("Your id is :",id)
//     toast.success("UPI Payment Successfull")
//   }
// },[])

useEffect(()=>{
    
   async function fetch(){
  const response=await getcart(cartId)
     if(response){
    console.log(response.data)
     setname(response.data.customerName)
     setphoneNumber(response.data.phoneNumber)
     setcartitems(response.data.items)
     }

    }
    
    fetch()
},[cartId])

let res;
async function saveCart(){

   const payload = {
    customerName: name,
    phoneNumber,
    subtotal: Subtotal,
    totaltax: totaltax,
    totaldiscount: totalDiscount,
    amount: Subtotal + totaltax - totalDiscount,
    items: cartitems
};
  localStorage.setItem("customer",name)
   const response= await savecart(payload);
   const newid=response.data
   setcartId(newid)
      async function goToPayment(amount,newid) {
     
  try {
    res = await api.post(
    `http://localhost:8080/order/create-checkout-session?amount=${amount}&cartId=${newid}`)
    
    const stripe = await stripePromise;
    console.log("response: ",res.data)
   

    localStorage.setItem("sessionId",res.data.stripeSessionId)
    
     window.location.href = res.data.url;
  }
  catch (error) {
    console.error(error);
    localStorage.removeItem("customer")
  }


  
}

await goToPayment(Subtotal+totaltax-totalDiscount,newid)
}

function selectCash(){
    setpaymentMethod("CASH")
    toast.success("Cash Collected")
}

async function placeOrder(){
  setloading(true)
  if(name.length<1){
    toast.error("Enter Customer name")
    return 
  }
  if(phoneNumber.length<1){
    toast.error("Enter Customer phone number")
    return
  }
  if(cartitems.length===0){
    toast.error("Cart is Empty")
    return
  }


    // localStorage.removeItem("customer")
    const payload = {
  customerName: name,
  phoneNumber,
  cartItems: cartitems,
  grandTotal: Subtotal + totaltax - totalDiscount,
  paymentMethod,
  stripeOrder: null,
  stripePayment: null,
  subtotal:Subtotal,
  totaldiscount:totalDiscount,
  totaltax:totaltax 

};

   try{
   const response=  await placeorder(payload,localStorage.getItem("sessionId"))
   console.log("order response",response.data)
   localStorage.setItem("orderresponse",JSON.stringify(response.data))

    toast.success("Order Complete")
    setname("")
    setphoneNumber("")
    setcartitems([])
   }
   catch(e){
    console.log(e)
   }
   finally{
    setloading(false)
    await deleteAllCart();
    navigate("/invoice")
   }
}


  useEffect(() => {
  let filtered=null;
  if(searchterm.length>=1){
    filtered = items.filter(item =>
    item.name.toLowerCase().includes(searchterm.toLowerCase())
  );
  }
  else{
    filtered=[];
  }
  setfilterdata(filtered);
}, [searchterm, items]);
  return (
    <>  
    <main className='h-screen w-full  flex md:flex-row flex-col min-h-fit '>
        <section className='h-full md:w-[70%]  w-full  flex flex-col items-center  p-2 sm:p-7 min-h-fit   '>
            <div className='flex flex-col  h-40 max-sm:w-full min-h-fit  w-[80%] rounded-lg bg-[#6fb9d0]  '>
                <div className='flex flex-col h-full w-full bg-white/70 p-6 '>
                <span className='flex items-center gap-2'>
                    <FaUser className='text-[#26819D] text-[16px] ' />
                <h1 className='text-[#26819D] text-[16px] '>Customer Informations</h1>
                </span>
                <div className='flex md:flex-row flex-wrap flex-col min-h-fit   justify-center md:gap-7 gap-2 items-center  h-full sm:p-6'>
                    <span className=' flex  flex-col gap-2'>
                        <label htmlFor="" className='text-[13px] font-semibold'>Customer Name</label>
                        <input type="text" placeholder='Start typing name....' className='text-center focus:outline-none  p-1 text-[14px]   h-9 w-60 rounded-md bg-[#a2b8be] text-white' onChange={(e)=>setname(e.target.value)}  value={name} />
                    </span>
                    <span className='flex flex-col  gap-2' >
                        <label htmlFor="" className='text-[13px] font-semibold'>Phone Number</label>
                        <input type="tel" placeholder='+1(555) 000 0000' className='text-center focus:outline-none text-[14px] p-1   w-60 h-9 rounded-md bg-[#a2b8be] text-white'  onChange={(e)=>setphoneNumber(e.target.value)} value={phoneNumber} maxLength={10}/>
                    </span>
                </div>
                </div>

            </div>

            {/* input section */}
           <div className='h-13 w-[80%] max-sm:w-full  mt-10 rounded-2xl bg-gray-200 flex items-center  p-2 gap-4'>
            <CiBarcode size={40} className='text-[#26819D] cursor-pointer' onClick={()=>setshow(!show)}/>
            <input type="text" placeholder='Search item by name or scan barcode ' className='focus:outline-none w-full h-[80%] max-sm:text-sm' onChange={(e)=>setsearchterm(e.target.value)} />
           </div>
          {/* suggestion */}
{filterdata.length >= 1 && (
  <div className='w-full sm:w-[85%] max-h-60 flex flex-col gap-2 overflow-auto bg-white rounded-lg shadow-md border border-gray-100 z-10'>
    {filterdata.map((item) => (
      <div
        key={item.itemId}
        className='flex flex-col sm:flex-row sm:items-center justify-between p-3 shrink-0 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition gap-2'
      >
        {/* Left: image + name */}
        <div className='flex items-center gap-3 flex-1 min-w-0'>
          <img
            src={item.imageUrl}
            alt=""
            className='h-10 w-10 rounded-lg object-cover shrink-0'
          />
          <span className='min-w-0'>
            <p className='text-sm font-semibold truncate'>{item.name}</p>
            <p className='text-xs text-[#56615F] truncate'>{item.category}</p>
          </span>
        </div>

        {/* Middle: tax + discount */}
        <div className='flex items-center gap-4 sm:gap-6 justify-start sm:justify-evenly flex-shrink-0 pl-13 sm:pl-0'>
          <span className='text-center'>
            <p className='text-xs font-semibold text-gray-500'>Tax</p>
            <p className='text-sm font-bold'>{item.tax}%</p>
          </span>
          <span className='text-center'>
            <p className='text-xs font-semibold text-gray-500'>Discount</p>
            <p className='text-sm font-bold'>{item.discount}%</p>
          </span>
        </div>

        {/* Right: price + button */}
        <div className='flex items-center justify-between sm:justify-end gap-3 pl-13 sm:pl-0 flex-shrink-0'>
          <p className='text-sm font-semibold text-[#00647E]'>₹{item.price}</p>
          <button
            className='px-4 py-1.5 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white text-xs sm:text-sm rounded-md cursor-pointer transition whitespace-nowrap'
            onClick={() => addtoCart(item)}
          >
            Add
          </button>
        </div>
      </div>
    ))}
  </div>
)}

           {/* cart section */}
           <div className='h-70 w-[82%] max-sm:w-full rounded-lg  mt-10 bg-white '>
            <div className=' h-full w-full bg-white/75 sm:p-6 p-1 rounded-lg'>
            <span className='flex items-center justify-between gap-2 text-[16px]  font-medium'>
               <div className='flex items-center gap-2'>
                 <IoCartSharp size={30} />
                <p className='font-extrabold'>Current Basket  </p>
               </div>
               <div className='bg-[#26819D] rounded-md   '>
                 <span className='text-[15px] bg-white/80 p-1 text-[#26819D] rounded-md  flex items-center gap-1'>{cartitems.length}<p className=''>items</p></span>
               </div>
            </span>
            <div className='flex justify-center items-center h-full'>
                 <div className='h-[80%] w-[95%] max-sm:w-full overflow-auto  ' id='cart'>
            {cartitems.map((item)=>(
                <div className='h-[40%] rounded-lg  flex  items-center justify-between sm:p-2 bg-white mt-4'>
                  <div className='flex gap-3  w-[40%]  items-center '>
                      <img src={item.imageUrl} alt="" className='h-12 w-12 rounded-lg'/>
                    <span>
                        <p className='text-[13px] font-bold'>{item.name}{}</p>
                        <p className='text-[11px] font-inter text-[#56615F]'>{item.category}</p>
                        <p className='text-[13px] font-inter font-extrabold text-[#26819D]'> ₹{item.price*item.quantity}</p>

                    </span>
                  </div>
                  <div className='flex w-[20%]  max-sm:w-[30%] items-center h-[60%] bg-gray-4 rounded-md bg-[#d5dddf]  00 p-1'>
                   <span className='p-0.5  flex items-center h-[110%] w-7 '>
                     <IoAddOutline className='flex-1 text-white rounded-md h-6 w-6 max-sm:h-5 max-sm:w-5  bg-green-800' onClick={()=>addtoCart(item)}/>
                   </span>
                    <p className='flex-1  text-center font-bold text-white h-full flex items-center justify-center'>{item.quantity}</p>
                   <span className='bg-white  p-0.5 flex items-center rounded-md h-6 w-6'> <FiMinus    className='flex-1 rounded-md  h-6 w-6 max-sm:h-5 max-sm:w-5 text-black  '  onClick={()=>decreaseQuantity(item)} /></span>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <p className='text-red-500 text-[12px] text-center font-bold cursor-pointer' onClick={()=>removeFromItem(item)}>Remove</p>
                  </div>
                </div>
            ))}
           </div>
            </div>
            </div>
           </div>
            
        </section>
        <section className='h-full md:w-[30%] w-full  flex flex-col bg-[#cadfe665] '>
          {show? <BarcodeScanner className=''
            onUpdate={(err,result)=>{
                if(result){
                    const code=result.text
                    console.log(code)
                    setmydata(code)
                    async function getitem(){
                        addtoCart(response.data)
                    }
                    getitem();
                }
            }}
            />:<></>}
        <div className='h-[80%] p-2 '>
                <span className='flex items-center text-[16px] font-semibold gap-2   rounded-lg p-4  '>
                <FaReceipt />
                <h1 >Order Summary</h1>
            </span>
            <span className='  pt-8 flex flex-col gap-2'>
                <span className='flex justify-between  pl-4 pr-4'><p className='text-[14px] text-gray-900 font-medium'>Subtotal {mydata}</p> <p className='font-medium text-[14px]'>{Subtotal.toFixed(2)}</p></span>
                <span className='flex justify-between pl-4 pr-4'><p className='text-[14px] text-gray-900 font-medium'>Estimated Tax(amount)</p><p className='font-medium text-[14px]'>{totaltax.toFixed(2)}</p></span>
                <span className='flex justify-between pl-4 pr-4'><p className='text-[14px] text-gray-900 font-medium'>Discount(amount)</p><p className='font-medium text-blue-900 text-[14px]'>{totalDiscount.toFixed(2)}</p></span>
            </span>
            <div className='w-full border-[1px] border-gray-400 mt-2'></div>

            <span className='flex flex-col   mt-2'>
               
                <span className='pl-7'>
                    <p className='text-[20px] font-medium text-end p-2'>{(Subtotal+totaltax-totalDiscount).toFixed(2)}</p>
                    <p className='text-end text-[13px]'>(Tax included)</p>
                </span>
                 <span className='flex items-center '>
                    <p className='text-[18px] font-extrabold text-gray-700 '>Total Amount</p>
                </span>
            </span>

            <div className='h-[20%]  flex flex-col   mt-4 pl-10'>
                <h1 className='font-bold text-[14px]'>Payment Method</h1>

                <div className='   w-[80%]   flex     gap-2  transition'>
                    <button className={` h-15 w-[60%] flex flex-col items-center text-[12px] font-bold justify-center rounded-lg    ${paymentMethod==="CASH"?"bg-[#26819D] text-white":"text-black bg-white"}`} onClick={selectCash}><BiMoneyWithdraw/>CASH</button>
                    <button className={` h-15 w-[60%] flex flex-col items-center text-[12px] font-bold justify-center rounded-lg ${paymentMethod==="UPI"?"bg-[#26819D] text-white":"text-black bg-white"}`}  onClick={saveCart}><FaAddressCard/>UPI</button>
                </div>
            </div>
        </div>
        <div className='flex   justify-center  p-2  w-full bg-[#cadfe63b]   mt-20'>
                    <button className=' p-4 text-[13px] w-[80%] justify-center mb-2 rounded-2xl bg-[#26819D] text-white flex items-center gap-2' onClick={placeOrder}>{loading?"Processing....":"Complete Order"} <FaArrowRight/></button>
                </div>
        </section>

    </main>

    <div className='max-sm:mt-10 max-sm:h-20 h-0 '>

    </div>
    </>
  )
}

export default Billing