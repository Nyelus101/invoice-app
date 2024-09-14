
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
        <h1 className="text-black font-bold text-lg py-5">{id ? `Edit #${id}` : 'Create Invoice'}</h1>
      </div>
      <form className="h-[60vh] lg:h-[70vh] overflow-auto remove-scrollbar">
        <h2 className='text-custom-purple font-bold pb-3'>Bill From</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
          <div className="md:col-span-3">
            <label className="block mb-2 text-custom-text">Street Address</label>
            <input
              className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
              type="text"
              name="senderAddress.street"
              value={invoiceData.senderAddress.street}
              onChange={handleInputChange}
            />
          </div>
          <div className="md:col-span-1">
            <label className="block mb-2 text-custom-text">City</label>
            <input
              className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
              type="text"
              name="senderAddress.city"
              value={invoiceData.senderAddress.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="md:col-span-1">
            <label className="block mb-2 text-custom-text">Post Code</label>
            <input
              className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
              type="text"
              name="senderAddress.postCode"
              value={invoiceData.senderAddress.postCode}
              onChange={handleInputChange}
            />
          </div>
          <div className="md:col-span-1">
            <label className="block mb-2 text-custom-text">Country</label>
            <input
              className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
              type="text"
              name="senderAddress.country"
              value={invoiceData.senderAddress.country}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <h2 className="mt-4 text-custom-purple font-bold">Bill To</h2>
        <div className="mt-4">
          <label className="block mb-2 text-custom-text">Client's Name</label>
          <input
            className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
            type="text"
            name="clientName"
            value={invoiceData.clientName}
            onChange={handleInputChange}
          />
        </div>
        <div className="my-4">
          <label className="block mb-2 text-custom-text">Client's Email</label>
          <input
            className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
            type="email"
            name="clientEmail"
            placeholder="e.g. email@example.com"
            value={invoiceData.clientEmail}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
          <div className="md:col-span-3">
            <label className="block mb-2 text-custom-text">Street Address</label>
            <input
              className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
              type="text"
              name="clientAddress.street"
              value={invoiceData.clientAddress.street}
              onChange={handleInputChange}
            />
          </div>
          <div className="md:col-span-1">
            <label className="block mb-2 text-custom-text">City</label>
            <input
              className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
              type="text"
              name="clientAddress.city"
              value={invoiceData.clientAddress.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="md:col-span-1">
            <label className="block mb-2 text-custom-text">Post Code</label>
            <input
              className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
              type="text"
              name="clientAddress.postCode"
              value={invoiceData.clientAddress.postCode}
              onChange={handleInputChange}
            />
          </div>
          <div className="md:col-span-1">
            <label className="block mb-2 text-custom-text">Country</label>
            <input
              className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
              type="text"
              name="clientAddress.country"
              value={invoiceData.clientAddress.country}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="w-full flex justify-between mt-4">
          <div className="w-[45%]">
            <label className="block mb-2 text-custom-text">Invoice Date</label>
            <input
              className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
              type="date"
              name="createdAt"
              value={invoiceData.createdAt}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-[45%]">
            <label className="block mb-2 text-custom-text">Payment Due Date</label>
            <input
              className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
              type="date"
              name="paymentDue"
              value={invoiceData.paymentDue}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="w-full mt-5">
          <label className="block mb-2 text-custom-text">Description</label>
          <input
            className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
            type="text"
            name="description"
            placeholder="e.g. Graphic Design Service"
            value={invoiceData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <h3 className='font-bold py-5 text-custom-text'>Item List</h3>
          <div className='pb-5'>
            {invoiceData.items.map((item, index) => (
              <div key={index} className="grid md:grid-cols-8 grid-cols-6 mb-3 gap-3 ">
                <div className="col-span-3">
                  <label className="block text-custom-text">Item Name</label>
                  <input
                    className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
                    type="text"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                  />
                </div>
                {/* THIS IS WHERE TO BEGIN */}
                <div className='flex flex-row justify-between w-full'>
                  <div>
                    <label className="block text-custom-text">Qty.</label>
                    <input
                      className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-custom-text">Price</label>
                    <input
                      className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
                      type="number"
                      value={item.price}
                      onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-custom-text">Total</label>
                    <input className="w-full p-2 font-semibold text-black bg-gray-50" type="text" value={item.total.toFixed(2)} readOnly />
                  </div>
                  <div className="flex items-center  justify-center">
                    <button type="button" onClick={() => handleRemoveItem(index)} className="text-custom-text">
                      <RiDeleteBinFill />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={handleAddItem} className="w-full bg-custom-bg p-2 rounded-full text-custom-text font-bold text-sm">
            + Add New Item
          </button>
        </div>
        
      </form>
      <div className="flex justify-between mt-5">
          {/* <button
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
          </div> */}
          {id ? (
          // Edit Form Buttons
          <div className='flex gap-3 justify-end w-[100%]'>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-gray-200 text-gray-600 font-semibold text-sm px-6 py-2 rounded-full"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleSave('pending')}
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
              onClick={() => navigate('/')}
              className="bg-gray-200 text-custom-text font-semibold text-sm px-6 py-2 rounded-full"
            >
              Discard
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleSave('draft')}
                className="bg-black text-custom-purple font-semibold text-sm px-6 py-2 rounded-full"
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
























// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { RiDeleteBinFill } from 'react-icons/ri';

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
//     if (name.includes('clientAddress') || name.includes('senderAddress')) {
//       const addressType = name.split('.')[0];
//       const field = name.split('.')[1];
//       setInvoiceData({
//         ...invoiceData,
//         [addressType]: { ...invoiceData[addressType], [field]: value },
//       });
//     } else {
//       setInvoiceData({ ...invoiceData, [name]: value });
//     }
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

//   const handleSave = (status = 'pending') => {
//     const total = calculateTotal();
//     const newInvoiceId = id ? invoiceData.id : generateInvoiceId();
//     const updatedInvoice = { ...invoiceData, id: newInvoiceId, total, status };

//     if (id) {
//       updateInvoice(updatedInvoice);
//     } else {
//       addInvoice(updatedInvoice);
//     }

//     navigate('/');
//   };

//   return (
//     <div>
//       <div>
//         <h1 className="text-black font-bold text-lg py-5">{id ? `Edit #${id}` : 'Create Invoice'}</h1>
//       </div>
//       <form className="h-[60vh] lg:h-[70vh] overflow-auto remove-scrollbar">
//         <h2 className='text-custom-purple font-bold pb-3'>Bill From</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
//           <div className="md:col-span-3">
//             <label className="block mb-2 text-custom-text">Street Address</label>
//             <input
//               className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
//               type="text"
//               name="senderAddress.street"
//               value={invoiceData.senderAddress.street}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="md:col-span-1">
//             <label className="block mb-2 text-custom-text">City</label>
//             <input
//               className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
//               type="text"
//               name="senderAddress.city"
//               value={invoiceData.senderAddress.city}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="md:col-span-1">
//             <label className="block mb-2 text-custom-text">Post Code</label>
//             <input
//               className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
//               type="text"
//               name="senderAddress.postCode"
//               value={invoiceData.senderAddress.postCode}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="md:col-span-1">
//             <label className="block mb-2 text-custom-text">Country</label>
//             <input
//               className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
//               type="text"
//               name="senderAddress.country"
//               value={invoiceData.senderAddress.country}
//               onChange={handleInputChange}
//             />
//           </div>
//         </div>
//         <h2 className="mt-4 text-custom-purple font-bold">Bill To</h2>
//         <div className="mt-4">
//           <label className="block mb-2 text-custom-text">Client's Name</label>
//           <input
//             className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
//             type="text"
//             name="clientName"
//             value={invoiceData.clientName}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="my-4">
//           <label className="block mb-2 text-custom-text">Client's Email</label>
//           <input
//             className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
//             type="email"
//             name="clientEmail"
//             placeholder="e.g. email@example.com"
//             value={invoiceData.clientEmail}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
//           <div className="md:col-span-3">
//             <label className="block mb-2 text-custom-text">Street Address</label>
//             <input
//               className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
//               type="text"
//               name="clientAddress.street"
//               value={invoiceData.clientAddress.street}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="md:col-span-1">
//             <label className="block mb-2 text-custom-text">City</label>
//             <input
//               className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
//               type="text"
//               name="clientAddress.city"
//               value={invoiceData.clientAddress.city}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="md:col-span-1">
//             <label className="block mb-2 text-custom-text">Post Code</label>
//             <input
//               className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
//               type="text"
//               name="clientAddress.postCode"
//               value={invoiceData.clientAddress.postCode}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="md:col-span-1">
//             <label className="block mb-2 text-custom-text">Country</label>
//             <input
//               className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
//               type="text"
//               name="clientAddress.country"
//               value={invoiceData.clientAddress.country}
//               onChange={handleInputChange}
//             />
//           </div>
//         </div>
//         <div className="w-full flex justify-between mt-4">
//           <div className="w-[45%]">
//             <label className="block mb-2 text-custom-text">Invoice Date</label>
//             <input
//               className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
//               type="date"
//               name="createdAt"
//               value={invoiceData.createdAt}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="w-[45%]">
//             <label className="block mb-2 text-custom-text">Payment Due Date</label>
//             <input
//               className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
//               type="date"
//               name="paymentDue"
//               value={invoiceData.paymentDue}
//               onChange={handleInputChange}
//             />
//           </div>
//         </div>
//         <div className="w-full mt-5">
//           <label className="block mb-2 text-custom-text">Description</label>
//           <input
//             className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
//             type="text"
//             name="description"
//             placeholder="e.g. Graphic Design Service"
//             value={invoiceData.description}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <h3 className='font-bold py-5 text-custom-text'>Item List</h3>
//           <div className='pb-5'>
//             {invoiceData.items.map((item, index) => (
//               <div key={index} className="grid md:grid-cols-8 grid-cols-6 mb-3 gap-3 ">
//                 <div className="col-span-3">
//                   <label className="block text-custom-text">Item Name</label>
//                   <input
//                     className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
//                     type="text"
//                     value={item.name}
//                     onChange={(e) => handleItemChange(index, 'name', e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-custom-text">Qty.</label>
//                   <input
//                     className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
//                     type="number"
//                     value={item.quantity}
//                     onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
//                   />
//                 </div>
//                 <div className="col-span-2">
//                   <label className="block text-custom-text">Price</label>
//                   <input
//                     className="w-full rounded-md border-gray-200 border-2 p-2 font-semibold text-black"
//                     type="number"
//                     value={item.price}
//                     onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-custom-text">Total</label>
//                   <input className="w-full p-2 font-semibold text-black bg-gray-50" type="text" value={item.total.toFixed(2)} readOnly />
//                 </div>
//                 <div className="flex items-center  justify-center">
//                   <button type="button" onClick={() => handleRemoveItem(index)} className="text-custom-text">
//                     <RiDeleteBinFill />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <button type="button" onClick={handleAddItem} className="w-full bg-custom-bg p-2 rounded-full text-custom-text font-bold text-sm">
//             + Add New Item
//           </button>
//         </div>
        
//       </form>
//       <div className="flex justify-between mt-5">
//           <button
//             type="button"
//             onClick={() => navigate('/')}
//             className="bg-gray-200 text-gray-600 px-6 py-2 rounded-md"
//           >
//             Cancel
//           </button>
//           <div className="flex gap-3">
//             <button
//               type="button"
//               onClick={() => handleSave('draft')}
//               className="bg-gray-200 text-gray-600 px-6 py-2 rounded-md"
//             >
//               Save as Draft
//             </button>
//             <button
//               type="button"
//               onClick={() => handleSave('pending')}
//               className="bg-blue-500 text-white px-6 py-2 rounded-md"
//             >
//               Save & Send
//             </button>
//           </div>
//         </div>
//     </div>
//   );
// };

// export default InvoiceForm;











