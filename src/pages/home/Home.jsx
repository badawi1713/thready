import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Typography } from '@/components/ui/typography';
import { useTheme } from '@/context/theme-context/ThemeContext';
import useScreenSize from '@/hooks/useScreenSize';
import { screens } from '@/lib/utils';
import {
    HiNewspaper,
    HiOutlineHome,
    HiOutlineLogout,
    HiOutlineMoon,
    HiOutlineSun,
    HiOutlineTrendingUp,
} from 'react-icons/hi';

const Home = () => {
    const { setTheme, theme } = useTheme();

    console.log(theme);

    const screenSize = useScreenSize();
    const { width } = screenSize;
    const isMobileScreen = width <= screens.md;
    return (
        <div className="flex items-stretch min-h-[100dvh] md:container relative">
            {!isMobileScreen && (
                <aside className=" max-w-[160px] w-full sticky top-0 max-h-[100dvh] border-r  flex flex-col gap-10">
                    <div className="px-2 py-6  flex gap-2 items-center justify-center">
                        <HiNewspaper size={32} />
                        <Typography variant="body1" fontWeight="bold">
                            Thready
                        </Typography>
                    </div>
                    <section className=" flex-1 flex flex-col gap-10 pt-0 pb-10">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button className="w-full border-r-4 border-primary">
                                    <div className="h-10 w-10 mx-auto rounded-sm aspect-square flex justify-start items-center">
                                        <HiOutlineHome size={28} />
                                    </div>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>Home</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button className="w-full">
                                    <div className="h-10 w-10 mx-auto rounded-sm aspect-square flex justify-start items-center">
                                        <HiOutlineTrendingUp size={28} />
                                    </div>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>Leaderboard</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    className="w-full relative"
                                    onClick={() =>
                                        setTheme(
                                            theme === 'dark' ? 'light' : 'dark'
                                        )
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
                                        <HiOutlineLogout size={28} />
                                    </div>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>Sign Out</TooltipContent>
                        </Tooltip>
                    </section>
                </aside>
            )}
            <main className=" w-full flex-1 flex flex-col pb-20 md:pb-0 min-h-[100dvh]">
                <section className="py-6 px-8 md:sticky md:top-0 bg-background  border-b z-10">
                    <Typography variant="heading2">Home</Typography>
                </section>
                <section className="py-6 px-8 ">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage
                                        src="https://github.com/shadcn.png"
                                        alt="@shadcn"
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>

                                <Typography variant="body1">
                                    Whats on your thought?
                                </Typography>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <Textarea />
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button>Send</Button>
                        </CardFooter>
                    </Card>
                </section>
                <Separator />
                <section className="py-6 px-8 flex flex-col gap-10 mb-6">
                    <div className="rounded-sm dark:bg-slate-800 bg-slate-100 h-40 w-full" />
                    <div className="rounded-sm dark:bg-slate-800 bg-slate-100 h-40 w-full" />
                    <div className="rounded-sm dark:bg-slate-800 bg-slate-100 h-40 w-full" />
                    <div className="rounded-sm dark:bg-slate-800 bg-slate-100 h-40 w-full" />
                    <div className="rounded-sm dark:bg-slate-800 bg-slate-100 h-40 w-full" />
                    <div className="rounded-sm dark:bg-slate-800 bg-slate-100 h-40 w-full" />
                    <div className="rounded-sm dark:bg-slate-800 bg-slate-100 h-40 w-full" />
                    <div className="rounded-sm dark:bg-slate-800 bg-slate-100 h-40 w-full" />
                    <div className="rounded-sm dark:bg-slate-800 bg-slate-100 h-40 w-full" />
                    <div className="rounded-sm dark:bg-slate-800 bg-slate-100 h-40 w-full" />
                    <div className="rounded-sm dark:bg-slate-800 bg-slate-100 h-40 w-full" />
                </section>
            </main>
            <aside className="border-l py-6 px-8 lg:block hidden sticky top-0 min-h-full max-h-[100dvh]">
                <div className="flex flex-col gap-8">
                    {isMobileScreen ? (
                        <div className="rounded-sm dark:bg-slate-800 bg-slate-100 h-40 w-12 lg:w-80" />
                    ) : (
                        <>
                            <div className="rounded-sm dark:bg-slate-800 bg-slate-100 h-40 w-12 lg:w-80" />
                            <div className="rounded-sm dark:bg-slate-800 bg-slate-100 h-40 w-12 lg:w-80" />
                        </>
                    )}
                </div>
            </aside>
            {isMobileScreen && (
                <div className="flex items-baseline w-full fixed border-t shadow-sm dark:bg-slate-900 bg-white bottom-0 left-0 justify-around px-2">
                    <button className="flex flex-col items-center border-t-4 border-primary py-3">
                        <HiOutlineHome size={24} />
                        <Typography variant="label">Home</Typography>
                    </button>
                    <button className="flex flex-col items-center py-3">
                        <HiOutlineTrendingUp size={24} />
                        <Typography variant="label">Leaderboard</Typography>
                    </button>
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
                        <Typography variant="label">
                            {theme === 'dark' ? 'Light' : 'Dark'} Mode
                        </Typography>
                    </button>
                    <button className="flex flex-col items-center py-3">
                        <HiOutlineLogout size={24} />
                        <Typography variant="label">Signout</Typography>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Home;
