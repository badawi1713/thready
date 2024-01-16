import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    HiOutlineLogin,
    HiOutlineLogout,
    HiOutlineMoon,
    HiOutlineSun,
} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import useScreenSize from '@/hooks/useScreenSize';

import { useToast } from '@/hooks/useToast';
import { mainRoutes, screens } from '@/lib/utils';
import { asyncUnsetAuthUser } from '@/store/reducers/auth-user-reducer/action';
import { memo } from 'react';
import { Typography } from '../ui/typography';
import { useTheme } from '../../context/theme-context/ThemeContext';
import Confirmation from './confirmation';

function TabBar() {
    const dispatch = useDispatch();
    const { setTheme, theme } = useTheme();
    const { toast } = useToast();
    const navigation = useNavigate();

    const screenSize = useScreenSize();
    const { width } = screenSize;
    const isMobileScreen = width <= screens.md;

    const { pathname } = useLocation();

    const authUser = !!useSelector((state) => state?.authUserReducer);

    const handleLogout = () => {
        dispatch(asyncUnsetAuthUser());
        navigation('/');
        toast({
            title: 'Logout Successful',
            description:
                'You have been successfully logged out of your account. ',
        });
    };

    return (
        isMobileScreen && (
            <div className="flex items-baseline w-full fixed border-t shadow-sm dark:bg-slate-900 bg-white bottom-0 left-0 justify-around px-2">
                {mainRoutes?.map((route) => (
                    <Link
                        key={route.id}
                        to={route.url}
                        className="flex flex-col items-center py-3"
                    >
                        {pathname === route?.url ? (
                            <route.activeIcon size={24} />
                        ) : (
                            <route.icon size={24} />
                        )}
                        <Typography variant="caption">{route.name}</Typography>
                    </Link>
                ))}

                <button
                    className="flex flex-col items-center relative py-3"
                    onClick={() =>
                        setTheme(theme === 'dark' ? 'light' : 'dark')
                    }
                >
                    <HiOutlineMoon
                        size={24}
                        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                    />
                    <HiOutlineSun
                        size={24}
                        className="rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 absolute"
                    />
                    <Typography variant="caption">
                        {theme === 'dark' ? 'Light' : 'Dark'} Mode
                    </Typography>
                </button>
                {authUser ? (
                    <Confirmation
                        title="Confirm to logout?"
                        description="Logging out will end your current session, and you'll need to sign in again to access your account."
                        handleAction={handleLogout}
                        actionVariant="destructive"
                    >
                        <button
                            aria-label="logout"
                            className="flex flex-col items-center py-3"
                        >
                            <HiOutlineLogout size={24} />
                            <Typography variant="caption">Logout</Typography>
                        </button>
                    </Confirmation>
                ) : (
                    <Link
                        aria-label="login"
                        to="/login"
                        className="flex flex-col items-center py-3"
                    >
                        <HiOutlineLogin size={24} />
                        <Typography variant="caption">Login</Typography>
                    </Link>
                )}
            </div>
        )
    );
}

export default memo(TabBar);
