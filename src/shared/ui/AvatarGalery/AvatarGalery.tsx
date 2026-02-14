import React from 'react'
import { Button } from '../Button'

type Props = {
    photos: string[]
}

const AvatarGalery = (props: Props) => {
    const {photos} = props
    return(
        <div className='h-screen bg-white flex flex-col'>
            <header className='pt-3 mb-6 relative'>
                <p className='text-black text-center'>Изменить фото профиля</p>
                <span className='cursor-pointer absolute top-[15px] right-[15px]'>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#1C1C1E"/>
                    </svg>
                </span>
            </header>
            <div className='grid grid-cols-3 gap-3'>
                {
                    photos.map((item,index) => (
                        <div key={index} className='bg-gray rounded-lg bg-no-repeat bg-center bg-cover h-[115px]' style={{backgroundImage: `url(${item})`}}></div>
                    ))
                }
            </div>
            <div className='flex gap-3 mt-auto pb-17'>
                <Button variant='secondary' size='md' type='button'>Отменить</Button>
                <Button variant='primary' size='md' type='button'>Выбрать фото</Button>
            </div>
        </div>
    )
}

export default AvatarGalery