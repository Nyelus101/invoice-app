
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";



const statusStyles = {
  paid: {
    badge: 'bg-custom-green-light text-custom-green w-24',
    bullet: 'bg-custom-green', // Darker green shade
  },
  pending: {
    badge: 'bg-custom-orange-light text-custom-orange w-24',
    bullet: 'bg-custom-orange', // Darker yellow shade
  },
  draft: {
    badge: 'bg-gray-100 text-gray-700 w-24',
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
      <div className="bg-slate-50 w-full h-[5%] pb-10 md:pb-0 md:h-[20%] flex items-center justify-between sticky top-0 z-10">
        <div>
          <div className="font-extrabold text-3xl">Invoices</div>
            <div>
              {/* Display on small screens */}
              <div className="font-semibold text-xs text-gray-500 md:hidden">
                {`${filteredInvoices.length} invoices`}
              </div>
              {/* Display on medium and large screens */}
              <div className="font-semibold text-xs text-gray-500 hidden md:block">
                {`There are ${filteredInvoices.length} total invoices`}
              </div>
            </div>

        </div>
        <div className='flex flex-row items-center space-x-3'>
          <div className="">
            <button onClick={toggleDropdown} className="p-2 flex items-center gap-2">
              Filter <span className='hidden md:block'>by status</span>
              {isDropdownOpen ? <MdOutlineKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-16 md:right-32 mt-2 w-48 bg-white border rounded-lg shadow-lg z-20">
                <ul>
                  <li>
                    <button
                      onClick={() => handleFilterChange('all')}
                      className={` w-full text-left px-4 py-2 flex items-center gap-2 ${filter === 'all' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                    >
                      <input
                        type="checkbox"
                        checked={filter === 'all'}
                        readOnly
                        className="form-checkbox"
                      />
                      All
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleFilterChange('paid')}
                      className={` w-full text-left px-4 py-2 flex items-center gap-2 ${filter === 'paid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                    >
                      <input
                        type="checkbox"
                        checked={filter === 'paid'}
                        readOnly
                        className="form-checkbox"
                      />
                      Paid
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleFilterChange('pending')}
                      className={` w-full text-left px-4 py-2 flex items-center gap-2 ${filter === 'pending' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                    >
                      <input
                        type="checkbox"
                        checked={filter === 'pending'}
                        readOnly
                        className="form-checkbox"
                      />
                      Pending
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleFilterChange('draft')}
                      className={` w-full text-left px-4 py-2 flex items-center gap-2 ${filter === 'draft' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                    >
                      <input
                        type="checkbox"
                        checked={filter === 'draft'}
                        readOnly
                        className="form-checkbox"
                      />
                      Draft
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="bg-custom-purple cursor-pointer flex flex-row items-center justify-between space-x-3  rounded-full p-2" onClick={() => navigate('/invoice/new')}>
            <div className='bg-white rounded-full w-8 h-8 flex items-center justify-center'>
              <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z" fill="#7C5DFA" fillRule="nonzero"/></svg>
            </div>
            <div className='text-white font-semibold text-sm flex items-center space-x-1 pr-3'>
              <span>New</span>
              <span className='hidden md:block'>Invoice</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-grow w-full h-[100%] overflow-y-auto space-y-2 bg-slate-50">
        {filteredInvoices.length > 0 ? (
          filteredInvoices.map((invoice) => (
            <button
              key={invoice.id}
              className="flex flex-row items-center justify-between gap-2 p-4 w-full h-30 md:h-20 drop-shadow-sm rounded-lg bg-white hover:bg-gray-100"
              onClick={() => handleInvoiceClick(invoice.id)}
            >
              <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-5' >
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span><span className='text-gray-500'>#</span> {invoice.id}</span>
                </div>
                <div className="flex items-center justify-between text-xs space-x-1 text-gray-500">
                  <span>Due</span>
                  <span>{new Date(invoice.paymentDue).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between text-gray-500">
                  <span>{invoice.clientName}</span>
                </div>
              </div>
              <div className='flex flex-col md:flex-row items-center justify-between gap-5 font-semibold' >
                <div className="flex items-center justify-between">
                  <span>£{invoice.total.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`flex items-center justify-center gap-2 px-2 py-1 rounded ${statusStyles[invoice.status].badge} inline-block`}>
                    <div className={`w-2 h-2 rounded-full ${statusStyles[invoice.status].bullet}`}></div> {/* Bullet point */}
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </div>
                <div className='hidden md:block' >
                  <MdKeyboardArrowRight />
                </div>
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
