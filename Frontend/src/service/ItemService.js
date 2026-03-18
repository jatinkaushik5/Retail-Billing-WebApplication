import api from "../pages/axiosConfig"

export const  getAll=async()=>{
    return await api.get("http://localhost:8080/item/getallItems")
}

export const deleteItem=async(id)=>{
    return await api.delete(`http://localhost:8080/item/deleteItem/${id}`)
}