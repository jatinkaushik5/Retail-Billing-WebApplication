import api from "../pages/axiosConfig"

export const addUser=async (user)=>{
    return await api.post("http://localhost:8080/admin/register",user)
}

export const fetchUser= async()=>{
    return await api.get("http://localhost:8080/admin/getAllUser")
}

export const deleteUser=async(id)=>{
    return await api.delete(`http://localhost:8080/admin/deleteUser/${id}`)
}