import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import InvoiceList from './components/InvoiceList';
import InvoiceDetails from './components/InvoiceDetails';
import InvoiceForm from './components/InvoiceForm';
import data from './assets/data.json';

const App = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const storedInvoices = JSON.parse(localStorage.getItem('invoices'));
    if (storedInvoices) {
      setInvoices(storedInvoices);
    } else {
      setInvoices(data); // Load initial data from JSON file
      localStorage.setItem('invoices', JSON.stringify(data));
    }
  }, []);

  const saveInvoicesToLocalStorage = (invoices) => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
  };

  const addInvoice = (newInvoice) => {
    const updatedInvoices = [...invoices, newInvoice];
    setInvoices(updatedInvoices);
    saveInvoicesToLocalStorage(updatedInvoices);
  };

  const updateInvoice = (updatedInvoice) => {
    const updatedInvoices = invoices.map((invoice) =>
      invoice.id === updatedInvoice.id ? updatedInvoice : invoice
    );
    setInvoices(updatedInvoices);
    saveInvoicesToLocalStorage(updatedInvoices);
  };

  const deleteInvoice = (id) => {
    const updatedInvoices = invoices.filter((invoice) => invoice.id !== id);
    setInvoices(updatedInvoices);
    saveInvoicesToLocalStorage(updatedInvoices);
  };

  return (
    <Router>
      <div className="flex flex-col lg:flex-row h-screen">
        <Header />
        <div className="flex-grow bg-slate-50 flex items-center justify-center">
          <div className="bg-slate-800 w-[85%] lg:w-[50%] h-[90%] flex flex-col items-center">
            <div className="bg-slate-50 w-full h-[100%] flex items-center">
              <div className="w-full h-full  flex flex-col items-center gap-4">
                <Routes>
                  <Route
                    path="/"
                    element={<InvoiceList invoices={invoices} />}
                  />
                  <Route
                    path="/invoice/:id"
                    element={
                      <InvoiceDetails
                        invoices={invoices}
                        deleteInvoice={deleteInvoice}
                        updateInvoice={updateInvoice}
                      />
                    }
                  />
                  <Route
                    path="/invoice/new"
                    element={<InvoiceForm addInvoice={addInvoice} />}
                  />
                  <Route
                    path="/invoice/edit/:id"
                    element={
                      <InvoiceForm
                        invoices={invoices}
                        updateInvoice={updateInvoice}
                      />
                    }
                  />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;





// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
// import InvoiceList from './components/InvoiceList';
// import InvoiceDetails from './components/InvoiceDetails';

// const App = () => {
//   return (
//     <Router>
//       <div className="flex flex-col lg:flex-row h-screen">
//         <Header />
//         <div className="flex-grow bg-slate-50 flex items-center justify-center">
//           <div className="bg-slate-200 w-[85%] lg:w-[50%] h-[90%] flex flex-col items-center">
//             <div className='bg-slate-50 w-full h-[calc(100%-50px)] flex items-center'>
//               <div className='w-full h-full overflow-y-auto flex flex-col items-center gap-4' >
//                 <Routes>
//                 <Route path="/" element={<InvoiceList />} />
//                 <Route path="/invoice/:id" element={<InvoiceDetails />} />
//                 </Routes>
//               </div>
//             </div>
            
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;


