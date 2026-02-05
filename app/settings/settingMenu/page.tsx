import React from 'react'
import { MenuNavigation } from '@/shared/ui/MenuNavigation'
import { AddedService } from '@/shared/ui/AddedService'
import ProfileInfo from '@/shared/ui/ProfileInfo/ProfileInfo'

const page = () => {
  return (
    <div className="min-h-screen flex flex-col">
        <header className="text-center py-3 shrink-0">
            <h1 className="font-medium text-[18px]">Настройки</h1>
        </header>

        <main className="px-4 py-3 flex flex-col gap-3 flex-1 pb-[72px]">
            <ProfileInfo
            fullName="Сергей Иванов"
            phone="+7 921 7797979"
            email="@bond777"
            />

            <ul>
                <li><AddedService variant="edit" showArrow={true} isScroll={false} /></li>
                <li><AddedService variant="blackList" showArrow={true} isScroll={false} /></li>
                <li><AddedService variant="support" showArrow={true} isScroll={false} /></li>
                <li><AddedService variant="leave" showArrow={false} isScroll={false} /></li>
            </ul>

            <div className="flex items-center gap-4 text-error mt-auto">
                <span>
                    <svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.16667 18.6667C1.16667 19.95 2.21667 21 3.5 21H12.8333C14.1167 21 15.1667 19.95 15.1667 18.6667V4.66667H1.16667V18.6667ZM3.5 7H12.8333V18.6667H3.5V7ZM12.25 1.16667L11.0833 0H5.25L4.08333 1.16667H0V3.5H16.3333V1.16667H12.25Z" fill="#FF0000"/>
                    </svg>
                </span>
                <span>Удалить профиль</span>
            </div>
        </main>

        <div className="fixed bottom-0 left-0 w-full">
            <MenuNavigation />
        </div>
    </div>
    )
}

export default page