import React, { useState, useEffect  } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdKeyboardArrowLeft } from "react-icons/md";
import ConfirmationModal from './ConfirmationModal'; // Import the modal component
import Modal from "./Modal";
import InvoiceForm from './InvoiceForm';

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
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal for edit button
  const [isEditMode, setIsEditMode] = useState(false); // State to handle edit mode

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  const handleDelete = () => {
    setIsConfirmModalOpen(true); // Show modal when delete is clicked
  };

  const confirmDelete = () => {
    deleteInvoice(invoice.id);
    setIsConfirmModalOpen(false); // Close modal
    navigate('/');
  };

  const handleCancelDelete = () => {
    setIsConfirmModalOpen(false); // Close modal without deleting
  };

  const handleMarkAsPaid = () => {
    updateInvoice({ ...invoice, status: 'paid' });
    navigate('/');
  };


  const handleEdit = () => {
    if (window.innerWidth >= 768) {
        setIsEditMode(true); // Set edit mode
        setIsModalOpen(true); // Open modal on medium/large screens
    } else {
      navigate(`/invoice/edit/${invoice.id}`); // Navigate to the edit page on small screens
    }
  };

  return (
    <div className='w-[80%] lg:w-[50%] h-full flex flex-col mx-auto dark:bg-[#1E2139] dark:text-white'>
      <div className='flex flex-row items-center space-x-4 cursor-pointer mb-3 pt-28 md:pt-32 lg:pt-10' onClick={() => navigate('/')}>
        <div><MdKeyboardArrowLeft /></div>
        <button className="font-medium" >
            Go back
        </button>
      </div> 
      {/* FOR ONLY SMALL SCREENS - STATUS BAR */}
      <div className='small-screens md:hidden bg-white dark:bg-[#252945] dark:text-white rounded p-5 flex  mb-4'>
        <div className='flex flex-row items-center justify-between gap-5 w-full'>
          <div className='text-gray-600 dark:text-white font-semibold text-sm'>Status</div>
          <div className="flex items-center justify-between">
            <span className={`flex items-center justify-center gap-2 px-2 py-1 rounded ${statusStyles[invoice.status].badge} inline-block`}>
              <div className={`w-2 h-2 rounded-full ${statusStyles[invoice.status].bullet}`}></div>
              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
            </span>
          </div>
        </div>
      </div>
    {/* FOR MEDIUM AND LARGE SCREENS - STATUS BAR */}
      <div className="large-screens bg-white dark:bg-[#252945] rounded p-5 hidden md:flex items-center justify-between mb-4">
        <div className='flex flex-row items-center gap-5'>
          <div className='text-gray-600 dark:text-white font-semibold text-sm'>Status</div>
          <div className="flex items-center justify-between">
            <span className={`flex items-center justify-center gap-2 px-2 py-1 rounded ${statusStyles[invoice.status].badge} inline-block`}>
              <div className={`w-2 h-2 rounded-full ${statusStyles[invoice.status].bullet}`}></div>
              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
            </span>
          </div>
        </div>
        <div className="hidden md:flex gap-2">
          <button className="p-2 px-5 bg-gray-200 dark:bg-[#32354b] text-gray-800 dark:text-white text-sm rounded-full font-semibold"
            onClick={handleEdit}>Edit</button>
          <button className="p-2 px-5 bg-red-500 text-white text-sm rounded-full font-semibold"
            onClick={handleDelete}>Delete</button>
          <button className="p-2 px-5 bg-custom-purple text-white text-sm rounded-full font-semibold"
            onClick={handleMarkAsPaid}>Mark as Paid</button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#252945] p-8 rounded shadow-md w-full h-[80%] overflow-y-auto style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} scroll-hidden">
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between pb-5'>
          <div className='flex flex-col justify-start pb-5 md:pb-0'>
            <span className="text-sm font-bold mb-2 md:mb-4">#{invoice.id}</span>
            <span>{invoice.description}</span>
          </div>
          <div className='flex flex-col justify-end text-left md:text-right text-sm font-medium text-gray-600 dark:text-gray-300'>
            <span>{invoice.senderAddress.street}</span>
            <span>{invoice.senderAddress.city}</span>
            <span>{invoice.senderAddress.postCode}</span>
            <span>{invoice.senderAddress.country}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 items-start dark:text-gray-100">
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
            <div className="flex flex-col text-left text-sm text-custom-text dark:text-gray-300">
              <span>{invoice.clientAddress.street}</span>
              <span>{invoice.clientAddress.city}</span>
              <span>{invoice.clientAddress.postCode}</span>
              <span>{invoice.clientAddress.country}</span>
            </div>
          </div>

          <div className="hidden md:flex flex-col">
            <span className="text-custom-text text-sm pb-3">Sent to</span>
            <span className='font-semibold break-all '>{invoice.clientEmail} </span>
          </div>
        </div>

        <div className="flex md:hidden flex-col py-5">
          <span className="text-custom-text text-sm pb-3">Sent to</span>
          <span className='font-semibold break-all '>{invoice.clientEmail} </span>
        </div>

        <div className='bg-slate-100 dark:bg-[#2f334e] rounded-lg'>
          <div className='w-full px-5 md:px-10 py-5'>
            <table className="w-full">
              <thead>
                <tr className="flex justify-between  pb-5 w-full text-gray-500 dark:text-gray-300 text-sm font-semibold">
                  <th className="w-2/5 truncate text-left">Item Name</th>
                  <th className="hidden md:block w-1/5 break-all text-right">QTY</th>
                  <th className="hidden md:block w-1/5 break-all text-right">Price</th>
                  <th className="w-1/5 break-all text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={index} className="flex justify-between w-full">
                    <td className="w-2/5 break-all font-bold text-sm text-left">{item.name}</td>
                    <td className="hidden md:block w-1/5 break-all text-gray-500 dark:text-gray-300 text-sm text-right">{item.quantity}</td>
                    <td className="hidden md:block w-1/5 break-all text-gray-500 dark:text-gray-300 text-sm text-right">£{item.price.toFixed(2)}</td>
                    <td className="w-1/5 break-all font-bold text-sm text-right">£{item.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-white bg-slate-900 rounded-b-lg">
            <div className="px-5 md:px-10 py-5 flex flex-row items-center justify-between">
              <div className="text-lg">Amount</div>
              <div className="text-lg font-bold">
                £{invoice.total.toFixed(2)}
              </div>
            </div>
          </div>
        </div>  
      </div>

      {/* Buttons for small screens */}
      <div className="md:hidden flex gap-2 pb-8 pt-5 w-full justify-between items-center sticky">
        <button className="p-2 px-5 bg-gray-200 dark:bg-[#32354b] text-gray-800 dark:text-white text-sm rounded-full font-semibold"
          onClick={() => navigate(`/invoice/edit/${invoice.id}`)}>Edit</button>
        <button className="p-2 px-5 bg-red-500 text-white text-sm rounded-full font-semibold"
          onClick={handleDelete}>Delete</button>
        <button className="p-2 px-5 bg-custom-purple text-white text-sm rounded-full font-semibold"
          onClick={handleMarkAsPaid}>Mark as Paid</button>
      </div>

      {/* Confirmation Modal for Deletion */}
      <ConfirmationModal
        show={isConfirmModalOpen}
        onConfirm={confirmDelete}
        onCancel={handleCancelDelete}
        invoiceId={invoice.id}
      />

      {/* Edit Invoice Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <InvoiceForm
            invoices={invoices}
            deleteInvoice={deleteInvoice}
            updateInvoice={updateInvoice}
            onClose={() => setIsModalOpen(false)}
        />
        {/* Form component or code */}
      </Modal>
    </div>
  );
};

export default InvoiceDetails;

