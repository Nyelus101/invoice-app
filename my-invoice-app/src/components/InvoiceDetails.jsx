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
    <>
      <button
        className="mb-4 p-2 bg-gray-200 rounded hover:bg-gray-300"
        onClick={() => navigate('/')}
      >
        Go back
      </button>
      <div className="bg-white p-4 rounded shadow-md w-full">
        <div className="flex justify-between mb-4">
          <span className={`px-2 py-1 rounded ${invoice.status}`}>
            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
          </span>
          <div className="flex gap-2">
            <button
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => navigate(`/invoice/edit/${invoice.id}`)}
            >
              Edit
            </button>
            <button
              className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={handleMarkAsPaid}
            >
              Mark as Paid
            </button>
          </div>
        </div>
        {/* Invoice Details */}
        <div>
          <h2 className="text-xl font-bold mb-4">Invoice #{invoice.id}</h2>
          <p>
            <strong>Description:</strong> {invoice.description}
          </p>
          <p>
            <strong>Client Name:</strong> {invoice.clientName}
          </p>
          <p>
            <strong>Client Email:</strong> {invoice.clientEmail}
          </p>
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
        </div>
      </div>
    </>
  );
};

export default InvoiceDetails;
