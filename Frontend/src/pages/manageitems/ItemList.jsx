import React, { useContext, useEffect, useState } from 'react'
import { deleteItem, getAll } from '../../service/ItemService'
import Search from "../../assets/Search.png"
import toast from 'react-hot-toast'
import  Delete from "../../assets/Delete.png"
import { AppContext } from '../../Context/AppContext'

const ItemList = () => {
  const {items,setitems }=useContext(AppContext)
  const [searchterm, setsearchterm] = useState("")


  useEffect(()=>{
    async function fetch() {
      try{
        const item=await getAll();
        setitems(item.data)
      }
      catch(error){
        toast.error("Something went wrong")
      }
    }

    fetch()
  },[])


  async function Deleteitem(id){
    try{
      await deleteItem(id)
      toast.success("Item Deleted Successfully")
      setitems(items.filter(item=>item.itemId !==id))
    }
    catch(error){
      toast.error("Something went wrong bhai")
    }
  }

  const filteritems=items.filter(item=>item.name.toLowerCase().includes(searchterm.toLowerCase()))


  return (
     <div className='h-full  w-full mt-6 flex flex-col   items-center  overflow-auto scroll' >
          <div className='flex justify-center w-full pb-4 border-b border-gray-400'>
            <input type="text" placeholder='Search By Keyword' className='w-[70%]  bg-white p-1 ' onChange={(e)=>setsearchterm(e.target.value)} value={searchterm} />
            <img src={Search} alt="" className='h-8 cursor-pointer bg-yellow-300' />
          </div>
          <div className='w-full h-full   flex flex-col items-center mt-5   gap-5' id='scroll'>
            {filteritems.map((item)=>(
              <div key={item.itemId}  className='w-[90%] h-15 rounded-lg bg-slate-800 p-3 flex justify-between min-h-fit hover:scale-105 cursor-default' >
                <div className='flex gap-2'>
                  <img src={item.imageUrl} alt="" className='h-9 w-9  rounded-lg '/>
                <div className='flex flex-col  w-full '>
                <p className=' text-[14px] font-bold text-white'>{item.name}</p>
                <p className=' text-[13px] text-white p-1 bg-yellow-500 mt-4 w-fit rounded-md h-fit '>Price: <span className='font-bold'>{item.price}</span></p>
                </div>
                </div>
                <div className='h-full flex items-center justify-center'>
                  <img src={Delete} title='Delete Item' alt="" className='h-7 rounded-full cursor-pointer' onClick={()=>Deleteitem(item.itemId)} />
                </div>
                </div>
            ))}
          </div>
        </div>
  )
}

export default ItemList