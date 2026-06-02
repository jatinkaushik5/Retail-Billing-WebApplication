import api from "../../axiosConfig"

export const getUsers=async(number)=>{
    return await api.get(`http://localhost:8080/admin/getAllUser/${number}`)
}

export const saveUser=async(data)=>{
    return await api.post("http://localhost:8080/admin/register",data)
}

export const deleteuser=async (id)=>{
    return await api.delete(`http://localhost:8080/admin/deleteUser/${id}`)
}

export const updateuser=async (id)=>{
    return await api.get(`http://localhost:8080/admin/updateUser/${id}`)
}

export const getUser=async(name)=>{
    return await api.get(`http://localhost:8080/admin/getuser/${name}`)

}
