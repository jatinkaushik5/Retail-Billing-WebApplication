import React, { useContext, useRef, useState } from 'react'
import { addItem, fetchCategory } from '../../service/CategoryService';
import { AppContext } from '../../Context/AppContext';
import Img from '../../assets/Img.png'
import toast from 'react-hot-toast';

const ItemForm = () => {
  const {categories}=useContext(AppContext);
  
  const[Image,setImage]=useState(false)
  const [name, setname] = useState("")
  const [Category, setCategory] = useState("")
  const [price, setprice] = useState("")
  const [description, setdescription] = useState("")
  const [loading, setloading] = useState(false)


  const ref=useRef(null);
  const {setitems}=useContext(AppContext);




  function ImageInputactive(){
    ref.current.click()
  }

  async function submitHandler(e){
    e.preventDefault();
    const formdata=new FormData()
    formdata.append("name",name)
    formdata.append("category",Category)
    formdata.append("price",price)
    formdata.append("description",description)
    formdata.append("image",Image)

    if(Image==false){
      toast.error("Upload Item Image")
      return 
    }
    if(name.length==0){
      toast.error("Provide Item name")
    }
    if(Category.length==0){
      toast.error("Select one Category of Item")
    }
    if(price.length==0){
      toast.error("Provide Price of Item")
    }
    if(description.length==0){
      toast.error("Provide ")
    }

    try{
    setloading(true)
    const response=await addItem(formdata)
    toast.success("Item Added Successfully")
    setitems(prev=>[...prev,response.data])
    setImage(false)
    setCategory("")
    setdescription("")
    setname("")
    setprice("")
    }
    catch(error){
      toast.success("Unable to connect to backend!!")
    }
    finally{
      setloading(false)
    }
  }

  return (
    <>
      <img src={Image? URL.createObjectURL(Image):Img} alt="" className='h-10 w-10 cursor-pointer ' onClick={ImageInputactive}/>
     <form action="" onSubmit={(e)=>submitHandler(e)} className='flex flex-col  mt-15 min-h-fit'>
            <input type="file" name='image' ref={ref} id='file' onChange={(e)=>setImage(e.target.files[0])} hidden />
            <label htmlFor="name">Name</label>
            <input type="text" placeholder='Item Name' className='mt-1 border p-1 rounded-sm border-gray-300 ' name='name' id='name' onChange={(e)=>setname(e.target.value)} value={name}/>
            <label htmlFor="category" className='mt-3'>Category</label>
            <select name='category' id="category" className='border p-0.5' onChange={(e)=>setCategory(e.target.value)} >
              <option disabled selected >--Choose Category</option>
                {categories.map((category)=>{
                  return (
                  <option value={category.name}>{category.name}</option>
                  )
                })}
            </select>
            <label htmlFor="price" className='mt-8'>Price</label>
            <input type="number"  className='mt-1 border p-1 rounded-sm border-gray-300 '  placeholder='$200' name='price' id='price' min='1' onChange={(e)=>setprice(e.target.value)} value={price}/>
            <label htmlFor="description" className='mt-3'>Description</label>
            <textarea name="description"  id="description" onChange={(e)=>setdescription(e.target.value)} value={description} className='mt-1 resize-none border  rounded-sm border-gray-300 h-20 '  ></textarea >
            <button type='submit' className='mt-7 border p-1 rounded-sm bg-green-600 text-white shadow-md'>{loading?"Loading...":"Save"}</button>
        </form>
    </>
  )
}

export default ItemForm