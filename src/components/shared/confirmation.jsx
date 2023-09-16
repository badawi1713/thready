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
} from '@/components/ui/alert-dialog';
import { forwardRef } from 'react';
import { buttonVariants } from '../ui/button';

const Confirmation = forwardRef(
    (
        {
            title = 'Confirmation dialog?',
            description = 'This is a default confirmation dialog description.',
            handleAction = () => console.log('Action button'),
            cancelText = 'Cancel',
            actionText = 'Confirm',
            actionVariant = 'default',
            children,
            ...props
        },
        ref
    ) => {
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
    }
);

Confirmation.displayName = 'Confirmation';

export default Confirmation;
