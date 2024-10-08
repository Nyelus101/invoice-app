import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import Modal from "./Modal";
import InvoiceForm from "./InvoiceForm";
import svg from '../assets/illustration-empty.svg';


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

const InvoiceList = ({ invoices, addInvoice, updateInvoice }) => {
  const [filter, setFilter] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewMode, setIsNewMode] = useState(false);

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




    // FOR THE MODAL
    // const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        // Only close the modal on resize for small screens
        if (window.innerWidth < 768) {
          setIsModalOpen(false);
        }
      };
    
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    

    const handleClick = () => {
      if (window.innerWidth >= 768) {
        setIsNewMode(true);
        setIsModalOpen(true);
      } else {
        navigate('/invoice/new');
      }
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

  return (
    <div className="w-[80%] lg:w-[50%] h-full flex flex-col mx-auto dark:bg-[#1E2139] dark:text-white ">
      {/* Fixed Header */}
      <div className="mb-2 bg-slate-50 dark:bg-[#1E2139] dark:text-white w-full h-[5%] md:h-[20%] pb-10 md:pb-0 pt-28 md:pt-20 lg:pt-0 flex items-center justify-between">
        <div>
          <div className="font-extrabold text-3xl">Invoices</div>
            <div>
              {/* Display on small screens */}
              <div className="font-semibold text-xs text-gray-500 dark:text-gray-400 md:hidden">
                {`${filteredInvoices.length} invoices`}
              </div>
              {/* Display on medium and large screens */}
              <div className="font-semibold text-xs text-gray-500 dark:text-gray-400 hidden md:block">
                {`There are ${filteredInvoices.length} total invoices`}
              </div>
            </div>

        </div>
        <div className='flex flex-row items-center space-x-3 dark:bg-[#1E2139] dark:text-white'>
          <div className="relative dark:bg-[#1E2139] dark:text-white">
            <button onClick={toggleDropdown} className="p-2 flex items-center gap-2">
              Filter <span className='hidden md:block'>by status</span>
              {isDropdownOpen ? <MdOutlineKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </button>
            {isDropdownOpen && (
              <div className="absolute mx-[-50%] md:mx-[-20%] mt-2 w-48 bg-white dark:bg-[#1E2139] dark:text-white rounded-lg shadow-lg z-20">
                <ul>
                  <li>
                    <button
                      onClick={() => handleFilterChange('all')}
                      className={` w-full text-left px-4 py-2 flex items-center gap-2 ${filter === 'all' ? 'bg-gray-200 dark:bg-[#1E2139] dark:text-white' : 'hover:bg-gray-100 dark:hover:bg-[#252945]'}`}
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
                      className={` w-full text-left px-4 py-2 flex items-center gap-2 ${filter === 'paid' ? 'bg-gray-200 dark:bg-[#1E2139] dark:text-white' : 'hover:bg-gray-100 dark:hover:bg-[#252945]'}`}
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
                      className={` w-full text-left px-4 py-2 flex items-center gap-2 ${filter === 'pending' ? 'bg-gray-200 dark:bg-[#1E2139] dark:text-white' : 'hover:bg-gray-100 dark:hover:bg-[#252945]'}`}
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
                      className={` w-full text-left px-4 py-2 flex items-center gap-2 ${filter === 'draft' ? 'bg-gray-200 dark:bg-[#1E2139] dark:text-white' : 'hover:bg-gray-100 dark:hover:bg-[#252945]'}`}
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

          <div className="bg-custom-purple cursor-pointer flex flex-row items-center justify-between space-x-3  rounded-full p-2" onClick={handleClick}>
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
      <div className="flex-grow w-full h-[100%] overflow-y-auto space-y-2 bg-slate-50 dark:bg-[#1E2139] style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} scroll-hidden">
        {filteredInvoices.length > 0 ? (
          filteredInvoices.map((invoice) => (
            <button
              key={invoice.id}
              className="flex flex-row items-center justify-between gap-2 p-4 w-full h-30 md:h-20 drop-shadow-sm rounded-lg bg-white dark:bg-[#2b2f4e]  hover:bg-gray-100"
              onClick={() => handleInvoiceClick(invoice.id)}
            >
              <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-5' >
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span><span className='text-custom-purple '>#</span> {invoice.id}</span>
                </div>
                <div className="flex items-center justify-between text-xs space-x-1 text-gray-500 dark:text-gray-300">
                  <span>Due</span>
                  <span>{new Date(invoice.paymentDue).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between text-gray-500 dark:text-gray-300">
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
          <div className="flex flex-col items-center gap-10  text-center text-gray-500">
              <div className='pt-10'>
                <img src={svg} alt="No Invoices..." />
              </div>
              <span className='font-bold text-2xl pb-0'>
                There is nothing here
              </span>
              <span className='text-sm'>
                Create an invoice by clicking the <br/> New Invoice and get started
              </span>
          </div>
        )}
      </div>

      {/* New Invoice Modal */}
      <Modal isOpen={isModalOpen} onClose={() => {setIsModalOpen(false), closeModal()}}>
        <InvoiceForm
            invoices={invoices}
            addInvoice={addInvoice}
            updateInvoice={updateInvoice}
            isNewMode={isNewMode}
            onClose={() => {setIsModalOpen(false), closeModal()}}
        />
      </Modal>
    </div>
  );
};

export default InvoiceList;
