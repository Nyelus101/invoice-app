import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RiDeleteBinFill } from 'react-icons/ri';

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

  const handleSave = (status = 'pending') => {
    const total = calculateTotal();
    const newInvoiceId = id ? invoiceData.id : generateInvoiceId();
    const updatedInvoice = { ...invoiceData, id: newInvoiceId, total, status };

    if (id) {
      updateInvoice(updatedInvoice);
    } else {
      addInvoice(updatedInvoice);
    }

    navigate('/');
  };

  return (
    <div>
      <div>
        <h1>{id ? `Edit Invoice #${id}` : 'Create Invoice'}</h1>
      </div>
      <form className="h-[70vh] overflow-auto remove-scrollbar">
        <h2>Bill From</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
          <div className="md:col-span-3">
            <label className="block mb-2">Street Address</label>
            <input
              className="w-full"
              type="text"
              name="senderAddress.street"
              value={invoiceData.senderAddress.street}
              onChange={handleInputChange}
            />
          </div>
          <div className="md:col-span-1">
            <label className="block mb-2">City</label>
            <input
              className="w-full"
              type="text"
              name="senderAddress.city"
              value={invoiceData.senderAddress.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="md:col-span-1">
            <label className="block mb-2">Post Code</label>
            <input
              className="w-full"
              type="text"
              name="senderAddress.postCode"
              value={invoiceData.senderAddress.postCode}
              onChange={handleInputChange}
            />
          </div>
          <div className="md:col-span-1">
            <label className="block mb-2">Country</label>
            <input
              className="w-full"
              type="text"
              name="senderAddress.country"
              value={invoiceData.senderAddress.country}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <h2 className="mt-4">Bill To</h2>
        <div className="mt-4">
          <label className="block mb-2">Client's Name</label>
          <input
            className="w-full p-3"
            type="text"
            name="clientName"
            value={invoiceData.clientName}
            onChange={handleInputChange}
          />
        </div>
        <div className="my-4">
          <label className="block mb-2">Client's Email</label>
          <input
            className="w-full p-3"
            type="email"
            name="clientEmail"
            placeholder="e.g. email@example.com"
            value={invoiceData.clientEmail}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
          <div className="md:col-span-3">
            <label className="block mb-2">Street Address</label>
            <input
              className="w-full p-3"
              type="text"
              name="clientAddress.street"
              value={invoiceData.clientAddress.street}
              onChange={handleInputChange}
            />
          </div>
          <div className="md:col-span-1">
            <label className="block mb-2">City</label>
            <input
              className="w-full p-3"
              type="text"
              name="clientAddress.city"
              value={invoiceData.clientAddress.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="md:col-span-1">
            <label className="block mb-2">Post Code</label>
            <input
              className="w-full p-3"
              type="text"
              name="clientAddress.postCode"
              value={invoiceData.clientAddress.postCode}
              onChange={handleInputChange}
            />
          </div>
          <div className="md:col-span-1">
            <label className="block mb-2">Country</label>
            <input
              className="w-full p-3"
              type="text"
              name="clientAddress.country"
              value={invoiceData.clientAddress.country}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="w-full flex justify-between mt-4">
          <div className="w-[45%]">
            <label className="block mb-2">Invoice Date</label>
            <input
              className="w-full p-3"
              type="date"
              name="createdAt"
              value={invoiceData.createdAt}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-[45%]">
            <label className="block mb-2">Payment Due Date</label>
            <input
              className="w-full p-3"
              type="date"
              name="paymentDue"
              value={invoiceData.paymentDue}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="w-full mt-5">
          <label className="block mb-2">Description</label>
          <input
            className="w-full p-3"
            type="text"
            name="description"
            placeholder="e.g. Graphic Design Service"
            value={invoiceData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <h3>Item List</h3>
          <div>
            {invoiceData.items.map((item, index) => (
              <div key={index} className="grid md:grid-cols-8 grid-cols-6 mb-3 gap-3">
                <div className="col-span-3">
                  <label className="block">Item Name</label>
                  <input
                    className="w-full"
                    type="text"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block">Qty.</label>
                  <input
                    className="w-full"
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block">Price</label>
                  <input
                    className="w-full"
                    type="number"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block">Total</label>
                  <input className="w-full" type="text" value={item.total.toFixed(2)} readOnly />
                </div>
                <div className="flex items-end justify-center">
                  <button type="button" onClick={() => handleRemoveItem(index)} className="text-red-500">
                    <RiDeleteBinFill />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={handleAddItem} className="bg-blue-500 text-white p-2 rounded-md">
            + Add New Item
          </button>
        </div>
        <div className="flex justify-between mt-5">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-200 text-gray-600 px-6 py-2 rounded-md"
          >
            Cancel
          </button>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => handleSave('draft')}
              className="bg-gray-200 text-gray-600 px-6 py-2 rounded-md"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={() => handleSave('pending')}
              className="bg-blue-500 text-white px-6 py-2 rounded-md"
            >
              Save & Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InvoiceForm;













// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// const InvoiceForm = ({ addInvoice, updateInvoice, invoices }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [invoiceData, setInvoiceData] = useState({
//     id: '',
//     description: '',
//     createdAt: '',
//     paymentDue: '',
//     clientName: '',
//     clientEmail: '',
//     clientAddress: { street: '', city: '', postCode: '', country: '' },
//     senderAddress: { street: '', city: '', postCode: '', country: '' },
//     items: [],
//     total: 0,
//     status: 'draft',
//   });

//   useEffect(() => {
//     if (id) {
//       const invoice = invoices.find((invoice) => invoice.id === id);
//       if (invoice) {
//         setInvoiceData(invoice);
//       }
//     }
//   }, [id, invoices]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setInvoiceData({ ...invoiceData, [name]: value });
//   };

//   const handleItemChange = (index, field, value) => {
//     const newItems = [...invoiceData.items];
//     newItems[index] = { ...newItems[index], [field]: field === 'price' ? parseFloat(value) : value };
//     newItems[index].total = newItems[index].quantity * newItems[index].price;
//     setInvoiceData({ ...invoiceData, items: newItems });
//   };
  

//   const handleAddItem = () => {
//     setInvoiceData({
//       ...invoiceData,
//       items: [...invoiceData.items, { name: '', quantity: 1, price: 0, total: 0 }],
//     });
//   };

//   const handleRemoveItem = (index) => {
//     const newItems = invoiceData.items.filter((_, i) => i !== index);
//     setInvoiceData({ ...invoiceData, items: newItems });
//   };

//   const generateInvoiceId = () => {
//     const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     const randomLetters = letters.charAt(Math.floor(Math.random() * letters.length)) +
//                           letters.charAt(Math.floor(Math.random() * letters.length));
//     const randomNumbers = Math.floor(1000 + Math.random() * 9000).toString();
//     return randomLetters + randomNumbers;
//   };

//   const calculateTotal = () => {
//     return invoiceData.items.reduce((acc, item) => acc + item.total, 0);
//   };

//   const handleSave = () => {
//     const total = calculateTotal();
//     const newInvoiceId = id ? invoiceData.id : generateInvoiceId();
//     const updatedInvoice = { ...invoiceData, id: newInvoiceId, total };

//     if (id) {
//       updateInvoice(updatedInvoice);
//     } else {
//       addInvoice(updatedInvoice);
//     }

//     navigate('/');
//   };

//   return (
//     <div className="w-full p-4">
//       <h2 className="text-xl font-bold mb-4">
//         {id ? `Edit Invoice #${id}` : 'Create New Invoice'}
//       </h2>
//       <form className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium">Description</label>
//           <input
//             type="text"
//             name="description"
//             value={invoiceData.description}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Client Name</label>
//           <input
//             type="text"
//             name="clientName"
//             value={invoiceData.clientName}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Client Email</label>
//           <input
//             type="email"
//             name="clientEmail"
//             value={invoiceData.clientEmail}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Payment Due</label>
//           <input
//             type="date"
//             name="paymentDue"
//             value={invoiceData.paymentDue}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div className="mt-4">
//           <h3 className="text-lg font-bold">Items</h3>
//           {invoiceData.items.map((item, index) => (
//             <div key={index} className="space-y-2 mt-2">
//               <input
//                 type="text"
//                 placeholder="Item Name"
//                 value={item.name}
//                 onChange={(e) => handleItemChange(index, 'name', e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//               <input
//                 type="number"
//                 placeholder="Quantity"
//                 value={item.quantity}
//                 onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//               <input
//                 type="number"
//                 placeholder="Price"
//                 value={item.price}
//                 onChange={(e) => handleItemChange(index, 'price', e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//               <button
//                 type="button"
//                 className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
//                 onClick={() => handleRemoveItem(index)}
//               >
//                 Remove Item
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             className="p-2 bg-green-500 text-white rounded hover:bg-green-600 mt-2"
//             onClick={handleAddItem}
//           >
//             Add Item
//           </button>
//         </div>
//         <div className="mt-4">
//           <h3 className="text-lg font-bold">Total: ${calculateTotal().toFixed(2)}</h3>
//         </div>
//         <div className="flex gap-4">
//           <button
//             type="button"
//             className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             onClick={handleSave}
//           >
//             Save
//           </button>
//           <button
//             type="button"
//             className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//             onClick={() => navigate('/')}
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default InvoiceForm;

