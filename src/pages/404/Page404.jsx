import { Button } from '@/components/ui';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Page404() {
    const navigation = useNavigate();

    const handleNavigate = () => {
        navigation('/', { replace: true });
    };

    return (
        <div className="bg-primary-foreground w-full px-16 md:px-0 h-screen flex items-center justify-center">
            <div className="bg-secondary border border-primary flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
                <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-secondary-foreground">
                    404
                </p>
                <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-secondary-foreground mt-4">
                    Page Not Found
                </p>
                <p className="text-secondary my-4 pb-4 border-b-2 text-center border-b-secondary-foreground">
                    Sorry, the page you are looking for could not be found.
                </p>
                <Button variant="ghost" onClick={handleNavigate}>
                    Go Back
                </Button>
            </div>
        </div>
    );
}

export default Page404;
