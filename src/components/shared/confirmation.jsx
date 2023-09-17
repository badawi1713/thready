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

const Confirmation = forwardRef(
    ({
        title = 'Confirmation dialog?',
        description = 'This is a default confirmation dialog description.',
        handleAction = () => true,
        cancelText = 'Cancel',
        actionText = 'Confirm',
        actionVariant = 'default',
        children,
    }) => {
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
