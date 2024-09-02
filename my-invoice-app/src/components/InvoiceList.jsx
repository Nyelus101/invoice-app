import React from 'react';
import data from '../assets/data.json';

const statusStyles = {
    paid: 'bg-green-500 text-white',
    pending: 'bg-yellow-500 text-white',
    draft: 'bg-gray-500 text-white',
  };

const InvoiceList = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {data.map((invoice) => (
        <button
          key={invoice.id}
          className="flex flex-row gap-2 p-4 h-20 drop-shadow-sm rounded-lg bg-white  hover:bg-gray-100 "
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
      ))}
    </div>
  );
}

export default InvoiceList;
