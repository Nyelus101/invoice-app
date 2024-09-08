import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";

const statusStyles = {
  paid: {
    badge: 'bg-green-500 text-white w-24',
    bullet: 'bg-green-700', // Darker green shade
  },
  pending: {
    badge: 'bg-yellow-500 text-white w-24',
    bullet: 'bg-yellow-700', // Darker yellow shade
  },
  draft: {
    badge: 'bg-gray-500 text-white w-24',
    bullet: 'bg-gray-700', // Darker gray shade
  },
};

const InvoiceList = ({ invoices }) => {
  const [filter, setFilter] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleInvoiceClick = (id) => {
    navigate(`/invoice/${id}`);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    setIsDropdownOpen(false);
  };

  const filteredInvoices = filter === 'all'
    ? invoices
    : invoices.filter(invoice => invoice.status === filter);

  return (
    <div className="w-full h-[80%] ">
      {/* Fixed Header */}
      <div className="bg-slate-50 w-full h-[20%] flex items-center justify-between sticky top-0 z-10">
        <div className="font-semibold text-lg">Invoices</div>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="bg-slate-200 rounded-lg p-2 flex items-center gap-2"
          >
            Filter by status
            <span className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-20">
              <ul>
                <li>
                  <button
                    onClick={() => handleFilterChange('all')}
                    className={`block w-full text-left px-4 py-2 ${filter === 'all' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                  >
                    All
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleFilterChange('paid')}
                    className={`block w-full text-left px-4 py-2 ${filter === 'paid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                  >
                    Paid
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleFilterChange('pending')}
                    className={`block w-full text-left px-4 py-2 ${filter === 'pending' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                  >
                    Pending
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleFilterChange('draft')}
                    className={`block w-full text-left px-4 py-2 ${filter === 'draft' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                  >
                    Draft
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
        <button
          className="bg-slate-200 rounded-lg p-2"
          onClick={() => navigate('/invoice/new')}
        >
          Create New Invoice
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-grow w-full h-[100%] overflow-y-auto space-y-2 bg-slate-50">
        {filteredInvoices.length > 0 ? (
          filteredInvoices.map((invoice) => (
            <button
              key={invoice.id}
              className="flex flex-row items-center justify-between gap-2 p-4 w-full h-20 drop-shadow-sm rounded-lg bg-white hover:bg-gray-100"
              onClick={() => handleInvoiceClick(invoice.id)}
            >
              <div className="flex items-center justify-between text-sm font-semibold">
                <span><span className='text-gray-500'>#</span> {invoice.id}</span>
              </div>
              <div className="flex items-center justify-between space-x-1">
                <span className="text-gray-500">Due</span>
                <span>{new Date(invoice.paymentDue).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{invoice.clientName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>£{invoice.total.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`flex items-center gap-2 px-2 py-1 rounded ${statusStyles[invoice.status].badge} inline-block`}>
                  <div className={`w-2 h-2 rounded-full ${statusStyles[invoice.status].bullet}`}></div> {/* Bullet point */}
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </span>
              </div>
              <div>
                <MdKeyboardArrowRight />
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
