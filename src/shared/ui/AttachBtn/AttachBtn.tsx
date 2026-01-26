"use client";

import React, { useState } from "react";

// --- КОМПОНЕНТ ПУНКТА МЕНЮ ---
const AttachMenuItem = ({ label, icon, onClick }: { label: string; icon: React.ReactNode; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-between px-4 py-3 text-[15px] text-gray-700 hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl cursor-pointer outline-none transition-colors"
  >
    <span className="font-medium">{label}</span>
    <span className="text-gray">{icon}</span>
  </button>
);

// --- КОМПОНЕНТ МЕНЮ ---
const AttachMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  // Массив данных для удобного масштабирования
  const menuItems = [
    {
      label: "Выбрать изображение",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org">
          <path d="M5 21C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V5C3 4.45 3.196 3.97933 3.588 3.588C3.98 3.19667 4.45067 3.00067 5 3H19C19.55 3 20.021 3.196 20.413 3.588C20.805 3.98 21.0007 4.45067 21 5V19C21 19.55 20.8043 20.021 20.413 20.413C20.0217 20.805 19.5507 21.0007 19 21H5ZM5 19H19V5H5V19ZM6 17H18L14.25 12L11.25 16L9 13L6 17ZM8.5 10C8.91667 10 9.271 9.85433 9.563 9.563C9.855 9.27167 10.0007 8.91733 10 8.5C9.99933 8.08267 9.85367 7.72867 9.563 7.438C9.27233 7.14733 8.918 7.00133 8.5 7C8.082 6.99867 7.728 7.14467 7.438 7.438C7.148 7.73133 7.002 8.08533 7 8.5C6.998 8.91467 7.144 9.269 7.438 9.563C7.732 9.857 8.086 10.0027 8.5 10Z" fill="grey"/>
        </svg>
      ),
      onClick: () => console.log("Изображение"),
    },
    {
      label: "Выбрать файл",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org">
          <path d="M19.903 8.586C19.8555 8.4775 19.7892 8.37829 19.707 8.293L13.707 2.293C13.6217 2.21083 13.5225 2.14447 13.414 2.097C13.384 2.083 13.352 2.075 13.32 2.064C13.2363 2.03563 13.1492 2.01848 13.061 2.013C13.04 2.011 13.021 2 13 2H6C4.897 2 4 2.897 4 4V20C4 21.103 4.897 22 6 22H18C19.103 22 20 21.103 20 20V9C20 8.979 19.989 8.96 19.987 8.938C19.9815 8.84979 19.9644 8.7627 19.936 8.679C19.9267 8.647 19.9157 8.616 19.903 8.586ZM16.586 8H14V5.414L16.586 8ZM6 20V4H12V9C12 9.26522 12.1054 9.51957 12.2929 9.70711C12.4804 9.89464 12.7348 10 13 10H18L18.002 20H6Z" fill="#747474"/>
          <path d="M8 12H16V14H8V12ZM8 16H16V18H8V16ZM8 8H10V10H8V8Z" fill="#747474"/>
        </svg>
      ),
      onClick: () => console.log("Файл"),
    }
    // Здесь можно легко добавить еще пункты (например, Контакт, Геолокация и т.д.)
  ];

  return (
    <div className="absolute left-0 bottom-full mb-2 w-56 bg-white rounded-xl shadow-2xl border border-black/20 py-0 z- animate-in fade-in zoom-in-95 duration-100 origin-bottom-left overflow-hidden">
      {menuItems.map((item, index) => (
        <div key={index} className="flex flex-col">
          <AttachMenuItem
            label={item.label}
            icon={item.icon}
            onClick={() => {
              item.onClick();
              onClose();
            }}
          />
          {/* Линия рисуется после каждого элемента, кроме самого последнего */}
          {index !== menuItems.length - 1 && (
            <div className="h-[1px] w-full bg-black/30" />
          )}
        </div>
      ))}
    </div>
  );
};

// --- ОСНОВНОЙ КОМПОНЕНТ КНОПКИ ---
export const AttachBtn = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* ОВЕРЛЕЙ */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black/5 cursor-pointer transition-opacity"
            onClick={closeMenu}
          />
        </div>
      )}

      {/* КОНТЕЙНЕР КНОПКИ */}
      <div className="relative inline-block z-[60]">
        <button
          onClick={toggleMenu}
          className="flex items-center justify-center w-10 h-10 rounded-md transition-opacity hover:opacity-80 active:scale-95 cursor-pointer outline-none"
          aria-label="Открыть меню вложений"
        >
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_7458_204350)">
              <path d="M30.9321 20.6083L21.0375 30.5028C20.1247 31.4156 18.852 31.8936 17.4994 31.8318C16.1467 31.77 14.8249 31.1734 13.8247 30.1732C12.8245 29.173 12.2278 27.8512 12.166 26.4985C12.1042 25.1458 12.5823 23.8731 13.495 22.9604L24.25 12.2054C24.8205 11.6349 25.6159 11.3361 26.4613 11.3748C27.3067 11.4134 28.1329 11.7863 28.758 12.4114C29.3831 13.0366 29.756 13.8627 29.7946 14.7081C29.8333 15.5535 29.5345 16.349 28.964 16.9195L19.9299 25.9536C19.7017 26.1818 19.3835 26.3013 19.0453 26.2859C18.7072 26.2704 18.3767 26.1212 18.1267 25.8712C17.8766 25.6211 17.7274 25.2907 17.712 24.9525C17.6965 24.6144 17.8161 24.2962 18.0442 24.068L26.218 15.8942L24.8038 14.48L16.63 22.6538C16.0596 23.2243 15.7608 24.0197 15.7994 24.8651C15.838 25.7105 16.2109 26.5367 16.8361 27.1618C17.4612 27.7869 18.2873 28.1598 19.1327 28.1984C19.9782 28.2371 20.7736 27.9383 21.3441 27.3678L30.3782 18.3337C31.291 17.4209 31.7691 16.1482 31.7072 14.7955C31.6454 13.4429 31.0488 12.121 30.0486 11.1208C29.0484 10.1207 27.7266 9.52402 26.3739 9.4622C25.0212 9.40037 23.7485 9.87843 22.8358 10.7912L12.0808 21.5461C10.8258 22.8012 10.1684 24.5512 10.2534 26.4111C10.3384 28.271 11.1588 30.0885 12.5341 31.4638C13.9093 32.839 15.7269 33.6594 17.5868 33.7444C19.4467 33.8294 21.1967 33.1721 22.4517 31.917L32.3463 22.0225L30.9321 20.6083Z" fill="#7769E1"/>
            </g>
            <defs>
              <clipPath id="clip0_7458_204350">
                <rect width="44" height="44" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </button>

        <AttachMenu isOpen={isOpen} onClose={closeMenu} />
      </div>
    </>
  );
};