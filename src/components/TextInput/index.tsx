import { cn } from '@/lib/cn';
import { ComponentProps, forwardRef } from 'react';

const InputText = forwardRef<HTMLInputElement, ComponentProps<'input'>>(
    ({ className, type = 'text', ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm transition-all',
                    'placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outlines focus:outline-offset-4 focus:outline-white',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)

InputText.displayName = 'Input'

export { InputText }