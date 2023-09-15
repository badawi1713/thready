import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Sidebar from '@/components/ui/sidebar';
import TabBar from '@/components/ui/tab-bar';
import { Textarea } from '@/components/ui/textarea';
import { Typography } from '@/components/ui/typography';
import useScreenSize from '@/hooks/useScreenSize';
import { screens } from '@/lib/utils';
import {
    HiHashtag,
    HiOutlineCalendar,
    HiOutlineChat,
    HiOutlineThumbDown,
    HiOutlineThumbUp,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Home = () => {
    const screenSize = useScreenSize();
    const { width } = screenSize;
    const isMobileScreen = width <= screens.md;

    return (
        <div className="flex items-stretch min-h-[100dvh] lg:container relative">
            {!isMobileScreen && <Sidebar />}
            <main className=" w-full flex-1 flex flex-col pb-20 md:pb-0 min-h-[100dvh]">
                <section className="py-6 px-8 md:sticky md:top-0 bg-background  border-b z-10">
                    <Typography variant="heading2">Home</Typography>
                </section>
                <section className="py-6 px-8 ">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage />
                                    <AvatarFallback>DB</AvatarFallback>
                                </Avatar>

                                <Typography variant="body1">
                                    Whats on your thought?
                                </Typography>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <Textarea placeholder="What's on your mind?" />
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button>Post</Button>
                        </CardFooter>
                    </Card>
                </section>
                <Separator />
                <section className="py-6 px-8 flex flex-col gap-10 mb-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Bagaimana pengalamanmu belajar Redux?
                            </CardTitle>
                            <div className="flex items-center gap-3 flex-wrap">
                                <Typography variant="label">
                                    @_dbadawi
                                </Typography>
                                •
                                <div className="flex items-center gap-1.5">
                                    <HiOutlineCalendar />
                                    <Typography variant="label">
                                        107 hari yang lalu
                                    </Typography>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p>
                                Coba ceritakan, gimana pengalaman kalian belajar
                                Redux di Dicoding?
                            </p>
                        </CardContent>
                        <CardFooter>
                            <div className="flex items-center w-full justify-between flex-wrap gap-3">
                                <section className="flex items-center gap-3">
                                    <button className="flex items-center gap-1.5 text-green-600">
                                        <HiOutlineThumbUp size={18} />
                                        <Typography variant="label">
                                            10
                                        </Typography>
                                    </button>
                                    <button className="flex items-center gap-1.5 text-red-600">
                                        <HiOutlineThumbDown size={18} />
                                        <Typography variant="label">
                                            0
                                        </Typography>
                                    </button>
                                    <button className="flex items-center gap-1.5">
                                        <HiOutlineChat size={18} />
                                        <Typography variant="label">
                                            0
                                        </Typography>
                                    </button>
                                </section>
                                <section className="flex items-center gap-3">
                                    <Badge variant="outline">#redux</Badge>
                                </section>
                            </div>
                        </CardFooter>
                    </Card>
                </section>
            </main>
            <aside className="border-l py-6 px-8 lg:block hidden sticky top-0 min-h-full max-h-[100dvh] w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    {isMobileScreen ? (
                        <div className="rounded-sm dark:bg-slate-800 bg-slate-100 h-40 w-12 lg:w-80" />
                    ) : (
                        <>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-normal">
                                        Profile
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between space-x-4">
                                        <div className="flex items-center space-x-4">
                                            <Avatar>
                                                <AvatarImage />
                                                <AvatarFallback>
                                                    DB
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium leading-none">
                                                    Dzaky Badawi
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    dzaky.badawi@gmail.com
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-1 font-normal">
                                        <HiHashtag /> Trending
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <Link
                                            to="/?category=redux"
                                            className={badgeVariants('default')}
                                        >
                                            #redux
                                        </Link>
                                        <Badge variant="outline">#ramen</Badge>
                                        <Badge variant="outline">
                                            #slice_of_life
                                        </Badge>
                                        <Badge variant="outline">#gunpla</Badge>
                                        <Badge variant="outline">
                                            #how_i_met_your_mother
                                        </Badge>
                                        <Badge variant="outline">
                                            #how_to_train_your_dragapult
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    )}
                </div>
            </aside>
            <TabBar />
        </div>
    );
};

export default Home;
