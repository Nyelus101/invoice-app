import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RiDeleteBinFill } from 'react-icons/ri';

const InvoiceForm = ({ addInvoice, updateInvoice, invoices, setIsModalOpen, IsModalOpen, isNewMode, onClose }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState({
    id: '',
    description: '',
    createdAt: '',
    paymentDue: '',
    clientName: '',
    clientEmail: '',
    clientAddress: { street: '', city: '', postCode: '', country: '' },
    senderAddress: { street: '', city: '', postCode: '', country: '' },
    items: [],
    total: 0,
    status: 'draft',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      const invoice = invoices.find((invoice) => invoice.id === id);
      if (invoice) {
        setInvoiceData(invoice);
      }
    }
  }, [id, invoices]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('clientAddress') || name.includes('senderAddress')) {
      const addressType = name.split('.')[0];
      const field = name.split('.')[1];
      setInvoiceData({
        ...invoiceData,
        [addressType]: { ...invoiceData[addressType], [field]: value },
      });
    } else {
      setInvoiceData({ ...invoiceData, [name]: value });
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...invoiceData.items];
    newItems[index] = { ...newItems[index], [field]: field === 'price' ? parseFloat(value) : value };
    newItems[index].total = newItems[index].quantity * newItems[index].price;
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const handleAddItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { name: '', quantity: 1, price: 0, total: 0 }],
    });
  };

  const handleRemoveItem = (index) => {
    const newItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const generateInvoiceId = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetters = letters.charAt(Math.floor(Math.random() * letters.length)) +
                          letters.charAt(Math.floor(Math.random() * letters.length));
    const randomNumbers = Math.floor(1000 + Math.random() * 9000).toString();
    return randomLetters + randomNumbers;
  };

  const calculateTotal = () => {
    return invoiceData.items.reduce((acc, item) => acc + item.total, 0);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!invoiceData.senderAddress.street) newErrors.senderStreet = "Sender's street address is required";
    if (!invoiceData.senderAddress.city) newErrors.senderCity = "Sender's city is required";
    if (!invoiceData.senderAddress.postCode) newErrors.senderPostCode = "Sender's post code is required";
    if (!invoiceData.senderAddress.country) newErrors.senderCountry = "Sender's country is required";
    if (!invoiceData.clientName) newErrors.clientName = "Client's name is required";
    if (!invoiceData.clientEmail) newErrors.clientEmail = "Client's email is required";
    if (!invoiceData.clientAddress.street) newErrors.clientStreet = "Client's street address is required";
    if (!invoiceData.clientAddress.city) newErrors.clientCity = "Client's city is required";
    if (!invoiceData.clientAddress.postCode) newErrors.clientPostCode = "Client's post code is required";
    if (!invoiceData.clientAddress.country) newErrors.clientCountry = "Client's country is required";
    if (!invoiceData.createdAt) newErrors.createdAt = "Invoice date is required";
    if (!invoiceData.paymentDue) newErrors.paymentDue = "Payment due date is required";
    if (!invoiceData.description) newErrors.description = "Description is required";
    if (invoiceData.items.length === 0) newErrors.items = "At least one item is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (status = 'pending') => {
    if (status === 'pending' || id) {
      if (!validateForm()) {
        return;
      }
    }
    
    const total = calculateTotal();
    const newInvoiceId = id ? invoiceData.id : generateInvoiceId();
    const updatedInvoice = { ...invoiceData, id: newInvoiceId, total, status };

    if (id) {
      updateInvoice(updatedInvoice);
    } else {
      addInvoice(updatedInvoice);
    }

    navigate('/');
    onClose();
  };

  return (
    <div className='w-full'>
      <div>
        <h1 className="text-black dark:text-gray-100 font-bold text-lg py-5">{id ? `Edit #${id}` : 'New Invoice'}</h1>
      </div>
      <form className="h-[60vh] lg:h-[70vh] overflow-auto remove-scrollbar overflow-y-auto style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} scroll-hidden">
        {/* Bill From Section */}
        <h2 className='text-custom-purple font-bold pb-3'>Bill From</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-3">
            <label className="block mb-2 text-custom-text dark:text-white">Street Address</label>
            <input
              className="w-full rounded-md border-gray-200 dark:border-[#3f425a] border-2 dark:border-1 p-2 font-semibold text-black dark:text-white dark:bg-[#3f425a]"
              type="text"
              name="senderAddress.street"
              value={invoiceData.senderAddress.street}
              onChange={handleInputChange}
            />
            {errors.senderStreet && <p className="text-red-500 text-sm">{errors.senderStreet}</p>}
          </div>
          <div>
            <label className="block mb-2 text-custom-text dark:text-white">City</label>
            <input
              className="w-full rounded-md border-gray-200 dark:border-[#3f425a] border-2 dark:border-1 p-2 font-semibold text-black dark:text-white dark:bg-[#3f425a]"
              type="text"
              name="senderAddress.city"
              value={invoiceData.senderAddress.city}
              onChange={handleInputChange}
            />
            {errors.senderCity && <p className="text-red-500 text-sm">{errors.senderCity}</p>}
          </div>
          <div>
            <label className="block mb-2 text-custom-text dark:text-white">Post Code</label>
            <input
              className="w-full rounded-md border-gray-200 dark:border-[#3f425a] border-2 dark:border-1 p-2 font-semibold text-black dark:text-white dark:bg-[#3f425a]"
              type="text"
              name="senderAddress.postCode"
              value={invoiceData.senderAddress.postCode}
              onChange={handleInputChange}
            />
            {errors.senderPostCode && <p className="text-red-500 text-sm">{errors.senderPostCode}</p>}
          </div>
          <div>
            <label className="block mb-2 text-custom-text dark:text-white">Country</label>
            <input
              className="w-full rounded-md border-gray-200 dark:border-[#3f425a] border-2 dark:border-1 p-2 font-semibold text-black dark:text-white dark:bg-[#3f425a]"
              type="text"
              name="senderAddress.country"
              value={invoiceData.senderAddress.country}
              onChange={handleInputChange}
            />
            {errors.senderCountry && <p className="text-red-500 text-sm">{errors.senderCountry}</p>}
          </div>
        </div>

        {/* Bill To Section */}
        <h2 className="mt-6 text-custom-purple font-bold">Bill To</h2>
        <div className="mt-4">
          <label className="block mb-2 text-custom-text dark:text-white">Client's Name</label>
          <input
            className="w-full rounded-md border-gray-200 dark:border-[#3f425a] border-2 dark:border-1 p-2 font-semibold text-black dark:text-white dark:bg-[#3f425a]"
            type="text"
            name="clientName"
            value={invoiceData.clientName}
            onChange={handleInputChange}
          />
          {errors.clientName && <p className="text-red-500 text-sm">{errors.clientName}</p>}
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-custom-text dark:text-white">Client's Email</label>
          <input
            className="w-full rounded-md border-gray-200 dark:border-[#3f425a] border-2 dark:border-1 p-2 font-semibold text-black dark:text-white dark:bg-[#3f425a]"
            type="email"
            name="clientEmail"
            value={invoiceData.clientEmail}
            onChange={handleInputChange}
          />
          {errors.clientEmail && <p className="text-red-500 text-sm">{errors.clientEmail}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          <div className="md:col-span-3">
            <label className="block mb-2 text-custom-text dark:text-white">Street Address</label>
            <input
              className="w-full rounded-md border-gray-200 dark:border-[#3f425a] border-2 dark:border-1 p-2 font-semibold text-black dark:text-white dark:bg-[#3f425a]"
              type="text"
              name="clientAddress.street"
              value={invoiceData.clientAddress.street}
              onChange={handleInputChange}
            />
            {errors.clientStreet && <p className="text-red-500 text-sm">{errors.clientStreet}</p>}
          </div>
          <div>
            <label className="block mb-2 text-custom-text dark:text-white">City</label>
            <input
              className="w-full rounded-md border-gray-200 dark:border-[#3f425a] border-2 dark:border-1 p-2 font-semibold text-black dark:text-white dark:bg-[#3f425a]"
              type="text"
              name="clientAddress.city"
              value={invoiceData.clientAddress.city}
              onChange={handleInputChange}
            />
            {errors.clientCity && <p className="text-red-500 text-sm">{errors.clientCity}</p>}
          </div>
          <div>
            <label className="block mb-2 text-custom-text dark:text-white">Post Code</label>
            <input
              className="w-full rounded-md border-gray-200 dark:border-[#3f425a] border-2 dark:border-1 p-2 font-semibold text-black dark:text-white dark:bg-[#3f425a]"
              type="text"
              name="clientAddress.postCode"
              value={invoiceData.clientAddress.postCode}
              onChange={handleInputChange}
            />
            {errors.clientPostCode && <p className="text-red-500 text-sm">{errors.clientPostCode}</p>}
          </div>
          <div>
            <label className="block mb-2 text-custom-text dark:text-white">Country</label>
            <input
              className="w-full rounded-md border-gray-200 dark:border-[#3f425a] border-2 dark:border-1 p-2 font-semibold text-black dark:text-white dark:bg-[#3f425a]"
              type="text"
              name="clientAddress.country"
              value={invoiceData.clientAddress.country}
              onChange={handleInputChange}
            />
            {errors.clientCountry && <p className="text-red-500 text-sm">{errors.clientCountry}</p>}
          </div>
        </div>

        {/* Invoice Date, Payment Due Date, and Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          <div>
            <label className="block mb-2 text-custom-text dark:text-white">Invoice Date</label>
            <input
              className="w-full rounded-md border-gray-200 dark:border-[#3f425a] border-2 dark:border-1 p-2 font-semibold text-black dark:text-white dark:bg-[#3f425a]"
              type="date"
              name="createdAt"
              value={invoiceData.createdAt}
              onChange={handleInputChange}
            />
            {errors.createdAt && <p className="text-red-500 text-sm">{errors.createdAt}</p>}
          </div>
          <div>
            <label className="block mb-2 text-custom-text dark:text-white">Payment Terms</label>
            <input
              className="w-full rounded-md border-gray-200 dark:border-[#3f425a] border-2 dark:border-1 p-2 font-semibold text-black dark:text-white dark:bg-[#3f425a]"
              type="date"
              name="paymentDue"
              value={invoiceData.paymentDue}
              onChange={handleInputChange}
            />
            {errors.paymentDue && <p className="text-red-500 text-sm">{errors.paymentDue}</p>}
          </div>
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-custom-text dark:text-white">Project Description</label>
          <input
            className="w-full rounded-md border-gray-200 dark:border-[#3f425a] border-2 dark:border-1 p-2 font-semibold text-black dark:text-white dark:bg-[#3f425a]"
            type="text"
            name="description"
            value={invoiceData.description}
            onChange={handleInputChange}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        {/* Items Section */}
        <h2 className="mt-6 text-custom-purple font-bold">Item List</h2>
        {invoiceData.items.length === 0 && <p className="text-red-500 text-sm">{errors.items}</p>}
        <div className="mt-4">
          {invoiceData.items.map((item, index) => (
            <div key={index} className="w-full grid md:grid-cols-8 grid-cols-6 mb-3 gap-3 ">
              <div className="col-span-8 md:col-span-3">
                <label className="block mb-2 text-custom-text dark:text-white">Item Name</label>
                <input
                  className="w-full rounded-md border-gray-200 dark:border-[#3f425a] border-2 dark:border-1 p-2 font-semibold text-black dark:text-white dark:bg-[#3f425a]"
                  type="text"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                />
              </div>
              <div className='col-span-1 md:col-span-1 '>
                <label className="block mb-2 text-custom-text dark:text-white">Qty.</label>
                <input
                  className="w-full rounded-md border-gray-200 dark:border-[#3f425a] border-2 dark:border-1 p-2 font-semibold text-black dark:text-white dark:bg-[#3f425a]"
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                />
              </div>
              <div className='col-span-3 md:col-span-1 '>
                <label className="block mb-2 text-custom-text dark:text-white">Price</label>
                <input
                  className="w-full rounded-md border-gray-200 dark:border-[#3f425a] border-2 dark:border-1 p-2 font-semibold text-black dark:text-white dark:bg-[#3f425a]"
                  type="number"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                />
              </div>
              <div className='col-span-3 md:col-span-2 '>
                <label className="block mb-2 text-custom-text dark:text-white">Total</label>
                <input
                  className="w-full bg-gray-50 p-2 font-semibold dark:border-[#3f425a] border-2 dark:border-1 text-black dark:text-white dark:bg-[#3f425a]"
                  type="number"
                  value={item.total.toFixed(2)}
                  readOnly
                />
              </div>
              <div className="col-span-1 flex items-center justify-evenly">
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="text-custom-text pt-7"
                >
                  <RiDeleteBinFill size={24} />
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddItem}
            className="w-full bg-custom-bg dark:bg-[#3f425a] p-2 rounded-full text-custom-text dark:text-gray-300 font-bold text-sm"
          >
            + Add New Item
          </button>
        </div>
      </form>

      {/* Form Actions */}
      <div className="flex justify-between mt-5">
          {id ? (
          // Edit Form Buttons
          <div className='flex gap-3 justify-end w-[100%]'>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-gray-200 dark:bg-[#3f425a] text-gray-600 dark:text-gray-300 font-semibold text-sm px-6 py-2 rounded-full"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleSave()}
              className="bg-custom-purple text-white font-semibold text-sm px-6 py-2 rounded-full"
            >
              Save Changes
            </button>
          </div>
        ) : (
          // New Invoice Form Buttons
          <div className="flex gap-3 items-center justify-between  w-full">
            <button
              type="button"
              onClick={() => {navigate('/'), onClose()}}
              className="bg-gray-200 text-custom-text font-semibold text-sm px-6 py-2 rounded-full"
            >
              Discard
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleSave('draft')}
                className="bg-black dark:bg-[#3f425a] text-custom-purple dark:text-gray-300 font-semibold text-sm px-6 py-2 rounded-full"
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={() => handleSave('pending')}
                className="bg-custom-purple text-white font-semibold text-sm px-6 py-2 rounded-full"
              >
                Save & Send
              </button>
            </div>
          </div>
        )}
        </div>
    </div>
  );
};

export default InvoiceForm;

