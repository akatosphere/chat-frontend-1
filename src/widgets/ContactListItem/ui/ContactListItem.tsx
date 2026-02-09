"use client";
import React from "react";

import { UserAvatar } from "@/shared/ui/AvatarWithStatus/AvatarWithStatus"; 

type ContactItemProps = {
  id: string;
  name: string;
  avatarUrl?: string;
  is_online?: boolean;
  was_online_at?: number;
  showCheckbox?: boolean; // свойство, чтобы управлять видимостью чекбокса 
  isSelected: boolean;
  showDivider?: boolean; 
  onChange: (contactId: string, isChecked: boolean) => void;
};

export const InviteContactItem: React.FC<ContactItemProps> = ({
  id,
  name,
  avatarUrl,
  is_online,
  was_online_at,
  showCheckbox = true, // По умолчанию показываем чекбокс
  isSelected,
  showDivider = true,
  onChange,
}) => {
  const handleToggleSelection = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    onChange(id, !isSelected);
  };
  
  const fullAvatarUrl = avatarUrl; 
  const statusProps = { is_online, was_online_at };

  return (
    <li className={`relative group flex items-center justify-between p-4`}>
      <div className={`flex items-center gap-3`}>
        <UserAvatar
          avatar={{ avatar_url: fullAvatarUrl, alt: name }}
          status={statusProps}
          size={10}
          variant="avatarOnly"
          showStatus={false} 
        />
        
        <div className="flex flex-col">
          <span className="font-medium">{name}</span>
          <UserAvatar
            avatar={{}} 
            status={statusProps}
            size={10} 
            variant="avatarWithStatusRight"
            hideAvatar={true}
            statusTextClassName={undefined} 
          />
        </div>
      </div>

      {/* Элемент управления (Кружок-чекбокс), который теперь необязателен */}
      {showCheckbox && (
        <div
          // Стили чекбокса
          className={`relative w-6 h-6 rounded-full border flex items-center justify-center ${
            isSelected 
              ? 'bg-primary border-primary' // Выбран: заполненный фон
              : 'bg-white border-primary' // Не выбран: пустой фон,
          }`}
          onClick={handleToggleSelection} 
        >
          {/* SVG иконка галочки */}
          <svg 
            className={`w-4 h-4 transition-opacity duration-200 ${
              isSelected 
                ? 'text-white opacity-100' // Видимая белая галочка
                : 'text-white opacity-0' // Скрытая галочка
            }`} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      {/* Абсолютно позиционированный разделитель */}
      {showDivider && (
        <div 
          className={`absolute bottom-0 left-[4.25rem] right-[1rem] h-px bg-gray-light`} 
        />
      )}
    </li>
  );
};