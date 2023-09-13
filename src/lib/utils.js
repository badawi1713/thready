import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const screens = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1028,
};

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
