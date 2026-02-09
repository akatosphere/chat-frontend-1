// src/widgets/InviteContactItem/ui/InviteContactItem.tsx
"use client";
import React from "react";
import { UserAvatar } from "@/shared/ui/AvatarWithStatus/AvatarWithStatus"; 

type InviteContactItemProps = {
  id: string;
  name: string;
  avatarUrl?: string;
  isOnline: boolean;
  was_online_at?: number;
  isSelected: boolean;
  showDivider?: boolean; // Управляет отображением разделителя
  onChange: (contactId: string, isChecked: boolean) => void;
};

export const InviteContactItem: React.FC<InviteContactItemProps> = ({
  id,
  name,
  avatarUrl,
  isOnline,
   was_online_at,
  isSelected,
  showDivider = true,
  onChange,
}) => {
  const handleClick = () => {
    onChange(id, !isSelected);
  };
  
  const fullAvatarUrl = avatarUrl; 
  const statusProps = { is_online: isOnline, was_online_at: was_online_at };

  return (
    <li 
      className={`relative group flex items-center justify-between p-4 cursor-pointer ${
        isSelected 
          ? 'bg-primary rounded-lg'
          : ''
      }`}
      onClick={handleClick}
    >
      <div className={`flex items-center gap-3 ${isSelected ? 'text-white' : ''}`}>
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
            statusTextClassName={isSelected ? "text-sm text-white" : undefined}
          />
        </div>
      </div>

      {/* Круглый чекбокс */}
      <div
        className={`relative w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-200 shrink-0 ${
          isSelected 
            ? 'bg-white border-white'
            : 'bg-white border-primary'
        }`}
      >
        {/* SVG иконка галочки */}
        <svg 
          className={`w-4 h-4 transition-opacity duration-200 ${
            isSelected 
                ? 'text-primary'
                : 'text-white'
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

      {/* Абсолютно позиционированный разделитель с точными отступами и условием isSelected */}
      {showDivider && !isSelected && (
        <div 
          className={`absolute bottom-0 left-[4.25rem] right-[1rem] h-px bg-gray-light`} 
        />
      )}
    </li>
  );
};