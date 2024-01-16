// button.stories.tsx
import { Typography } from '../components/ui/typography';
import '../index.css';

const meta = {
    title: 'Components/UI/Typography',
    component: Typography,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            options: [
                'heading1',
                'heading2',
                'heading3',
                'body1',
                'body2',
                'caption',
                'label',
            ],
            control: { type: 'select' },
        },
        fontWeight: {
            options: ['default', 'medium', 'semibold', 'bold'],
            control: { type: 'radio' },
        },
        color: {
            options: [
                'default',
                'error',
                'disabled',
                'primary',
                'secondary',
                'inherit',
            ],
            control: { type: 'select' },
        },
        fontStyle: {
            options: ['italic', 'normal'],
            control: { type: 'radio' },
        },
    },
};

export default meta;

export const Default = {
    args: {
        children: 'Typography',
        variant: 'heading1',
        fontWeight: 'default',
        color: '',
        className: '',
    },
};
