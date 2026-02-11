'use client'
import React, { useRef } from 'react'

type Props = {
  className?: string,
  onTextChange: (text: string) => void
}


const ChatInput = (props: Props) => {
    const {className,onTextChange} = props
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    function handleInput(){
        const textarea = textareaRef.current
        if(!textarea) return
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight - 2 + "px";
        onTextChange(textarea.value)
    }
  return (
    <div className='bg-white px-2 py-3 rounded-[20px] w-2xs flex items-end justify-between gap-3 '>
        <textarea 
        rows={1} 
        onInput={handleInput}
        className='bg-transparent w-full outline-none resize-none text-[16px] leading-[130%] max-h-[150px] overflow-y-auto [&::-webkit-scrollbar]:w-0' 
        placeholder='Сообщение'
        ref={textareaRef}
        />
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.73016 5.72047H4.13275V7.31487H5.73016V5.72047Z" fill="#747474"/>
            <path d="M11.3661 5.72047H9.77953V7.31487H11.3661V5.72047Z" fill="#747474"/>
            <path d="M9.41041 10.6446C9.85963 10.3405 10.2068 9.90807 10.4067 9.40374L10.448 9.30041H11.5609L11.3661 9.7874C11.0881 10.4825 10.6081 11.0783 9.98823 11.498C9.36833 11.9177 8.63689 12.142 7.88827 12.1421H7.61056C6.86194 12.142 6.1305 11.9177 5.5106 11.498C4.8907 11.0783 4.41078 10.4825 4.13275 9.7874L3.93797 9.30041H5.05077L5.09207 9.40374C5.29194 9.90809 5.63913 10.3405 6.08837 10.6446C6.53761 10.9488 7.06806 11.1105 7.61056 11.1087H7.88827C8.43076 11.1105 8.96119 10.9488 9.41041 10.6446Z" fill="#747474"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M0 7.75C0 3.4698 3.4698 0 7.75 0C12.0302 0 15.5 3.4698 15.5 7.75C15.5 12.0302 12.0302 15.5 7.75 15.5C3.4698 15.5 0 12.0302 0 7.75ZM8.08795 14.4452C9.74911 14.3672 11.3217 13.6735 12.4994 12.4994C13.113 11.8875 13.602 11.1624 13.9392 10.3641C14.5863 8.83218 14.6399 7.11421 14.0895 5.54495C13.5391 3.97569 12.4242 2.66756 10.962 1.87543C9.49975 1.08331 7.795 0.863952 6.17989 1.26009C4.56478 1.65623 3.155 2.6395 2.22526 4.0183C1.29551 5.3971 0.912404 7.07266 1.15058 8.7185C1.38876 10.3643 2.23115 11.8626 3.51363 12.9212C4.79611 13.9799 6.4268 14.5231 8.08795 14.4452Z" fill="#747474"/>
        </svg>
    </div>
  )
}

export default ChatInput