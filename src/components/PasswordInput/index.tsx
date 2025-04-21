import { cn } from '@/lib/cn';
import { ComponentProps, forwardRef, useState } from 'react';

const PasswordInput = forwardRef<HTMLInputElement, ComponentProps<'input'>>(
    ({ className, type: _, ...props }, ref) => {
        const [toogleType, setToogleType] = useState<'text' | 'password'>("password")
        const handleClick = () => {
            if (toogleType === 'password')
                setToogleType('text')
            else
                setToogleType('password')
        }
        return (<div className="relative flex items-center">
            <input
                type={toogleType}
                className={cn(
                    'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm transition-all',
                    'placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outlines focus:outline-offset-4 focus:outline-white',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                ref={ref}
                {...props}
            />
            <button 
                className="absolute right-2 text-gray-500 focus:outline-none cursor-pointer"

            type='button' onClick={handleClick}>{toogleType === 'text' ? 'OO' : '--'}</button>
        </div>
        )
    }
)

PasswordInput.displayName = 'InputPassword'

export { PasswordInput }