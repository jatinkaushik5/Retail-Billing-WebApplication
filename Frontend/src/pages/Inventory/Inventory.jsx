import React, { useEffect, useRef, useState } from 'react'
import { ImGift } from 'react-icons/im';
import { RiImageAddFill } from "react-icons/ri";
import { FaCartPlus } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import { deleteCategory, deleteitem, getAllCategory, getAllCategoryName, getCategory, getitem, getitems, saveCategory, saveitem } from './InventoryService';
import toast from 'react-hot-toast';
import { MdGetApp } from 'react-icons/md';
import { IoPencilSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";

const Inventory = () => {
    const [codedata, setcodedata] = useState("Not Found")
    const [categories, setcategories] = useState([])
    const [items, setitems] = useState([])
    const [view, setview] = useState("item")
    const [updatecategory, setupdatecategory] = useState("")
    const [updateitemImage, setupdateitemImage] = useState(null)
    const [currentPage, setcurrentPage] = useState(0)
    const [Active, setActive] = useState("item")
    const [Image, setImage] = useState(null)
    const [UpdateImage, setUpdateImage] = useState(null)
    const [itemImage, setitemImage] = useState(null)
    const ref = useRef()
    const itemref = useRef();

    const [cname, setcname] = useState("")
    const [cdescription, setcdescription] = useState("")
    const [categoryid, setcategoryid] = useState("")
    const [loading, setloading] = useState(false)

    const [iname, setiname] = useState("")
    const [iprice, setiprice] = useState("")
    const [idiscount, setidiscount] = useState("")
    const [itax, setitax] = useState("")
    const [icategory, seticategory] = useState("")
    const [idescription, setidescription] = useState("")
    const [iid, setiid] = useState("")
    const [totalitems, setotalitems] = useState(0)
    const [categorycurrentPage, setcategorycurrentPage] = useState(0)
    const [totalcategory, settotalcategory] = useState(0)

    const dataperBlock = 5;

    useEffect(() => {
        async function fetch() {
            const response = await getAllCategory(categorycurrentPage);
            const response1=await getAllCategoryName();
            setcategories(response1.data)
            settotalcategory(response.data.totalCategory)
            console.log("data: ",response1.data)
        }
        fetch()
    }, [categorycurrentPage])

    useEffect(() => {
        async function fetch() {
            const response = await getitems(currentPage);
            setitems(response.data.items)
            setotalitems(response.data.totalitems)
        }
        fetch()
    }, [currentPage])

    async function deleteItem(id) {
        await deleteitem(id);
        toast.success("item deleted")
        const response1 = await getitems(currentPage);
        setitems(response1.data.items)
        setotalitems(response1.data.totalitems)
        const response = await getAllCategory(categorycurrentPage);
       const response2=await getAllCategoryName();
        setcategories(response2.data)
        settotalcategory(response.data.totalCategory)
    }

    async function categorySave(e) {
        e.preventDefault();
        if (Image == null) { toast.error("Upload Category Image"); return }
        if (cname.length < 1) { toast.error("Enter Category Name"); return }
        if (cdescription.length < 1) { toast.error("Enter Category description"); return }
        setloading(true)
        try {
            const data = new FormData();
            data.append("name", cname)
            data.append("description", cdescription)
            data.append("image", Image)
            await saveCategory(data);
            const response = await getAllCategory(categorycurrentPage);
            const response1=await getAllCategoryName();
            setcategories(response1.data)
            settotalcategory(response.data.totalCategory)
            toast.success("Category added Successfully")
        } catch (error) {
            setloading(false)
            toast.error("Same Category already present");
        } finally {
            setcname(""); setcdescription(""); setImage(null); setcategoryid(""); setloading(false)
        }
    }

    function activateImage() { itemref.current.click(); }
    function activefileinput() { ref.current.click(); }
    function setItemImage(e) { setitemImage(e.target.files[0]) }
    function filehandle(e) { setImage(e.target.files[0]) }

    async function itemSave(e) {
        e.preventDefault();
        if (itemImage == null && iid.length == 0) { toast.error("Upload image of item"); return }
        if (iname.length < 1) { toast.error("Enter item name"); return }
        if (iprice.length < 1) { toast.error("Enter item price"); return }
        if (idescription.length < 1) { toast.error("Enter item Description"); return }
        if (icategory.length < 1) { toast.error("Choose category for item"); return }
        if (idiscount.length < 1) { toast.error("Enter discount of item"); return }
        if (itax.length < 1) { toast.error("Enter tax for item"); return }
        try {
            setloading(true)
            const data = new FormData();
            data.append("name", iname)
            data.append("category", icategory)
            data.append("price", iprice)
            data.append("discount", idiscount)
            data.append("tax", itax)
            if (itemImage) data.append("image", itemImage)
            data.append("itemId", iid)
            data.append("description", idescription)
            await saveitem(data);
            toast.success("item added Successfully")
            setloading(false)
            setiname(""); setiprice(""); seticategory(""); setidiscount(""); setitax(""); setitemImage(null); setiid(""); setidescription("")
            const response1 = await getitems(currentPage);
            setitems(response1.data.items)
            setotalitems(response1.data.totalitems)
            const response = await getAllCategory(categorycurrentPage);
            const response2=await getAllCategoryName();
            setcategories(response2.data)
            settotalcategory(response.data.totalCategory)
        } catch (err) {
            toast.error("Item Already Present"); return
        }
    }

    async function updateitem(id) {
        setActive("item")
        const response = await getitem(id);
        setiname(response.data.name)
        setiprice(response.data.price)
        seticategory(response.data.category)
        setidiscount(response.data.discount)
        setidescription(response.data.description)
        setitax(response.data.tax)
        setupdateitemImage(response.data.imageUrl)
        setiid(response.data.itemId)
    }

    async function deletecategory(id) {
        await deleteCategory(id);
        toast.success("Category deleted");
        const response = await getAllCategory(categorycurrentPage);
       const response1=await getAllCategoryName();
            setcategories(response1.data)
        settotalcategory(response.data.totalCategory)
        const response2 = await getitems(currentPage);
        setitems(response2.data.items)
        setotalitems(response1.data.totalitems)
    }

    function MovetoNextItem() {
        if (currentPage < (Math.ceil(totalitems / dataperBlock) - 1)) setcurrentPage(currentPage + 1)
    }
    function MovetoPrevItem() {
        if (currentPage > 0) setcurrentPage(currentPage - 1)
    }
    function MovetoPrevCategory() {
        if (categorycurrentPage > 0) setcategorycurrentPage(categorycurrentPage - 1)
    }
    function MovetoNextCategory() {
        if (categorycurrentPage < (Math.ceil(totalcategory / dataperBlock) - 1)) setcategorycurrentPage(categorycurrentPage + 1)
    }

    return (
        <>
            <main className='min-h-screen w-full flex flex-col lg:flex-row bg-blue-50 overflow-auto'>

                {/* ── LEFT PANEL ── */}
                <section className='w-full lg:w-[60%] flex flex-col items-center p-4 sm:p-6'>

                    {/* Header + toggle */}
                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 sm:gap-0'>
                        <span>
                            <h1 className='text-xl sm:text-2xl font-extrabold'>Manage Inventory</h1>
                            <p className='text-xs sm:text-sm opacity-70 font-semibold mt-1'>
                                Add new stock or organize your collection
                            </p>
                        </span>
                        <div className='flex w-full sm:w-auto sm:min-w-[200px] items-center h-12 rounded-2xl p-1 bg-gray-300'>
                            <button
                                className={`flex-1 text-xs h-10 rounded-lg font-bold transition ${Active === "item" ? "bg-[#00647E] text-white" : "text-gray-600"}`}
                                onClick={() => setActive("item")}
                            >
                                ADD<br />Item
                            </button>
                            <button
                                className={`flex-1 text-xs h-10 rounded-sm font-bold transition ${Active === "category" ? "bg-[#9B6826] text-white" : "text-gray-600"}`}
                                onClick={() => setActive("category")}
                            >
                                ADD<br />Category
                            </button>
                        </div>
                    </div>

                    {/* Forms */}
                    <div className='w-full flex justify-center mt-6'>

                        {/* ── Add Item Form ── */}
                        <form
                            onSubmit={itemSave}
                            className={`flex flex-col gap-4 items-center rounded-md shadow-md p-4 w-full max-w-2xl bg-white ${Active === "item" ? "" : "hidden"}`}
                        >
                            {/* Image upload */}
                            <div
                                className="w-full h-40 sm:h-48 rounded-md flex justify-center items-center flex-col bg-cover bg-center cursor-pointer"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCaWB5iDnmsWCcBqOSiCGI2Tm5TwynENDSKXoufhLsCAiBUHdg0TWk04PFnSc5AV5JbTgjOWEBwrBqEEhkAkhZZdWfgbnN9YSqXx46iiTZTt0hotx4SNK0pMGo3vo0xBBU2ZZoPFUvNUvuJaETP5HPO9x2j0pk4O06BQ250SSRrax2SJm8bj5UsVU522awD20bQ6NJqbAt_IiZtPYc5xeCZH9ngVtq0jKZY3aD8l__PBJakKRlh0vDZ1ZWhEQFZgcxyXR1qvkcJ5iQT')" }}
                                onClick={activateImage}
                            >
                                <div className='h-full w-full rounded-md bg-white/80 border-2 border-dotted border-gray-400 flex justify-center items-center'>
                                    {updateitemImage ? (
                                        <img src={updateitemImage} className="h-full w-full object-cover rounded-md" />
                                    ) : itemImage ? (
                                        <img src={URL.createObjectURL(itemImage)} className="h-full w-full object-cover rounded-md" />
                                    ) : (
                                        <div className='flex flex-col items-center gap-3'>
                                            <RiImageAddFill size={36} className='text-black' />
                                            <p className='text-black text-xs sm:text-sm font-bold'>Drag & drop item image</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Name + Price */}
                            <div className='flex flex-col sm:flex-row justify-between w-full gap-4 px-2 sm:px-6'>
                                <div className='flex flex-col gap-2 flex-1'>
                                    <label className='text-xs sm:text-sm font-semibold'>Item Name</label>
                                    <input
                                        type="text" placeholder='e.g. Minimalist Watch'
                                        className='text-sm focus:outline-none px-3 py-2 border-b-2 border-gray-300 w-full'
                                        onChange={(e) => setiname(e.target.value)} value={iname}
                                    />
                                </div>
                                <div className='flex flex-col gap-2 flex-1'>
                                    <label className='text-xs sm:text-sm font-semibold'>Item Price</label>
                                    <input
                                        type="number" placeholder='Price' min={1}
                                        className='text-sm focus:outline-none px-3 py-2 border-b-2 border-gray-300 w-full'
                                        onChange={(e) => setiprice(e.target.value)} value={iprice}
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className='flex flex-col gap-2 w-full px-2 sm:px-6'>
                                <label className='text-xs sm:text-sm font-semibold'>Item Description</label>
                                <textarea
                                    className='px-3 py-2 h-20 border-b-2 border-gray-300 focus:outline-none w-full text-sm resize-none'
                                    placeholder='Describe the item features and specifications'
                                    onChange={(e) => setidescription(e.target.value)} value={idescription}
                                />
                            </div>

                            {/* Category */}
                            <div className='flex flex-col gap-2 w-full px-2 sm:px-6'>
                                <label className='text-xs sm:text-sm font-semibold'>Item Category</label>
                                <select
                                    className='focus:outline-none w-full border-b-2 border-gray-300 px-3 py-2 text-sm bg-white'
                                    onChange={(e) => seticategory(e.target.value)} value={icategory}
                                >
                                    <option value="">-- Choose Category --</option>
                                    {categories.map((c) => (
                                        <option  value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Discount + Tax */}
                            <div className='flex flex-col sm:flex-row justify-between w-full gap-4 px-2 sm:px-6'>
                                <div className='flex flex-col gap-2 flex-1'>
                                    <label className='text-xs sm:text-sm font-semibold'>Item Discount</label>
                                    <input
                                        type="number" placeholder='% Discount' min={0}
                                        className='text-sm focus:outline-none px-3 py-2 border-b-2 border-gray-300 w-full'
                                        onChange={(e) => setidiscount(e.target.value)} value={idiscount}
                                    />
                                </div>
                                <div className='flex flex-col gap-2 flex-1'>
                                    <label className='text-xs sm:text-sm font-semibold'>Tax on Item</label>
                                    <input
                                        type="number" placeholder='% Tax' min={0}
                                        className='text-sm focus:outline-none px-3 py-2 border-b-2 border-gray-300 w-full'
                                        onChange={(e) => setitax(e.target.value)} value={itax}
                                    />
                                </div>
                            </div>

                            {/* Submit */}
                            <div className='flex justify-center w-full mt-2 px-2 sm:px-6'>
                                <button
                                    type="submit"
                                    className='h-11 w-full sm:w-4/5 cursor-pointer border rounded-md text-white font-semibold text-sm bg-[#00647E] hover:bg-[#004f63] transition'
                                >
                                    {loading ? "Saving item..." : "Create Inventory Entry"}
                                </button>
                            </div>

                            <input type="file" ref={itemref} onChange={setItemImage} hidden />
                            <input type="text" value={iid} hidden readOnly />
                        </form>

                        {/* ── Add Category Form ── */}
                        <form
                            onSubmit={categorySave}
                            className={`flex flex-col gap-4 p-4 sm:p-6 rounded-md shadow-md w-full max-w-2xl bg-white cursor-pointer ${Active === "category" ? "" : "hidden"}`}
                        >
                            {/* Image upload */}
                            <div
                                className="w-full h-48 sm:h-56 rounded-md flex justify-center items-center flex-col bg-cover bg-center"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDnwgt1c5-nlL2zjOymVk69TOXRMb7HqUMhFfiC2uhF60V3eXbWLSWYKAmSG1Qz9WMLGUVrK-MzkHHudqlHdPCGtFsK-t8zGCNShSwrMYR0b-Uafb-nIhsT_VYOiV3DLjkw0rJqq5-gO1KjOLhMFvVNnBd3fwpSVFsJ_iBVMharDh5TQChAdUvx1tVUngXDsGDBv8a9TGfO_tI8GgwT989522n9JLQNlFkL5UVAhkXMq5_XJdRmNvz4hxBwXIzsUoy7LhZGlfXpBzNe')" }}
                                onClick={activefileinput}
                            >
                                <div className='h-full w-full rounded-md bg-white/80 border-2 border-dotted border-gray-400 flex justify-center items-center'>
                                    {UpdateImage ? (
                                        <img src={UpdateImage} className="h-full w-full object-cover rounded-md" />
                                    ) : Image ? (
                                        <img src={URL.createObjectURL(Image)} className="h-full w-full object-cover rounded-md" />
                                    ) : (
                                        <div className='flex flex-col items-center gap-3'>
                                            <RiImageAddFill size={36} className='text-black' />
                                            <p className='text-black text-xs sm:text-sm font-bold'>Drag & drop Category image</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Category Name */}
                            <div className='flex flex-col gap-2 w-full'>
                                <label className='text-xs sm:text-sm font-semibold'>Category Name</label>
                                <input
                                    type="text" placeholder='e.g. Headphone'
                                    className='focus:outline-none px-3 py-2 border-b-2 border-gray-300 text-sm w-full'
                                    onChange={(e) => setcname(e.target.value)} value={cname}
                                />
                            </div>

                            {/* Category Description */}
                            <div className='flex flex-col gap-2 w-full'>
                                <label className='text-xs sm:text-sm font-semibold'>Category Description</label>
                                <textarea
                                    placeholder='Describe about your category'
                                    className='resize-none px-3 py-2 w-full focus:outline-none text-sm border-b-2 border-gray-300 h-28'
                                    onChange={(e) => setcdescription(e.target.value)} value={cdescription}
                                />
                            </div>

                            <input type="text" value={categoryid} hidden readOnly />

                            {/* Submit */}
                            <div className='flex justify-center w-full mt-2'>
                                <button
                                    type='submit'
                                    className='h-11 w-full sm:w-4/5 border rounded-md text-white bg-[#9B6826] hover:bg-[#7d551e] transition font-semibold text-sm'
                                >
                                    {loading ? "Loading..." : "Add Category"}
                                </button>
                            </div>

                            <input type="file" ref={ref} onChange={filehandle} hidden />
                        </form>
                    </div>
                </section>

                {/* ── RIGHT PANEL ── */}
                <section className='w-full lg:w-[40%] flex flex-col items-center lg:items-start gap-6 p-4 sm:p-6'>

                    {/* Quick Commands */}
                    <div className='flex flex-col p-5 sm:p-7 rounded-lg w-full sm:w-4/5 shadow-lg bg-[#F2F4F6] gap-3'>
                        <h2 className='font-semibold text-sm sm:text-base'>Quick Commands</h2>

                        <div
                            className='flex justify-between rounded-md shadow-md p-2 items-center bg-white hover:bg-[#00647E] hover:text-white cursor-pointer transition group'
                            onClick={() => setview("item")}
                        >
                            <span className='flex items-center gap-3 px-2 py-1'>
                                <div className='bg-blue-100 rounded-md p-2'>
                                    <FaCartPlus className='text-blue-500' />
                                </div>
                                <span>
                                    <p className='text-sm font-extrabold'>View Items</p>
                                    <p className='text-xs opacity-65'>Single product entry</p>
                                </span>
                            </span>
                            <IoMdArrowDropright />
                        </div>

                        <div
                            className='flex justify-between rounded-md shadow-md p-2 items-center bg-white hover:bg-[#9B6826] hover:text-white cursor-pointer transition'
                            onClick={() => setview("category")}
                        >
                            <span className='flex gap-3 items-center px-2 py-1'>
                                <div className='bg-amber-100 rounded-md p-2'>
                                    <MdOutlineCategory className='text-[#9B6826]' />
                                </div>
                                <span>
                                    <p className='text-sm font-extrabold'>View Category</p>
                                    <p className='text-xs opacity-65'>Organize your products</p>
                                </span>
                            </span>
                            <IoMdArrowDropright />
                        </div>
                    </div>

                    {/* ── Item List ── */}
                    <div className={`flex flex-col justify-between w-full sm:w-4/5 bg-white rounded-lg shadow-md h-80 sm:h-96 lg:h-[55%] p-3 ${view === "item" ? "flex" : "hidden"}`}>
                        <div className='flex flex-col overflow-auto flex-1 p-2'>
                            <p className='text-gray-800 text-sm font-medium mb-2'>Recent Items ({totalitems})</p>
                            <table className='border-separate border-spacing-y-3 w-full'>
                                <tbody>
                                    {items.map((item) => (
                                        <tr key={item.itemId}>
                                            <td className='w-12'>
                                                <img src={item.imageUrl} alt="" className='h-10 w-10 sm:h-11 sm:w-11 rounded-sm object-cover' />
                                            </td>
                                            <td className='max-w-[120px] sm:max-w-none'>
                                                <p className='text-xs sm:text-sm pl-2 font-semibold truncate'>{item.name}</p>
                                                <p className='text-black opacity-60 pl-2 text-xs font-semibold'>{item.category}</p>
                                            </td>
                                            <td className='text-xs sm:text-sm font-semibold text-[#00647E] whitespace-nowrap pr-2'>₹{item.price}</td>
                                            <td>
                                                <span className='flex gap-2 items-center justify-center'>
                                                    <IoPencilSharp
                                                        className='text-base hover:text-blue-800 text-gray-700 cursor-pointer'
                                                        onClick={() => updateitem(item.itemId)}
                                                    />
                                                    <MdDelete
                                                        className='text-base hover:text-red-500 text-gray-700 cursor-pointer'
                                                        onClick={() => deleteItem(item.itemId)}
                                                    />
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='flex justify-end items-center gap-4 pt-2'>
                            <button className='p-2 rounded-full bg-gray-500 text-white hover:bg-gray-600 transition' onClick={MovetoPrevItem}>
                                <FaArrowLeft size={12} />
                            </button>
                            <button className='p-2 rounded-full bg-gray-500 text-white hover:bg-gray-600 transition' onClick={MovetoNextItem}>
                                <FaArrowRight size={12} />
                            </button>
                        </div>
                    </div>

                    {/* ── Category List ── */}
                    <div className={`flex flex-col justify-between w-full sm:w-4/5 bg-white rounded-md shadow-md h-80 sm:h-96 lg:h-[55%] p-3 ${view === "category" ? "flex" : "hidden"}`}>
                        <div className='flex flex-col overflow-y-auto flex-1 p-2'>
                            <p className='text-gray-800 text-sm font-medium mb-2'>View Category ({totalcategory})</p>
                            <table className='border-separate border-spacing-y-3 w-full'>
                                <tbody>
                                    {categories.map((category) => (
                                        <tr key={category.categoryid}>
                                            <td className='w-12'>
                                                <img src={category.imageUrl} alt="" className='h-10 w-10 sm:h-11 sm:w-11 rounded-sm object-cover' />
                                            </td>
                                            <td className='max-w-[120px] sm:max-w-none'>
                                                <p className='text-xs sm:text-sm pl-2 font-semibold truncate'>{category.name}</p>
                                            </td>
                                            <td>
                                                <span className='flex gap-1 justify-center items-center rounded-2xl bg-[#00647E] text-white text-xs font-semibold px-2 py-1 whitespace-nowrap'>
                                                    {category.itemsLength} items
                                                </span>
                                            </td>
                                            <td>
                                                <span className='flex justify-center ml-2'>
                                                    <MdDelete
                                                        className='text-base hover:text-red-500 text-gray-700 cursor-pointer'
                                                        onClick={() => deletecategory(category.categoryid)}
                                                    />
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='flex justify-end items-center gap-4 pt-2'>
                            <button className='p-2 rounded-full bg-gray-500 text-white hover:bg-gray-600 transition' onClick={MovetoPrevCategory}>
                                <FaArrowLeft size={12} />
                            </button>
                            <button className='p-2 rounded-full bg-gray-500 text-white hover:bg-gray-600 transition' onClick={MovetoNextCategory}>
                                <FaArrowRight size={12} />
                            </button>
                        </div>
                    </div>

                </section>
            </main>

            <div className='max-sm:mb-15 '>

            </div>
        </>
    )
}

export default Inventory
