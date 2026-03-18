import React from 'react'
import ItemForm from './ItemForm'
import ItemList from './ItemList'

const Manage_items = () => {
  return (
      <main className='h-[92vh] w-full flex min-h-fit   items-center bg-slate-900'>
      <section className='h-[90%] md:w-[90%] w-full  flex md:flex-row flex-col min-h-fit  items-center  justify-evenly md:pt-0 pt-10'>
        {/* left */}
        <div className='h-[95%] border  md:w-[60%] w-[80%] ml-10  bg-white    rounded-lg flex flex-col p-6'>
        <ItemForm/>
        </div>
        {/* right */}
        <div className='h-[92%] md:w-[25%] w-[80%] min-h-fit md:mt-0 mt-10 border border-gray-400 rounded-lg '>
          <ItemList/>
        </div>
      </section>
    </main>
  )
}

export default Manage_items