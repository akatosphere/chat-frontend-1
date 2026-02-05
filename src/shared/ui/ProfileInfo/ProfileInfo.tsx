import React from 'react'
import { UserAvatar } from '../AvatarWithStatus/AvatarWithStatus'
import { AvatarProps } from '../AvatarWithStatus/AvatarWithStatus'
type Props = {
    fullName: string,
    phone: string,
    email: string,
    avatar?: AvatarProps
}

const ProfileInfo = (props: Props) => {
    const {fullName,phone,email,avatar} = props
    const defaultPhoto = {avatar: ""}
  return (
    <div className='border-2 border-primary p-3 rounded-lg flex  items-center gap-3'>
        <UserAvatar showStatus = {false} size={20} avatar={avatar ? avatar : defaultPhoto}/>
        <div className='space-y-1'>
            <h1 className='font-medium text-[18px] leading-[120%] text-black'>{fullName}</h1>
            <p className='font-normal text-[16px] leading-[130%] text-black'>{phone}</p>
            <p className='font-normal text-[16px] leading-[130%] text-black'>{email}</p>
        </div>
    </div>
  )
}

export default ProfileInfo