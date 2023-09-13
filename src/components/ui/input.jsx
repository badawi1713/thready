import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
        <div
            className={cn(
                `flex min-h-10 h-auto w-full rounded-md border 
                ${
                    props?.error
                        ? 'border-red-500 dark:border-2'
                        : 'border-input'
                } bg-white items-stretch`,
                className
            )}
        >
            <input
                className={cn(
                    ` w-full px-3 py-2 rounded-md text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 dark:text-black`,
                    className
                )}
                type={type}
                ref={ref}
                {...props}
            />
            {props?.icon && (
                <div className="px-3 py-2 h-full text-black">{props?.icon}</div>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export { Input };
