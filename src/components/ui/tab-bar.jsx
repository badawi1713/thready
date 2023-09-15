import { useTheme } from '@/context/theme-context/ThemeContext';
import useScreenSize from '@/hooks/useScreenSize';
import { Link, useLocation } from 'react-router-dom';

import { Typography } from '@/components/ui/typography';
import { mainRoutes, screens } from '@/lib/utils';
import { HiOutlineLogout, HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';

const TabBar = () => {
    const { setTheme, theme } = useTheme();

    const screenSize = useScreenSize();
    const { width } = screenSize;
    const isMobileScreen = width <= screens.md;

    const { pathname } = useLocation();

    return (
        isMobileScreen && (
            <div className="flex items-baseline w-full fixed border-t shadow-sm dark:bg-slate-900 bg-white bottom-0 left-0 justify-around px-2">
                {mainRoutes?.map((route) => {
                    return (
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
                            <Typography variant="caption">
                                {route.name}
                            </Typography>
                        </Link>
                    );
                })}

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
                <button className="flex flex-col items-center py-3">
                    <HiOutlineLogout size={24} />
                    <Typography variant="caption">Logout</Typography>
                </button>
            </div>
        )
    );
};

export default TabBar;
