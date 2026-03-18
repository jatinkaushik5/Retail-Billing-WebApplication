import React from 'react'
import Category_Form from './Category_Form'
import Category_List from './Category_List'

const Manage_Categories = () => {
  return (
    <main className='h-[92vh] w-full flex min-h-fit   items-center bg-slate-900'>
      <section className='h-[90%] md:w-[90%] w-full    flex md:flex-row flex-col min-h-fit  items-center  justify-evenly md:pt-0 pt-10'>
        {/* left */}
        <div className='h-[95%]   md:w-[60%] w-[80%] ml-10  bg-white   rounded-lg flex flex-col p-6'>
        <Category_Form/>
        </div>
        {/* right */}
        <div className='h-[92%] md:w-[30%] w-[80%] md:mt-0 mt-10 border min-h-fit border-gray-400 rounded-lg '>
          <Category_List/>
        </div>
      </section>
    </main>
  )
}

export default Manage_Categories