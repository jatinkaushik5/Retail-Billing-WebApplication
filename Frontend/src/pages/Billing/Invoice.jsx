import React, { useRef } from 'react'
import Bill from "../../assets/Bill.png"
import { ImPrinter } from "react-icons/im";
import { FaRegCircleCheck } from "react-icons/fa6";
import html2pdf from 'html2pdf.js';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';


const Invoice = () => {

    const componentRef = useRef()

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: "Invoice",
    });

    const navigate = useNavigate()
    const orderres = JSON.parse(localStorage.getItem("orderresponse"))
    console.log(orderres)

    function backPage() {
        localStorage.removeItem("orderresponse")
        localStorage.removeItem("sessionId")
        localStorage.removeItem("customer")
        navigate("/view")
    }

    const dateformat = orderres.createdAt;
    const dateObj = new Date(dateformat)

    return (
        <>
            {/* ── Header ── */}
            <header className='w-full flex justify-between items-center px-4 sm:px-6 py-3 bg-blue-50 shadow-sm'>
                <div className='flex items-center gap-1'>
                    <h1 className='text-lg sm:text-xl font-bold text-[#00647E]'>BillSathi</h1>
                    <img src={Bill} alt="BillSathi logo" className='h-9 sm:h-11' />
                </div>

                <div className='flex gap-2 sm:gap-4'>
                    <button
                        className='bg-red-400 px-3 py-1.5 rounded-md text-white text-sm shadow-md cursor-pointer flex items-center gap-1 hover:bg-red-500 transition'
                        onClick={backPage}
                    >
                        Back
                    </button>
                    <button
                        type='button'
                        onClick={handlePrint}
                        className='bg-[#00647E] px-3 py-1.5 rounded-md text-white text-sm shadow-md cursor-pointer flex items-center gap-1 hover:bg-[#004f63] transition'
                    >
                        <ImPrinter />
                        <span className='hidden xs:inline'>Print Invoice</span>
                        <span className='xs:hidden'>Print</span>
                    </button>
                </div>
            </header>

            {/* ── Main ── */}
            <main className='min-h-screen w-full flex justify-center bg-blue-50 px-3 sm:px-6 py-8'>
                <section
                    className='w-full max-w-2xl flex flex-col gap-3'
                    ref={componentRef}
                >
                    {/* ── Block 1: Branding + Invoice Details ── */}
                    <div className='flex flex-col sm:flex-row justify-between gap-4 bg-white p-5 rounded-md shadow-sm'>

                        {/* Left: Brand + Bill To */}
                        <div className='flex flex-col gap-1 sm:w-[45%]'>
                            <span className='flex items-center gap-1 mb-1'>
                                <h1 className='text-lg font-bold text-[#00647E]'>Bill Sathi</h1>
                                <img src={Bill} alt="" className='h-7' />
                            </span>
                            <h2 className='text-sm font-semibold text-gray-500 uppercase tracking-wide'>Bill To</h2>
                            <div className='flex flex-wrap gap-x-2 gap-y-1 mt-1'>
                                <p className='text-sm text-gray-600'>Customer name:</p>
                                <p className='text-sm font-bold text-gray-900'>{orderres.customerName}</p>
                            </div>
                            <div className='flex flex-wrap gap-x-2 gap-y-1'>
                                <p className='text-sm text-gray-600'>Phone Number:</p>
                                <p className='text-sm font-bold text-gray-900'>{orderres.phoneNumber}</p>
                            </div>
                        </div>

                        {/* Right: Invoice Details */}
                        <div className='flex flex-col bg-[#F3F4F5] rounded-md p-3 sm:w-[48%] gap-2'>
                            <h2 className='text-sm font-bold text-[#00606E]'>Invoice Details</h2>
                            <div className='flex flex-col gap-1.5'>
                                <div className='flex justify-between items-center'>
                                    <p className='text-sm text-[#3E494B]'>Order Id</p>
                                    <p className='text-xs text-[#191C1D] font-medium'>{orderres.Orderid}</p>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <p className='text-sm text-[#3E494B]'>Date</p>
                                    <p className='text-xs text-[#191C1D] font-medium'>{dateObj.toLocaleDateString()}</p>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <p className='text-sm text-[#3E494B]'>Time</p>
                                    <p className='text-xs text-[#191C1D] font-medium'>{dateObj.toLocaleTimeString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Block 2: Customer summary + Payment info ── */}
                    <div className='w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-blue-50 rounded-md px-4 py-3'>

                        {/* Left: Bill To summary */}
                        <div className='flex flex-col'>
                            <h4 className='text-sm font-medium text-[#3E494B]'>Bill To</h4>
                            <h2 className='font-bold text-base'>Jatin Kaushik</h2>
                            <p className='text-sm text-gray-500 mt-0.5'>+91 {orderres.phoneNumber}</p>
                        </div>

                        {/* Right: Payment status + method */}
                        <div className='flex gap-6 flex-wrap'>
                            <div className='flex flex-col items-center gap-1'>
                                <p className='text-xs font-medium text-gray-600'>Payment Status</p>
                                <div className='bg-green-400 rounded-2xl'>
                                    <div className='bg-white/60 rounded-2xl'>
                                        <p className='text-xs flex items-center gap-1 px-3 py-1 rounded-2xl text-green-800 font-bold'>
                                            <FaRegCircleCheck />
                                            Paid
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col items-center gap-1'>
                                <p className='text-xs font-medium text-gray-600'>Payment Method</p>
                                <div className='bg-blue-400 rounded-2xl'>
                                    <div className='bg-white/60 rounded-2xl'>
                                        <p className='text-xs flex items-center gap-1 px-3 py-1 rounded-2xl text-blue-900 font-bold'>
                                            {orderres.paymentMethod}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Block 3: Items table ── */}
                    <div className='w-full bg-white rounded-md shadow-sm overflow-x-auto'>
                        <table className='w-full min-w-[380px]'>
                            <thead>
                                <tr className='border-b border-gray-200'>
                                    <th className='text-sm font-semibold py-3 px-2 text-center'>Item Name</th>
                                    <th className='text-sm font-semibold py-3 px-2 text-center'>Qty</th>
                                    <th className='text-sm font-semibold py-3 px-2 text-center'>Price</th>
                                    <th className='text-sm font-semibold py-3 px-2 text-center'>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderres.items.map((o, index) => (
                                    <tr key={index} className='border-b border-gray-50 last:border-0'>
                                        <td className='text-center text-sm py-2 px-2'>{o.name}</td>
                                        <td className='text-center text-sm py-2 px-2'>{o.quantity}</td>
                                        <td className='text-center text-sm py-2 px-2'>₹{o.price}</td>
                                        <td className='text-center text-sm py-2 px-2 font-bold text-[#00647E]'>₹{o.quantity * o.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* ── Block 4: Totals ── */}
                    <div className='flex flex-col items-end pr-2 sm:pr-6 gap-1 pb-6'>
                        <div className='w-full max-w-[220px] flex flex-col gap-1'>
                            <div className='flex justify-between'>
                                <p className='text-[#00647E] text-sm'>Subtotal</p>
                                <p className='text-[#00647E] text-sm'>₹{orderres.subtotal}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-[#00647E] text-sm'>Tax</p>
                                <p className='text-[#00647E] text-sm'>₹{orderres.totaltax}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-[#00647E] text-sm'>Discount</p>
                                <p className='text-[#00647E] text-sm'>₹{orderres.totaldiscount}</p>
                            </div>
                            <div className='border-t border-gray-400 my-1'></div>
                            <div className='flex justify-between'>
                                <p className='text-base font-bold'>Grand Total</p>
                                <p className='text-sm font-bold text-[#00647E]'>₹{orderres.grandTotal}</p>
                            </div>
                        </div>
                    </div>

                </section>
            </main>
        </>
    )
}

export default Invoice
