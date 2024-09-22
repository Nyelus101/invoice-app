import React, { useState } from 'react';
import myImage from '../assets/my-image.jpg';
import { useTheme } from './ThemeContext';

const Header = () => {
  // const [dark, setDark] = useState(true);
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header className="fixed top-0 lg:left-0 flex flex-row lg:flex-col justify-between w-full lg:w-[7%] h-[10%] lg:h-screen bg-[#2b2f4e] text-white lg:rounded-r-2xl z-50">
      {/* Logo */}
      <div className="p-0 m-0 flex flex-col items-center justify-center w-[18%] lg:w-full h-full lg:h-[15%]">
        {/* Top decorative div */}
        <div className="relative flex items-end justify-center bg-custom-logo1 w-full h-full rounded-r-2xl">
          {/* Bottom decorative div */}
          <div className="bg-custom-logo2 w-full h-[50%] rounded-tl-2xl rounded-br-2xl"></div>

          {/* Logo button - Centered */}
          <button className="absolute inset-0 flex items-center justify-center z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="26">
              <path
                fill="#FFF"
                fillRule="evenodd"
                d="M20.513 0C24.965 2.309 28 6.91 28 12.21 28 19.826 21.732 26 14 26S0 19.826 0 12.21C0 6.91 3.035 2.309 7.487 0L14 12.9z"
              />
            </svg>
          </button>
        </div>
      </div>


      {/* Avatar Icon and Light/Dark Mode Button */}
      <div className="flex items-center justify-center lg:flex-col gap-8 pr-5 lg:pr-0 lg:pb-5">
        <div className="text-white rounded-md" onClick={toggleDarkMode} >
          {darkMode ? (
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19.502 11.342a.703.703 0 00-.588.128 7.499 7.499 0 01-2.275 1.33 7.123 7.123 0 01-2.581.46A7.516 7.516 0 018.74 11.06a7.516 7.516 0 01-2.198-5.316c0-.87.153-1.713.41-2.48.28-.817.69-1.559 1.226-2.197a.652.652 0 00-.102-.92.703.703 0 00-.588-.128C5.316.607 3.425 1.91 2.07 3.649A10.082 10.082 0 000 9.783C0 12.57 1.125 15.1 2.965 16.94a10.04 10.04 0 007.156 2.965c2.352 0 4.524-.818 6.262-2.173a10.078 10.078 0 003.579-5.597.62.62 0 00-.46-.793z"
                fill="#7E88C3"
                fillRule="nonzero"
              />
            </svg>
          ) : (
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.817 16.18a.96.96 0 01.953.848l.007.112v1.535a.96.96 0 01-1.913.112l-.006-.112V17.14c0-.53.43-.96.96-.96zm-4.5-1.863c.347.346.373.89.08 1.266l-.08.09-1.085 1.087a.96.96 0 01-1.437-1.267l.08-.09 1.086-1.086a.959.959 0 011.357 0zm10.356 0l1.086 1.086a.959.959 0 11-1.357 1.357l-1.085-1.086a.959.959 0 111.356-1.357zM9.817 4.9a4.924 4.924 0 014.918 4.918 4.924 4.924 0 01-4.918 4.918A4.924 4.924 0 014.9 9.818 4.924 4.924 0 019.817 4.9zm8.858 3.958a.96.96 0 110 1.919H17.14a.96.96 0 110-1.92h1.535zm-16.18 0a.96.96 0 01.112 1.912l-.112.007H.96a.96.96 0 01-.112-1.913l.112-.006h1.534zm14.264-5.983a.96.96 0 010 1.357l-1.086 1.086a.96.96 0 11-1.356-1.357l1.085-1.086a.96.96 0 011.357 0zm-12.617-.08l.09.08 1.086 1.086A.96.96 0 014.05 5.398l-.09-.08-1.086-1.086a.959.959 0 011.267-1.436zM9.817 0c.53 0 .96.43.96.96v1.535a.96.96 0 01-1.92 0V.96c0-.53.43-.96.96-.96z"
                fill="#858BB2"
                fillRule="nonzero"
              />
            </svg>
          )}
        </div>
        {/* Divider Line */}
        <div className="block border-l lg:border-b lg:border-l-0 border-gray-600 h-full lg:w-full lg:h-0"></div>
        <div>
          <img
            src={myImage}
            alt="My Image"
            className="rounded-full h-10 w-10"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
