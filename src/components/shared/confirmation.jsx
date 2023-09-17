import { forwardRef } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui';
import { buttonVariants } from '../ui/button';

// eslint-disable-next-line no-unused-vars
const Confirmation = forwardRef((props, ref) => {
    const {
        title = 'Confirmation dialog?',
        description = 'This is a default confirmation dialog description.',
        handleAction = () => true,
        cancelText = 'Cancel',
        actionText = 'Confirm',
        actionVariant = 'default',
        children,
    } = props;
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{cancelText}</AlertDialogCancel>
                    <AlertDialogAction
                        className={buttonVariants({
                            variant: actionVariant,
                        })}
                        onClick={handleAction}
                    >
                        {actionText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
});

Confirmation.displayName = 'Confirmation';

export default Confirmation;
