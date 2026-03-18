import React, { useContext } from 'react'
import {AppContext} from "../../Context/AppContext"
import DisplayCategory from '../display/DisplayCategory'
import Displayitem from '../display/Displayitem'
import Customerform from '../display/Customerform'
import DisplayCart from '../display/DisplayCart'
import DisplaySummary from '../display/DisplaySummary'

export const Explore = () => {
  const {categories}=useContext(AppContext)



  return (
    <>
     <main className='h-[92vh] w-full flex    justify-center items-center bg-slate-900'>
      <section className='h-[90%] w-[90%]  flex items-center  justify-evenly'>
        {/* left */}
        <div className='h-[90%] w-[70%] ml-1 rounded-lg flex flex-col '>
          <div className='h-[38%]  text-white border border-gray-700'><DisplayCategory/></div>
          <div className='h-[62%] text-white border-b border-blue-300' ><Displayitem/></div>
        </div>
        {/* right */}
        <div className='h-[90%] w-[25%] border border-white rounded-lg'>
          <div className='text-white h-[20%] border'><Customerform/></div>
          <div className='text-white h-[50%] border'><DisplayCart/></div>
          <div className='text-white h-[30%] border'><DisplaySummary/></div>
        </div>
      </section>
    </main>
    </>
  )
}

export default Explore;
