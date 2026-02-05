'use client'
import React from 'react';
import { SearchInput } from "@/shared/ui/SearchInput";
import { InviteContactItem } from "@/widgets/ContactListItem/ui/ContactListItem";
import { Contact } from "@/entities/contact/model/store";

interface ForwardingScreenProps {
    contacts: Contact[];
    forwardTo: string | null;
    onCancel: () => void;
    onSend: () => void;
    onSelect: (id: string) => void;
}

export const ForwardingScreen: React.FC<ForwardingScreenProps> = ({
    contacts, forwardTo, onCancel, onSend, onSelect
}) => {
    const isSelected = Boolean(forwardTo);

    return (
        // Оверлей)
        <div className="fixed inset-0 bg-overlay flex items-end justify-center z-50 px-4 pb-4" onClick={onCancel}>
            
            
            <div 
                className="bg-white w-full h-[85vh] rounded-lg flex flex-col overflow-hidden transition-transform"
                onClick={(e) => e.stopPropagation()}
            >
                

                {/* Хедер */}
                <div className="flex items-center justify-between px-6 py-2 border-b border-black/30">
                    <button onClick={onCancel} className="text-primary text-sm cursor-pointer">Отмена</button>
                </div>

                {/* Поиск */}
                <div className="px-6 py-4 border-b border-black/30">
                    <SearchInput theme="gray" />
                </div>

                {/* Список контактов */}
                <div className="overflow-y-auto flex-1 px-4 py-2">
                    <div className="flex flex-col gap-0.5 pb-6">
                        {contacts.map(item => (
                            <div 
                                key={item.uid} 
                                onClick={() => onSelect(item.uid)}
                                className="cursor-pointer px-2"
                                
                            >
                                <InviteContactItem 
                                    id={item.uid} 
                                    name={`${item.first_name} ${item.last_name}`} 
                                    isOnline={item.is_online} 
                                    avatarUrl={item.avatar_url}
                                    showCheckbox={false} 
                                    isSelected={forwardTo === item.uid}
                                    onChange={() => {}} 
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};