import React, { useRef } from 'react'
import Bill from "../../assets/Bill.png"
import { ImPrinter } from "react-icons/im";
import { FaRegCircleCheck } from "react-icons/fa6";
import html2pdf from 'html2pdf.js';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';


const Invoice = () => {

    const componentRef = useRef()

    


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

   const handlePrint = async () => {
    const element = componentRef.current;

    const worker = html2pdf().from(element).set({
        margin: 0,
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: {
            unit: "mm",
            format: [80, 150],
            orientation: "portrait"
        }
    });

    const pdfBlob = await worker.outputPdf('blob');
    const url = URL.createObjectURL(pdfBlob);

    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    document.body.appendChild(iframe);

    iframe.onload = () => {
        setTimeout(() => {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
        }, 500);
    };
};

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

            <main className='flex flex-col' >
            <div id='print-area'>
        <div style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'center', paddingTop: '32px', paddingBottom: '32px' }}>
  <div
    ref={componentRef}
    style={{
      width: '80mm',
      border: '1px solid #d1d5db',
      padding: '16px',
      fontSize: '12px',
      color: '#000',
      fontFamily: 'monospace',
    }}
  >
    {/* Header */}
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>BILL SATHI</h1>
    </div>

    <div style={{ borderTop: '1px dashed black', margin: '12px 0' }} />

    {/* Invoice Info */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Invoice No :</span>
        <span>{orderres.Orderid}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Date :</span>
        <span>{dateObj.toLocaleDateString()}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Time :</span>
        <span>{dateObj.toLocaleTimeString()}</span>
      </div>
    </div>

    <div style={{ borderTop: '1px dashed black', margin: '12px 0' }} />

    {/* Customer Info */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Customer :</span>
        <span>{orderres.customerName}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Mobile :</span>
        <span>{orderres.phoneNumber}</span>
      </div>
    </div>

    <div style={{ borderTop: '1px dashed black', margin: '12px 0' }} />

    {/* Items Table */}
    <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ paddingBottom: '8px' }}>Item</th>
          <th style={{ paddingBottom: '8px', textAlign: 'center' }}>Qty</th>
          <th style={{ paddingBottom: '8px', textAlign: 'right' }}>Amount</th>
        </tr>
      </thead>
      <tbody>
        {orderres.items.map((item, index) => (
          <tr key={index}>
            <td style={{ padding: '4px 0' }}>{item.name}</td>
            <td style={{ textAlign: 'center' }}>{item.quantity}</td>
            <td style={{ textAlign: 'right' }}>₹{item.price}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <div style={{ borderTop: '1px dashed black', margin: '12px 0' }} />

    {/* Subtotals */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Subtotal</span>
        <span>₹{orderres.subtotal}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Tax</span>
        <span>₹{orderres.totaltax}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Discount</span>
        <span>- ₹{orderres.totaldiscount}</span>
      </div>
    </div>

    <div style={{ borderTop: '1px solid black', margin: '12px 0' }} />

    {/* Grand Total */}
    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '14px' }}>
      <span>GRAND TOTAL</span>
      <span>₹{orderres.grandTotal.toFixed(2)}</span>
    </div>

    <div style={{ borderTop: '1px dashed black', margin: '12px 0' }} />

    {/* Payment */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Payment</span>
        <span>{orderres.paymentMethod}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Status</span>
        <span>PAID</span>
      </div>
    </div>

    <div style={{ borderTop: '1px dashed black', margin: '12px 0' }} />

    {/* Footer */}
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontWeight: '600', margin: '0 0 4px' }}>Thank You For Shopping!</p>
      <p style={{ margin: 0 }}>Visit Again</p>
    </div>
  </div>
</div>
            </div>
                
            </main>
        </>
    )
}

export default Invoice
