import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const InvoiceForm = ({ addInvoice, updateInvoice, invoices }) => {
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
    setInvoiceData({ ...invoiceData, [name]: value });
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

  const handleSave = () => {
    const total = calculateTotal();
    const newInvoiceId = id ? invoiceData.id : generateInvoiceId();
    const updatedInvoice = { ...invoiceData, id: newInvoiceId, total };

    if (id) {
      updateInvoice(updatedInvoice);
    } else {
      addInvoice(updatedInvoice);
    }

    navigate('/');
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-bold mb-4">
        {id ? `Edit Invoice #${id}` : 'Create New Invoice'}
      </h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Description</label>
          <input
            type="text"
            name="description"
            value={invoiceData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Client Name</label>
          <input
            type="text"
            name="clientName"
            value={invoiceData.clientName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Client Email</label>
          <input
            type="email"
            name="clientEmail"
            value={invoiceData.clientEmail}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Payment Due</label>
          <input
            type="date"
            name="paymentDue"
            value={invoiceData.paymentDue}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold">Items</h3>
          {invoiceData.items.map((item, index) => (
            <div key={index} className="space-y-2 mt-2">
              <input
                type="text"
                placeholder="Item Name"
                value={item.name}
                onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleRemoveItem(index)}
              >
                Remove Item
              </button>
            </div>
          ))}
          <button
            type="button"
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600 mt-2"
            onClick={handleAddItem}
          >
            Add Item
          </button>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-bold">Total: ${calculateTotal().toFixed(2)}</h3>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            type="button"
            className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvoiceForm;

