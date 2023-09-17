import { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import RootRouter from './components/shared/root-router';
import { Toaster } from './components/ui/toaster';
import ScrollToTop from './lib/scroll-to-top';
import { asyncPreloadProcess } from './store/reducers/is-preload-reducer/action';
import authServices from './lib/services/auth-services';

function App() {
    const dispatch = useDispatch();
    const isMounted = useRef(true);

    const handleRefreshAuth = useCallback(async () => {
        const token = authServices.getAccessToken();
        if (token) {
            await dispatch(asyncPreloadProcess());
        }
    }, [dispatch]);

    useEffect(() => {
        if (isMounted.current) {
            handleRefreshAuth();
            isMounted.current = false;
        }
    }, [handleRefreshAuth]);

    return (
        <>
            <ScrollToTop />
            <RootRouter />
            <Toaster />
        </>
    );
}

export default App;
