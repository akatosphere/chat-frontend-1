'use client'
import { useState, useEffect, useRef } from "react"
import { Button } from "@/shared/ui/Button"
import { ConfirmModal } from "@/shared/ui/ConfirmModal"
import { MenuNavigation } from "@/shared/ui/MenuNavigation"
import { SearchInput } from "@/shared/ui/SearchInput"
import { InviteContactItem } from "@/widgets/ContactListItem/ui/ContactListItem"
import Snackbar from "./ui/Snackbar"
import { useContactStore, Contact } from "@/entities/contact/model/store"
import { ForwardingScreen } from "@/widgets/ForwardingModal/ForwardingModal"

const Page = () => {
    const { contacts, fetchContacts, deleteContactsFromState, syncDeleteContacts, addContactsToState, isLoading } = useContactStore();
    

    // Состояния для удаления
    const [selected, setSelected] = useState<string[]>([]);
    const [showCheckbox, setShowCheckbox] = useState(false)
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenSnackbar, setIsOpenSnackbar] = useState<boolean>(false);
    const [deletedCache, setDeletedCache] = useState<Contact[]>([]);
    const deleteTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Состояния для пересылки
    const [isForwardScreenOpen, setIsForwardScreenOpen] = useState(false);
    const [forwardTo, setForwardTo] = useState<string | null>(null); // Строка для одного получателя

    useEffect(() => { fetchContacts() }, [fetchContacts]);

    const toggleSelect = (list: string[], id: string) =>
        list.includes(id) ? list.filter(item => item !== id) : [...list, id];

    // Обработчик для главного списка
    const handleSelectMain = (id: string) => setSelected(prev => toggleSelect(prev, id));

    // Обработчик для окна пересылки
    const handleSelectForward = (id: string) => setForwardTo(id);


    const handleDeleteContact = () => {
        const ids = [...selected];
        setDeletedCache(contacts.filter(c => ids.includes(c.uid)));
        deleteContactsFromState(ids);
        setSelected([]);
        setIsOpen(false);
        setIsOpenSnackbar(true);
        setShowCheckbox(false);

        if (deleteTimerRef.current) clearTimeout(deleteTimerRef.current);
        deleteTimerRef.current = setTimeout(() => {
            syncDeleteContacts(ids);
            setDeletedCache([]);
            setIsOpenSnackbar(false);
        }, 5000);
    };

    const handleUndo = () => {
        if (deleteTimerRef.current) {
            clearTimeout(deleteTimerRef.current);
            deleteTimerRef.current = null;
        }
        addContactsToState(deletedCache);
        setDeletedCache([]);
        setIsOpenSnackbar(false);
    };

    const handleSendForward = () => {
        if (!forwardTo) return;


        setIsForwardScreenOpen(false);
        setForwardTo(null);
        setSelected([]);
        setShowCheckbox(false);
    };

    const handleCancelForward = () => {
        setIsForwardScreenOpen(false);
        setForwardTo(null);
    }

    if (isLoading && contacts.length === 0) return <div className="p-10 text-center">Загрузка...</div>;


    return (
        <main className="bg-white h-screen flex flex-col relative">
            <div className="px-4 pt-5 overflow-auto flex-1 flex flex-col gap-5">
                <SearchInput theme="gray" />
                <div>
                    <div className="flex items-center justify-between bg-violate-light rounded-2xl px-4 h-11">
                        <p className="text-[14px] font-normal">Мои контакты</p>
                        <Button
                            variant="transparent"
                            size="sm"
                            type="button"
                            full={false}
                            onClick={() => setShowCheckbox(!showCheckbox)}
                        >
                            {showCheckbox ? "Отмена" : "Выбрать"}
                        </Button>
                    </div>
                    <ul>
                        {contacts.map((item: any) => {
                            // 1. Берем время (проверяем и корень, и вложенный объект)
                            const actualTimestamp = item.was_online_at || item.system_contact?.was_online_at;

                            // 2. Берем статус ОНЛАЙН (строгая проверка на true)
                            const isActuallyOnline = item.is_online === true || item.system_contact?.is_online === true;

                            return (
                                <InviteContactItem
                                    key={item.uid}
                                    showCheckbox={showCheckbox}
                                    onChange={handleSelectMain}
                                    id={item.uid}
                                    name={`${item.first_name} ${item.last_name}`}
                                    is_online={isActuallyOnline}
                                    isSelected={selected.includes(item.uid)}
                                    avatarUrl={item.avatar_url}
                                    was_online_at={actualTimestamp}
                                />
                            );
                        })}

                    </ul>
                </div>
            </div>

            {selected.length > 0 ? (
                <div className="sticky bottom-0 bg-violate-light border-t z-10">
                    <div className="h-17 flex items-center justify-between px-4">
                        <div className="flex items-center gap-[27px]">
                            <span onClick={() => setSelected([])} className="cursor-pointer">
                                <svg width="14" height="14" viewBox="0 0 14 14">
                                    <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#747474" />
                                </svg>
                            </span>
                            <span>{`Выбрано: ${selected.length}`}</span>
                        </div>

                        <div className="flex items-center gap-2 ">
                            <button onClick={() => setIsForwardScreenOpen(true)} className="w-11 h-11 flex items-center justify-center cursor-pointer">
                                <svg width="21" height="17" viewBox="0 0 21 17" fill="none">
                                    <path d="M10 11.5H8.00001C6.35963 11.4995 4.7503 11.9473 3.34597 12.795C1.94163 13.6428 0.795693 14.8582 0.0320057 16.31C0.0103953 16.0405 -0.000280159 15.7703 5.58684e-06 15.5C5.58684e-06 9.977 4.47701 5.5 10 5.5V0L20.5 8.5L10 17V11.5ZM8.00001 9.5H12V12.808L17.321 8.5L12 4.192V7.5H10C8.85016 7.4987 7.71361 7.74591 6.66818 8.22469C5.62276 8.70348 4.69314 9.40254 3.94301 10.274C5.23434 9.76216 6.61093 9.49953 8.00001 9.5Z" fill="#7769E1" />
                                </svg>
                            </button>
                            <button onClick={() => setIsOpen(true)} className="w-11 h-11 flex items-center justify-center cursor-pointer">
                                <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
                                    <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM3 6H11V16H3V6ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5Z" fill="#FF0000" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            ) : <MenuNavigation />}

            <ConfirmModal
                isOpen={isOpen}
                title={`Удалить ${selected.length} контакта?`}
                buttons={[
                    { label: "Отмена", onClick: () => setIsOpen(false) },
                    { label: "Удалить", onClick: handleDeleteContact }
                ]}
            />

            <Snackbar
                message={`Удалено ${deletedCache.length} контакта`}
                onClose={() => setIsOpenSnackbar(false)}
                undo={handleUndo}
                isOpen={isOpenSnackbar}
                className="absolute bottom-[84px] left-1/2 -translate-x-1/2"
            />

            {isForwardScreenOpen && (
    <ForwardingScreen 
        contacts={contacts} // Передаем все контакты напрямую
        forwardTo={forwardTo}
        onCancel={handleCancelForward}
        onSend={handleSendForward}
        onSelect={handleSelectForward}
    />
)}

        </main>
    )
}

export default Page;