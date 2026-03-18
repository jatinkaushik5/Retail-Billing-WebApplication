import React, { useContext, useState } from 'react'
import Search from '../../assets/Search.png'
import { AppContext } from '../../Context/AppContext'
import Delete from '../../assets/Delete.png'
import axios from 'axios'
import { deleteCategory } from '../../service/CategoryService'
import toast from 'react-hot-toast'

const Category_List = () => {
  const { categories, setcategories }=useContext(AppContext)
  const [searchterm, setsearchterm] = useState("")

  const filterCategory=
    categories.filter(category=>category.name.toLowerCase().includes(searchterm.toLowerCase()))

  async function DeleteCategory(id){
    try{
      const response=await deleteCategory(id);
      setcategories(prev =>
      prev.filter(category => category.categoryid !== id)
)
      toast.success("Category delete Successfully")
    }
    catch(e){

    }
  }



  return (
    <>
    <div className='h-full  w-full mt-6 flex flex-col items-center overflow-auto scroll' >
      <div className='flex justify-center w-full border-b pb-4 border-gray-400'>
        <input type="text" placeholder='Search By Keyword' className='w-[70%] bg-white p-1' onChange={(e)=>setsearchterm(e.target.value)} value={searchterm} />
        <img src={Search} alt="" className='h-8 cursor-pointer bg-yellow-300' />
      </div>
      <div className='w-full h-full  mt-5  flex flex-col items-center   gap-5  '>
        {filterCategory.map((category)=>(
          <div className='w-[90%] h-19 rounded-lg bg-white p-3 flex  items-center ' style={{backgroundColor:category.bgColor}}>
            <img src={category.imageUrl} alt="" className='h-11 w-11 rounded-md '/>
            <div className='flex flex-col  w-full ml-2 '>
              <p className=' text-[14px] font-bold text-white'>{category.name}</p>
            <p className=' text-[13px] text-white'>{category.itemsLength} items</p>
            </div>
            <img src={Delete} alt="" title='Delete Category' className='h-7 cursor-pointer' onClick={()=>DeleteCategory(category.categoryid)} />
            </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default Category_List