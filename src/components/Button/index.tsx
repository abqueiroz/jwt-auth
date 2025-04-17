import { cn } from '@/lib/cn';
import { ComponentProps, forwardRef, ReactNode } from 'react';

interface ButtonProps extends ComponentProps<'button'> {
    children?: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, type = 'button', children, ...props }, ref) => {
        return (
            <button
                type={type}
                className={cn(
                     "w-full py-3 text-white font-semibold",
                      "bg-gradient-to-r from-purple-500 to-blue-500",
                      "hover:from-purple-600 hover:to-blue-600",
                      "focus:outline focus:outline-offset-4 focus:outline-purple-400",
                      "rounded-md shadow-lg transition-all duration-300",
                      "hover:scale-[103%]",
                    className
                )}
                ref={ref}
                {...props}
            >
                {children}
            </button>
        )
    }
)

Button.displayName = 'Button'

export { Button }