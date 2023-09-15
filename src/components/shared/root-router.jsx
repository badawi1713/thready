import Home from '@/pages/home';
import Leaderboard from '@/pages/leaderboard';
import Login from '@/pages/login';
import Register from '@/pages/register';
import ThreadDetail from '@/pages/thread-detail';
import { Route, Routes } from 'react-router-dom';

const RootRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/thread/:id" element={<ThreadDetail />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
};

export default RootRouter;
