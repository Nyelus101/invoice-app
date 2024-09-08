// import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import data from '../assets/data.json';

// const InvoiceDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const invoice = data.find((invoice) => invoice.id === id);

//   if (!invoice) {
//     return <div>Invoice not found</div>;
//   }

//   return (
//     <>
//       <button
//         className="mb-4 p-2 bg-gray-200 rounded hover:bg-gray-300"
//         onClick={() => navigate('/')}
//       >
//         Go back
//       </button>
//       <div className="bg-white p-4 rounded shadow-md w-full">
//         <div className="flex justify-between mb-4">
//           <span className={`px-2 py-1 rounded ${invoice.status}`}>
//             {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
//           </span>
//           <div className="flex gap-2">
//             <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
//             <button className="p-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
//             <button className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
//               Mark as Paid
//             </button>
//           </div>
//         </div>
//         <div className="mb-4">
//           <div className="text-lg font-semibold">#{invoice.id}</div>
//           <div className="text-gray-600">{invoice.description}</div>
//         </div>
//         <div className="mb-4">
//           <div className="text-gray-600">Sender's Address:</div>
//           <div>{invoice.senderAddress.street}</div>
//         </div>
//         <div className="mb-4">
//           <div className="text-gray-600">Invoice Date:</div>
//           <div>{new Date(invoice.createdAt).toLocaleDateString()}</div>
//           <div className="text-gray-600">Payment Due:</div>
//           <div>{new Date(invoice.paymentDue).toLocaleDateString()}</div>
//         </div>
//         <div className="mb-4">
//           <div className="text-gray-600">Client's Name:</div>
//           <div>{invoice.clientName}</div>
//           <div className="text-gray-600">Client's Address:</div>
//           <div>{invoice.clientAddress.street}</div>
//         </div>
//         <div className="mb-4">
//           <div className="text-gray-600">Client's Email:</div>
//           <div>{invoice.clientEmail}</div>
//         </div>
//         <div className="item-table mt-4">
//           <table className="w-full text-left">
//             <thead>
//               <tr>
//                 <th className="pb-2">Item Name</th>
//                 <th className="pb-2">Quantity</th>
//                 <th className="pb-2">Price</th>
//                 <th className="pb-2">Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               {invoice.items.map((item, index) => (
//                 <tr key={index}>
//                   <td className="py-1">{item.name}</td>
//                   <td className="py-1">{item.quantity}</td>
//                   <td className="py-1">${item.price.toFixed(2)}</td>
//                   <td className="py-1">${item.total.toFixed(2)}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default InvoiceDetails;








import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdKeyboardArrowLeft } from "react-icons/md";


const statusStyles = {
    paid: {
      badge: 'bg-custom-green-light text-custom-green w-24',
      bullet: 'bg-custom-green', 
    },
    pending: {
      badge: 'bg-custom-orange-light text-custom-orange w-24',
      bullet: 'bg-custom-orange', 
    },
    draft: {
      badge: 'bg-gray-100 text-gray-700 w-24',
      bullet: 'bg-gray-700', 
    },
  };


const InvoiceDetails = ({ invoices, deleteInvoice, updateInvoice }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const invoice = invoices.find((invoice) => invoice.id === id);

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  const handleDelete = () => {
    deleteInvoice(invoice.id);
    navigate('/');
  };

  const handleMarkAsPaid = () => {
    updateInvoice({ ...invoice, status: 'paid' });
    navigate('/');
  };

  return (
    <div className='bg-slate-50 w-full h-[100%] space-y-5'>
      <div className='flex flex-row items-center space-x-4' >
        <div><MdKeyboardArrowLeft /></div>
        <button
            className="font-medium"
            onClick={() => navigate('/')}>
            Go back
        </button>
      </div>
      <div className="bg-white rounded p-3 flex items-center justify-between mb-4">
        <div className='flex flex-row items-center gap-5'>
            <div className='text-gray-600 font-semibold text-sm'>
                Status
            </div>
            <div className="flex items-center justify-between">
            <span className={`flex items-center justify-center gap-2 px-2 py-1 rounded ${statusStyles[invoice.status].badge} inline-block`}>
                <div className={`w-2 h-2 rounded-full ${statusStyles[invoice.status].bullet}`}></div> {/* Bullet point */}
                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
            </span>
            </div>
        </div>
        <div className="flex gap-2">
            <button className="p-2 px-5 bg-gray-200 text-gray-800 text-sm rounded-full font-semibold"
            onClick={() => navigate(`/invoice/edit/${invoice.id}`)}>
            Edit</button>
            <button className="p-2 px-5 bg-red-500 text-white text-sm rounded-full font-semibold"
                onClick={handleDelete}>Delete</button>
            <button className="p-2 px-5 bg-custom-purple text-white text-sm rounded-full font-semibold"
                onClick={handleMarkAsPaid}>Mark as Paid</button>
        </div>
        </div>
        <div className="bg-white p-4 rounded shadow-md w-full">
            {/* Invoice Details */}
            <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-col justify-start'>
                    <span className="text-sm font-bold mb-4">#{invoice.id}</span>
                    <span>{invoice.description}</span>
                </div>
                <div className='flex flex-col justify-end text-right text-sm font-medium text-gray-600'>
                    <span>{invoice.senderAddress.street}</span>
                    <span>{invoice.senderAddress.city}</span>
                    <span>{invoice.senderAddress.postCode}</span>
                    <span>{invoice.senderAddress.country}</span>
                </div>
            </div>
            {/* <div className='flex flex-row items-center justify-evenly'>
                <div>
                    <div className='flex flex-col justify-start'>
                        <span className='text-custom-text text-sm'>Invoice Date</span>
                        <span className='font-semibold'>{new Date(invoice.createdAt).toLocaleDateString()} </span>
                    </div>
                    <div className='flex flex-col justify-start'>
                        <span className='text-custom-text text-sm'>Payment Due</span>
                        <span className='font-semibold'>{new Date(invoice.paymentDue).toLocaleDateString()} </span>
                    </div> 
                </div>
                <div>
                    <div className='flex flex-col justify-end'>
                        <span className='text-custom-text text-sm'>Bill To</span>
                        <span>{invoice.clientName} </span>
                    </div>
                    <div className='flex flex-col  text-left text-sm font-medium text-custom-text'>
                        <span>{invoice.clientAddress.street}</span>
                        <span>{invoice.clientAddress.city}</span>
                        <span>{invoice.clientAddress.postCode}</span>
                        <span>{invoice.clientAddress.country}</span>
                    </div>
                </div>
                <div className='flex flex-col justify-start'>
                    <span className='text-custom-text text-sm'>Sent to</span>
                    <span>{invoice.clientEmail} </span>
                </div>
            </div> */}
            <div className="grid grid-cols-3 gap-4 items-start">
                <div className='flex flex-col space-y-5'>
                    <div className="flex flex-col">
                        <span className="text-custom-text text-sm pb-3">Invoice Date</span>
                        <span className="font-semibold">{new Date(invoice.createdAt).toLocaleDateString()} </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-custom-text text-sm pb-3">Payment Due</span>
                        <span className="font-semibold">{new Date(invoice.paymentDue).toLocaleDateString()} </span>
                    </div>
                </div>

                <div>
                    <div className="flex flex-col">
                        <span className="text-custom-text text-sm pb-3">Bill To</span>
                        <span>{invoice.clientName} </span>
                    </div>
                    <div className="flex flex-col text-left text-sm text-custom-text">
                        <span>{invoice.clientAddress.street}</span>
                        <span>{invoice.clientAddress.city}</span>
                        <span>{invoice.clientAddress.postCode}</span>
                        <span>{invoice.clientAddress.country}</span>
                    </div>
                </div>

                <div className="flex flex-col">
                    <span className="text-custom-text text-sm pb-3">Sent to</span>
                    <span className='font-semibold break-all '>{invoice.clientEmail} </span>
                </div>
            </div>



            
        </div>
    </div>
  );
};

export default InvoiceDetails;

{/* <div>
            
                <p>
                    <strong>Payment Due:</strong> {new Date(invoice.paymentDue).toLocaleDateString()}
                </p>
                <h3 className="text-lg font-bold mt-4">Items</h3>
                <ul>
                    {invoice.items.map((item, index) => (
                    <li key={index}>
                        {item.name} - {item.quantity} x ${item.price.toFixed(2)} = ${item.total.toFixed(2)}
                    </li>
                    ))}
                </ul>
                <p className="mt-4 text-lg font-bold">
                    Total: ${invoice.total.toFixed(2)}
                </p>
            </div> */}