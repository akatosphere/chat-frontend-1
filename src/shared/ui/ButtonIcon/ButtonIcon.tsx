'use client'
interface ButtonIconProps{
    variant: 'primary' | 'border' | 'transparent' | 'inactive' | 'active' | 'red',
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    size: 'sm' | 'lg' | 'md',
    children: React.ReactNode,
    className?: string
}
const ButtonIcon = (props : ButtonIconProps) => {
  const {variant,children,size,onClick,className = ""} = props
  const variants = {
    primary: 'bg-primary',
    inactive: 'bg-[#E5E4F7]',// для окна звонка (вкл.видео,вкл.звук) когда не активна
    active: 'bg-white', //Для окна звонка когда активна
    border: 'bg-transparent border-primary border-[2px]',
    transparent: 'bg-transparent',
    red: 'bg-red-600'
   }
  const sizes = {
    sm: 'w-[24px] h-[24px]',
    md: 'w-[44px] h-[44px]',
    lg: 'w-[72px] h-[72px]'
  }
  return (
    <button onClick={onClick} className={`flex cursor-pointer justify-center items-center rounded-full ${variants[variant]} ${sizes[size]} ${className}`} type="button" >{children}</button>
  )
}

export default ButtonIcon