import React from 'react';
import Header from './components/Header';
import InvoiceList from './components/InvoiceList';

const App = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <Header />
      <div className="flex-grow bg-slate-50 flex items-center justify-center">
        <div className="bg-slate-200 w-[85%] lg:w-[50%] h-[90%] flex flex-col items-center">
          <div className="bg-slate-50 w-full h-[50px] flex items-center justify-center">
            Invoice
          </div>
          <div className="bg-slate-50 w-full h-[calc(100%-50px)] flex items-center">
            <div className="w-full h-full overflow-y-auto flex flex-col items-center gap-4">
              <InvoiceList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
