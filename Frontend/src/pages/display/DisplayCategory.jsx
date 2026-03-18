import React, { useEffect, useState } from 'react'
import { fetchCategory } from '../../service/CategoryService'

const DisplayCategory = () => {

    const [categories, setcategories] = useState([])


    useEffect(()=>{
       async function fetchdata(){
        const response=await fetchCategory()
        setcategories(response.data)

     
        }
           fetchdata()
    },[])

  



  return (
    <section className='h-full w-full flex flex-wrap overflow-auto scroll gap-8 p-4 '>
        
        {categories.map((category)=>(
            <div className='flex h-20 w-45 items-center  rounded-md cursor-pointer ' style={{backgroundColor:category.bgColor}}>
                <img src={category.imageUrl} alt=""  className='h-10 w-10 rounded-md ml-2'/>
                <div className='flex flex-col items-center w-full '>
                    <p className='text-[13px] text-center font-bold'>{category.name}</p>
                    <p className='text-[12px] '><span className='pr-1 font-bold'>{category.itemsLength}</span>item</p>
                </div>
            </div>
))}
    </section>
  )
}

export default DisplayCategory