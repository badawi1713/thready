import useScreenSize from '@/hooks/useScreenSize';
import { getInitials, screens } from '@/lib/utils';
import {
    HiArrowLeft,
    HiOutlineCalendar,
    HiOutlineChat,
    HiOutlineThumbDown,
    HiOutlineThumbUp,
} from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Sidebar from '@/components/shared/sidebar.jsx';
import TabBar from '@/components/shared/tab-bar.jsx';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Badge,
    Button,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    Separator,
    Textarea,
    Typography,
} from '@/components/ui';

function ThreadDetail() {
    const screenSize = useScreenSize();
    const { width } = screenSize;
    const isMobileScreen = width <= screens.md;
    const navigation = useNavigate();
    const authUser = useSelector((state) => state?.authUserReducer);

    const handleGoBack = () => {
        navigation('/');
    };

    return (
        <div className="flex items-stretch min-h-[100dvh] 2xl:container relative">
            {!isMobileScreen && <Sidebar />}
            <main className=" w-full flex-1 flex flex-col pb-20 md:pb-0 min-h-[100dvh]">
                <section className="py-6 px-8 sticky top-0 bg-background  border-b z-10">
                    <Button
                        onClick={handleGoBack}
                        variant="link"
                        className="flex items-center w-auto gap-2 p-0 text-lg"
                    >
                        <HiArrowLeft size={18} />
                        Thread
                    </Button>
                </section>

                <section className="py-6 px-8 flex flex-col gap-10">
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
                <Separator />
                {authUser && (
                    <section className="py-6 px-8 border-b">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={authUser?.avatar} />
                                        <AvatarFallback>
                                            {getInitials(authUser?.name)}
                                        </AvatarFallback>
                                    </Avatar>

                                    <Typography variant="body1">
                                        Replying to @_dbadawi
                                    </Typography>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <form>
                                    <Textarea placeholder="Post your reply" />
                                </form>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Button>Reply</Button>
                            </CardFooter>
                        </Card>
                    </section>
                )}
                <section className="py-6 px-8 flex flex-col gap-4">
                    <Typography variant="body1">Comments</Typography>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2 flex-wrap">
                                <Avatar>
                                    <AvatarImage />
                                    <AvatarFallback>DB</AvatarFallback>
                                </Avatar>
                                <div>
                                    <Typography variant="label">
                                        @_dbadawi
                                    </Typography>
                                    <div className="flex items-center gap-1.5">
                                        <HiOutlineCalendar />
                                        <Typography variant="caption">
                                            107 hari yang lalu
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p>Halo, saya ikutan komentar di sini!</p>
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
                                </section>
                            </div>
                        </CardFooter>
                    </Card>
                </section>
            </main>
            <TabBar />
        </div>
    );
}

export default ThreadDetail;
