import api from "../../axiosConfig"

export const saveCategory=async (data)=>{
    return await api.post("http://localhost:8080/admin/saveCategory",data)
}

export const getAllCategory=async(number)=>{
    return await api.get(`http://localhost:8080/category/getall/${number}`)
}

export const getCategory=async(id)=>{
    return await api.get(`http://localhost:8080/category/get/${id}`)
}

export const getallitem=async()=>{
    return await api.get("http://localhost:8080/item/getalltogether")
}

export const saveitem=async(data)=>{
    return await api.post("http://localhost:8080/item/save",data)
}

export const getitems=async(number)=>{
    return api.get(`http://localhost:8080/item/getallItems/${number}`)
}

export const deleteitem=async(id)=>{
    return api.delete(`http://localhost:8080/item/deleteItem/${id}`)
}

export const getitem=async(id)=>{
    return api.get(`http://localhost:8080/item/get/${id}`)
}

export const  deleteCategory=async(id)=>{
    return await api.delete(`http://localhost:8080/admin/delete/${id}`)
}

export const itemByName=async(name)=>{
    return await api.get(`http://localhost:8080/item/getbyname/${name}`)
}

export const savecart=async(data)=>{
    return await api.post("http://localhost:8080/item/saveCart",data)
}

export const getcart=async(name)=>{
    return await api.get(`http://localhost:8080/item/getcart/${name}`)
}

export const deletecart=async(name)=>{
    return await api.delete(`http://localhost:8080/item/deletecart/${name}`)
}

export const placeorder=async(data,sessionId)=>{
    return await api.post( `http://localhost:8080/order/Create/${sessionId}`,data)
}

export const getOrderDetails=async(number)=>{
    return api.get(`http://localhost:8080/order/showDashboard/${number}`)
}

export const deleteAllCart=async()=>{
    return api.delete("http://localhost:8080/item/deleteAllCart")
}

export const getAllOrders=async()=>{
    return await api.get("http://localhost:8080/order/getAllOrder")
}

export const getAllCategoryName=async()=>{
    return await api.get("http://localhost:8080/admin/getallCategory")
}