// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import data from '../assets/data.json';

// const statusStyles = {
//   paid: 'bg-green-500 text-white',
//   pending: 'bg-yellow-500 text-white',
//   draft: 'bg-gray-500 text-white',
// };

// const InvoiceList = () => {
//   const navigate = useNavigate();

//   const handleInvoiceClick = (id) => {
//     navigate(`/invoice/${id}`);
//   };

//   return (
//     <div className="flex flex-col gap-4 p-4">
//       <div className="bg-slate-50 w-full h-[50px] flex items-center justify-between">
//         <div>Invoices</div>
//         <button className='bg-slate-200 rounded-lg'>Create New Invoice</button>
//       </div>
//       {data.map((invoice) => (
//         <button
//           key={invoice.id}
//           className="flex flex-row gap-2 p-4 h-20 drop-shadow-sm rounded-lg bg-white hover:bg-gray-100"
//           onClick={() => handleInvoiceClick(invoice.id)}
//         >
//           <div className="flex items-center justify-between text-xl font-semibold">
//             <span>#{invoice.id}</span>
//           </div>
//           <div className="flex items-center justify-between">
//             <span className="text-gray-500">Due:</span>
//             <span>{new Date(invoice.paymentDue).toLocaleDateString()}</span>
//           </div>
//           <div className="flex items-center justify-between">
//             <span className="text-gray-500">Client:</span>
//             <span>{invoice.clientName}</span>
//           </div>
//           <div className="flex items-center justify-between">
//             <span className="text-gray-500">Total:</span>
//             <span>${invoice.total.toFixed(2)}</span>
//           </div>
//           <div>
//             <span className={`px-2 py-1 rounded ${statusStyles[invoice.status]}`}>
//               {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
//             </span>
//           </div>
//         </button>
//       ))}
//     </div>
//   );
// };

// export default InvoiceList;









import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const statusStyles = {
  paid: 'bg-green-500 text-white',
  pending: 'bg-yellow-500 text-white',
  draft: 'bg-gray-500 text-white',
};

const InvoiceList = ({ invoices }) => {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const handleInvoiceClick = (id) => {
    navigate(`/invoice/${id}`);
  };

  const filteredInvoices = filter === 'all'
    ? invoices
    : invoices.filter(invoice => invoice.status === filter);

  return (
    <div className="flex flex-col h-full">
      {/* Fixed Header */}
      <div className="bg-slate-50 w-full h-[50px] flex items-center justify-between sticky top-0 z-10">
        <div className="font-semibold text-lg">Invoices</div>
        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-slate-200 rounded-lg p-2"
          >
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="draft">Draft</option>
          </select>
          <button
            className="bg-slate-200 rounded-lg p-2"
            onClick={() => navigate('/invoice/new')}
          >
            Create New Invoice
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-grow overflow-y-auto  bg-slate-200 p-4">
        {filteredInvoices.length > 0 ? (
          filteredInvoices.map((invoice) => (
            <button
              key={invoice.id}
              className="flex flex-row gap-2 p-4 h-20 drop-shadow-sm rounded-lg bg-white hover:bg-gray-100"
              onClick={() => handleInvoiceClick(invoice.id)}
            >
              <div className="flex items-center justify-between text-xl font-semibold">
                <span>#{invoice.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Due:</span>
                <span>{new Date(invoice.paymentDue).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Client:</span>
                <span>{invoice.clientName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Total:</span>
                <span>${invoice.total.toFixed(2)}</span>
              </div>
              <div>
                <span className={`px-2 py-1 rounded ${statusStyles[invoice.status]}`}>
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </span>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center text-gray-500">There's nothing here</div>
        )}
      </div>
    </div>
  );
};

export default InvoiceList;




