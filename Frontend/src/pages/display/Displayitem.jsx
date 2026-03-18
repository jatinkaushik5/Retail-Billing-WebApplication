import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../Context/AppContext'
import Search from "../../assets/Search.png"
import toast from 'react-hot-toast'
import { getAll } from '../../service/ItemService'
import CART from "../../assets/CART.png"
import Add from "../../assets/Add.png"

const Displayitem = () => {

    const { cartItems, addtoCart } = useContext(AppContext)

    const [items, setitems] = useState([])
    const [searchterm, setsearchterm] = useState("")


    useEffect(() => {
        async function fetch() {
            try {
                const item = await getAll();
                setitems(item.data)
                console.log(items)
                
            }
            catch (error) {
                toast.error("Something went wrong")
            }
        }
        fetch()
    }, [])

    const filteritems = items.filter(item => item.name.toLowerCase().includes(searchterm.toLowerCase()))

    async function handleAddtocart(item) {
        await addtoCart(item);
        console.log(cartItems)
    }

    return (
        <section className='h-full w-full border border-gray-700'>
            <div className='flex justify-between p-4'>
                <p className='font-poppins'>Add Items to Cart</p>
                <div className='flex justify-end  w-[40%] '>
                    <input type="text" placeholder='Search By Keyword' className='w-[70%] bg-white text-black p-0.5' onChange={(e) => setsearchterm(e.target.value)} value={searchterm} />
                    <img src={Search} alt="" className='h-7 cursor-pointer bg-yellow-300' />
                </div>
            </div>
            <div className='flex flex-wrap overflow-auto scroll p-3 gap-8'>
                {filteritems.map((item) => (
                    <div className='h-20 w-50  min-w-fit bg-slate-700 rounded-md flex gap-1 items-center '>
                        <div className='h-full w-[70%]  flex gap-3 items-center'>
                            <img src={item.imageUrl} alt="" className='h-[70%] rounded-sm w-[30%]' />
                            <div className='flex flex-col gap-4 justify-center h-full'>
                                <p className='text-[13px] text-wrap'>{item.name}</p>
                                <p className='text-[12px] font-bold'>Rs.{item.price}</p>
                            </div>
                        </div>
                        <div className='flex flex-col justify-between h-full items-end w-[30%] '>
                            <img src={CART} alt="" />
                            <img src={Add} alt="" className='h-7 mr-2  mb-2 cursor-pointer' onClick={() => handleAddtocart(item)} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Displayitem