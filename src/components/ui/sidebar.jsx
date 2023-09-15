import { useTheme } from '@/context/theme-context/ThemeContext';
import { mainRoutes } from '@/lib/utils';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
    HiNewspaper,
    HiOutlineLogout,
    HiOutlineMoon,
    HiOutlineSun,
} from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';
import { Typography } from './typography';

const Sidebar = () => {
    const { setTheme, theme } = useTheme();
    const { pathname } = useLocation();
    const isMounted = useRef(true);
    const navigation = useNavigate();

    const [activeTab, setActiveTab] = useState(pathname);

    const [tabBorderHeight, setTabBorderHeight] = useState(0);
    const [tabBorderTop, setTabBorderTop] = useState(
        pathname === '/' ? 80 : 0
    );

    const tabsRef = useRef([pathname]);

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
        navigation(tabName);
    };

    const setTabPosition = useCallback(() => {
        if (isMounted.current) {
            const currentTab = tabsRef.current[activeTab];
            setTabBorderTop(currentTab?.offsetTop ?? 0);
            setTabBorderHeight(currentTab?.clientHeight ?? 0);
            isMounted.current = false;
        }
    }, [activeTab]);

    useEffect(() => {
        setTabPosition();
        window.addEventListener('resize', setTabPosition);

        return () => window.removeEventListener('resize', setTabPosition);
    }, [setTabPosition]);

    return (
        <aside className=" max-w-[160px] w-full sticky top-0 max-h-[100dvh] border-r  flex flex-col gap-10">
            <div className="px-2 py-6  flex gap-2 items-center justify-center">
                <HiNewspaper size={32} />
                <Typography variant="body1" fontWeight="bold">
                    Thready
                </Typography>
            </div>
            <nav className=" flex-1 flex flex-col gap-10 pt-0 pb-10 relative">
                <ul className="flex flex-col space-y-10">
                    {mainRoutes?.map((route) => {
                        return (
                            <li key={route.id}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            ref={(el) =>
                                                (tabsRef.current[route.url] =
                                                    el)
                                            }
                                            onClick={() =>
                                                handleTabChange(route.url)
                                            }
                                            className="w-full relative"
                                        >
                                            <div className="h-10 w-10 mx-auto rounded-sm aspect-square flex justify-start items-center">
                                                {pathname === route?.url ? (
                                                    <route.activeIcon
                                                        size={32}
                                                    />
                                                ) : (
                                                    <route.icon size={32} />
                                                )}
                                            </div>
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {route.name}
                                    </TooltipContent>
                                </Tooltip>
                            </li>
                        );
                    })}
                </ul>
                <span
                    style={{
                        top: tabBorderTop,
                        height: tabBorderHeight,
                    }}
                    className={
                        'absolute right-0 block w-1 bg-primary transition-all ease-out duration-300'
                    }
                />

                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            className="w-full relative"
                            onClick={() =>
                                setTheme(theme === 'dark' ? 'light' : 'dark')
                            }
                        >
                            <div className="h-10 w-10 mx-auto rounded-sm aspect-square flex justify-start items-center">
                                <HiOutlineMoon
                                    size={32}
                                    className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                                />
                                <HiOutlineSun
                                    size={32}
                                    className="rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 absolute"
                                />
                            </div>
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        {theme === 'dark' ? 'Light' : 'Dark'} Mode
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button className="mt-auto">
                            <div className="h-10 w-10 mx-auto rounded-sm aspect-square flex justify-start items-center mt-auto">
                                <HiOutlineLogout size={32} />
                            </div>
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>Sign Out</TooltipContent>
                </Tooltip>
            </nav>
        </aside>
    );
};

export default memo(Sidebar);
