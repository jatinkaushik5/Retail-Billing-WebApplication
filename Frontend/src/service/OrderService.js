import api from "../pages/axiosConfig"

export const createOrder= async(data,Id="Invalid")=>{
    
    return await api.post(`http://localhost:8080/order/Create/${Id}`,data)
}

export const fetchDetails=async()=>{
    return  api.get("http://localhost:8080/order/showDashboard")
} 