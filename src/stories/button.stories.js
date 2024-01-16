// button.stories.tsx
import { Button } from '../components/ui/button';
import '../index.css';

const meta = {
    title: 'Components/UI/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
            control: { type: 'select' },
        },
        size: {
            options: ['default', 'sm', 'lg', 'icon'],
            control: { type: 'radio' },
        },
        disabled: {
            options: [true, false],
            control: { type: 'boolean' },
        }
    },
};

export default meta;

export const Default = {
    args: {
        children: 'Button',
        variant: 'outline',
        size: 'default',
        disabled: false,
        className: ''
    },
};
