import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';

const Typography = forwardRef(
    (
        {
            variant = 'default',
            fontStyle = 'normal',
            fontWeight = 'normal',
            color = 'text-gray-800',
            children,
            ...props
        },
        ref
    ) => {
        const baseClasses = 'font-sans leading-tight';

        let variantClasses = '';
        let fontStyleClasses = '';
        let fontWeightClasses = '';
        let colorClasses = '';

        // Define classes based on the variant, fontStyle, fontWeight, and color props
        switch (variant) {
            case 'heading1':
                variantClasses = 'text-4xl';
                break;
            case 'heading2':
                variantClasses = 'text-3xl';
                break;
            case 'heading3':
                variantClasses = 'text-2xl';
                break;
            case 'body1':
                variantClasses = 'text-lg';
                break;
            case 'body2':
                variantClasses = 'text-base';
                break;
            case 'caption':
                variantClasses = 'text-[0.7rem]';
                break;
            case 'label':
                variantClasses = 'text-[0.9rem]';
                break;
            default:
                variantClasses = 'text-base';
        }

        switch (fontStyle) {
            case 'italic':
                fontStyleClasses = 'italic';
                break;
            default:
                fontStyleClasses = '';
        }

        switch (fontWeight) {
            case 'medium':
                fontWeightClasses = 'font-medium';
                break;
            case 'semibold':
                fontWeightClasses = 'font-semibold';
                break;
            case 'bold':
                fontWeightClasses = 'font-bold';
                break;
            default:
                fontWeightClasses = 'font-normal';
        }

        switch (color) {
            case 'default':
                colorClasses = 'text-inherit';
                break;
            case 'error':
                colorClasses = 'text-red-500';
                break;
            case 'disabled':
                colorClasses = 'text-gray-400';
                break;
            case 'primary':
                colorClasses = 'text-blue-500';
                break;
            case 'secondary':
                colorClasses = 'text-green-500';
                break;
            default:
                colorClasses = 'text-inherit';
        }

        const classes = cva(
            `${baseClasses} ${variantClasses} ${fontStyleClasses} ${fontWeightClasses} ${colorClasses}`
        );

        const headingLevels = {
            heading1: 'h1',
            heading2: 'h2',
            heading3: 'h3',
            body1: 'p',
            body2: 'p',
            caption: 'p',
            default: 'p',
        };

        const Text = headingLevels[variant] || 'p';

        return (
            <Text className={cn(classes(), props.className)}>{children}</Text>
        );
    }
);

Typography.displayName = 'Typography';

export { Typography };
