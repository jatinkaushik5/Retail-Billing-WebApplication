import axios from "axios"
import api from "../pages/axiosConfig";

const token=localStorage.getItem("token")

export const addCategory= async (Category)=>{
    return await api.post("http://localhost:8080/admin/save",Category);
}

export const deleteCategory=async (id)=>{
    return await api.delete(`http://localhost:8080/admin/delete/${id}`);
}

export const fetchCategory=async ()=>{
    return await api.get("http://localhost:8080/category/getall");
}

export const loginUser=async (user)=>{
    return await api.post("http://localhost:8080/user/login",user);
}

export const addItem=async (item)=>{
    return await api.post("http://localhost:8080/item/save",item)
}