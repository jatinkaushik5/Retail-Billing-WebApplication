import axios from "axios"
import api from "../axiosConfig"

export const login=async (data)=>{
    return  await api.post("http://localhost:8080/user/login",data)
}