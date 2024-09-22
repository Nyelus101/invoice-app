import React from 'react';

const ConfirmationModal = ({ show, invoiceId, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 h-screen bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#3f466d] p-12 rounded-lg shadow-md w-[90%] md:w-[500px]">
        <div className='w-full'>
            <h2 className="text-left font-bold text-lg mb-4">Confirm Deletion</h2>
            <p className="text-sm text-gray-700 dark:text-gray-100 mb-6">
            Are you sure you want to delete invoice #{invoiceId}? This action cannot be undone.
            </p>
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="w-[30%] py-2 bg-gray-200 dark:bg-[#3f425a] text-gray-800 dark:text-gray-200 rounded-full font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="w-[30%] py-2 bg-red-500 text-white rounded-full font-semibold"
          >
           Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
