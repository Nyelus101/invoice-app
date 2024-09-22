import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 lg:left-20  w-full h-full bg-black bg-opacity-50 z-40">
      <div className="w-[80%] lg:w-[50%] h-full pt-0 md:pt-16 lg:pt-0 pb-0 md:pb-3 lg:pb-0 flex flex-col ml-0 bg-white dark:bg-[#2f334e]  rounded-r-2xl shadow-lg md:shadow-none ">
        {/* <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500"
        >
          &times;
        </button> */}
        {children}
      </div>
    </div>
  );
};

export default Modal;






// import React from 'react';

// const Modal = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="h-full fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white p-6 rounded-lg w-full md:w-1/2 lg:w-1/3">
//         {/* <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-gray-500"
//         >
//           &times;
//         </button> */}
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Modal;
