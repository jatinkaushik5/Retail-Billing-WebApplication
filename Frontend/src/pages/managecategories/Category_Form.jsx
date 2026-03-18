import React, { useContext, useRef, useState } from 'react'
import Img from '../../assets/Img.png'
import { addCategory } from '../../service/CategoryService'
import toast from 'react-hot-toast'
import { AppContext } from '../../Context/AppContext'



const Category_Form = () => {


const {setcategories}=useContext(AppContext)
const [loading, setloading] = useState(false)
const[Image,setImage]=useState(false)
const [name, setname] = useState("")
const [description, setdescription] = useState("")
const [bgColor, setbgColor] = useState("")

const fileRef=useRef(null)

  async function submitHandler(e){
    e.preventDefault();

    if(Image==false){
      toast.error("Upload Category Image")
      return
    }

    if(name.length==0){
      toast.error("Provide Category Name")
      return
      }

      if(description.length==0){
        toast.error("Provide description about new category")
        return
      }





    setloading(true)
    const formdata=new FormData();
    formdata.append('name',name)
    formdata.append('description',description)
    formdata.append('bgColor',bgColor)
    formdata.append('image',Image)


    try{
    const response=await addCategory(formdata);
     setloading(false)
     setcategories((prev)=>[...prev,response.data])
     toast.success("Category Saved ",formdata.get('name'))
     setname("")
     setdescription("")
     setbgColor("")
     setImage(false)

    }
    catch(error){
      toast.error("Category cannot be added ,Something went wrong!!")
    }
  }

  function ImageInputactive(){
    fileRef.current.click();
  }



  return (
    <>
    <img src={Image? URL.createObjectURL(Image):Img} alt="" className='h-15 w-15 cursor-pointer ' onClick={ImageInputactive}/>
        <form action="" onSubmit={(e)=>submitHandler(e)} className='flex flex-col  mt-15'>
            <input type="file" name='image' ref={fileRef} id='file' onChange={(e)=>setImage(e.target.files[0])} hidden/>
            <label htmlFor="name">Name</label>
            <input type="text" name='name' id='name' onChange={(e)=>setname(e.target.value)} value={name} placeholder='Category Name' className='mt-1 border p-1 rounded-sm border-gray-300 ' required min={2} max={15}  />
            <label htmlFor="description" className='mt-3'>Description</label>
            <textarea name="description" id="description" onChange={(e)=>setdescription(e.target.value)} value={description} className='mt-1 border  rounded-sm border-gray-300 '  required></textarea >
            <label htmlFor="bgColor" className='mt-8'>Background color</label>
            <input type="color" placeholder='#ffffff' onChange={(e)=>setbgColor(e.target.value)} value={bgColor} name='bgColor' id='bgColor' className='mt-3' />
            <button type='submit' className='mt-7 border p-1 rounded-sm bg-blue-600 text-white shadow-md'>{loading?'Loading...':'Save'}</button>
        </form>
    </>
  )
}

export default Category_Form