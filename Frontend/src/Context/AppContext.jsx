import { createContext, useEffect, useState } from "react";
import { fetchCategory } from "../service/CategoryService";

export const AppContext=createContext(null)

export const AppContextProvider=(props)=>{

    const [categories, setcategories] = useState([])
    const [items, setitems] = useState([])
    const [cartItems, setcartItems] = useState([])
    const [customername, setcustomername] = useState("")
    const [customernumber, setcustomernumber] = useState("")
    const [paymentMethod, setpaymentMethod] = useState("UPI")
    const [paymentDone,setpaymentDone] = useState(false)
    const [OrderResponse,setOrderResponse] = useState([])
    const [stripeOrder,setstripeOrder] = useState("")
    const [stripePayment,setstripePayment] = useState("")
    const [showReceipt,setshowReceipt]=useState(false)

    let amount=0;

    const totalAmount=cartItems.map(cart=>amount+=cart.price*cart.quantity)

    const orderdata={
        "customerName":customername,
        "phoneNumber":customernumber,
        "cartItems":cartItems,
        "grandTotal" :amount,
        "paymentMethod":paymentMethod,
        "stripeOrder":stripeOrder,
        "stripePayment":stripePayment
    }


    const addtoCart=(item)=>{
        const exisitingItem=cartItems.find(cartitem=>cartitem.name===item.name);
        if(exisitingItem){
            setcartItems(cartItems.map(cart=>cart.name===item.name?{...cart,quantity:cart.quantity+1}:cart));
        }
        else{
            setcartItems([...cartItems,{...item,quantity:1}]);
        }
    }

    const deleteCartItem=(id)=>{
        const c=cartItems.map(cart=>cart.itemId==id)
        amount-=c.price
        setcartItems(cartItems.filter(cart=>cart.itemId!=id))
    }

    const UpdateQuantity=(id,newQuantity)=>{
        const item=cartItems.map(cart=>cart.itemId==id)
        if(newQuantity<1){
            return
        }
        setcartItems(cartItems.map(cart=>cart.itemId==id ?{...cart,quantity:newQuantity}:cart ))
    }



    useEffect(()=>{

        async function LoadData(){
           try{
             const response=await fetchCategory();
            setcategories(response.data)
           }
           catch(e){
            console.log(e)
           }
        }


        LoadData()
    },[])


    const contextvalue={
        categories,
        setcategories,
        items,
        setitems,
        addtoCart,
        cartItems,
        deleteCartItem,
        UpdateQuantity,
        setcustomername,
        setcustomernumber,
        orderdata,
        setpaymentMethod,
        amount,
        setcartItems,
        customername,
        customernumber,
        setpaymentDone,
        paymentDone,
        OrderResponse,
        setOrderResponse,
        setstripeOrder,
        setstripePayment,
        stripeOrder,
        stripePayment,
        setshowReceipt,
        showReceipt
    }



    return <AppContext.Provider value={contextvalue}>
        {props.children}
    </AppContext.Provider>
}