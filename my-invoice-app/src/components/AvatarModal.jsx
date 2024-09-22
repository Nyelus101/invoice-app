import React from 'react';
import myImage from '../assets/my-image.jpg';
import { FaLinkedin } from 'react-icons/fa';

const AvatarModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 h-screen bg-black bg-opacity-85 flex items-center justify-center z-50">
      <div className="flex flex-row space-x-5 rounded-lg shadow-md w-[90%] md:w-[500px]">
        <div className='w-full'>
        <img
            src={myImage}
            alt="My Image"
            className="rounded-full h-full w-full "
          />
        </div>
        <div className="flex flex-col justify-end gap-4">
            <div className='flex flex-col'>
                <p>Muonyelu Chinedu is a passion-driven frontend developer dedicated to crafting responsive and interactive web experiences. He loves turning ideas into reality through clean, modern designs.</p>
                <a
                    href="https://www.linkedin.com/in/muonyelu-chinedu-7018b7216/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                    >
                    My LinkedIn page <FaLinkedin />
                </a>

            </div>
          <button
            onClick={onClose}
            className="w-full py-2 bg-gray-200 dark:bg-[#3f425a] text-gray-800 dark:text-gray-200 rounded-full font-semibold"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarModal;
