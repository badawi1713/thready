import Home from '@/pages/home';
import Leaderboard from '@/pages/leaderboard';
import Login from '@/pages/login';
import Page404 from '@/pages/404';
import Register from '@/pages/register';
import ThreadDetail from '@/pages/thread-detail';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import SplashScreen from './splash-screen';

function RootRouter() {
    const authUser = useSelector((state) => state?.authUserReducer);
    const { isPreload } = useSelector((state) => state.isPreloadReducer);

    if (isPreload) {
        return <SplashScreen />;
    }

    if (authUser) {
        return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/thread/:id" element={<ThreadDetail />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        );
    }

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/thread/:id" element={<ThreadDetail />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Page404 />} />
        </Routes>
    );
}

export default RootRouter;
