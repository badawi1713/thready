import useScreenSize from '@/hooks/useScreenSize';
import { getInitials, postedAt, screens } from '@/lib/utils';
import {
    HiArrowLeft,
    HiOutlineCalendar,
    HiOutlineChat,
    HiOutlineThumbDown,
    HiOutlineThumbUp,
} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
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
    Spinner,
    Textarea,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    Typography,
} from '@/components/ui';
import { useCallback, useEffect, useRef } from 'react';
import { asyncGetThreadDetail } from '@/store/reducers/thread-detail-reducer/action';

function ThreadDetail() {
    const dispatch = useDispatch();
    const screenSize = useScreenSize();
    const { width } = screenSize;
    const isMobileScreen = width <= screens.md;
    const navigation = useNavigate();
    const { id } = useParams();

    const authUser = useSelector((state) => state?.authUserReducer);
    const { loading, error, threadDetail } = useSelector(
        (state) => state?.threadDetailReducer
    );

    console.log(threadDetail);

    const isMounted = useRef(true);

    const handleGoBack = () => {
        navigation('/');
    };

    const getThreadDetail = useCallback(() => {
        dispatch(asyncGetThreadDetail(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (isMounted.current) {
            getThreadDetail();
            isMounted.current = false;
        }
    }, [getThreadDetail]);

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

                {loading ? (
                    <div className="py-6 px-8 flex flex-col justify-center items-center">
                        <Spinner />
                    </div>
                ) : error ? (
                    <section className="py-6 px-8 flex justify-center items-center mb-6">
                        <Typography
                            variant="body1"
                            className=" text-destructive text-center"
                        >
                            {error || 'Oops.. sorry, something went wrong!'}
                        </Typography>
                    </section>
                ) : (
                    <section className="py-6 px-8 flex flex-col gap-10">
                        <Card>
                            <CardHeader>
                                <CardTitle>{threadDetail?.title}</CardTitle>
                                <div className="flex items-center gap-3 flex-wrap">
                                    <Typography variant="label">
                                        {threadDetail?.owner?.name}
                                    </Typography>
                                    •
                                    <div className="flex items-center gap-1.5">
                                        <HiOutlineCalendar />
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Typography variant="label">
                                                    {postedAt(
                                                        threadDetail?.createdAt
                                                    )}
                                                </Typography>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                {threadDetail.createdAt}
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {parse(threadDetail?.body)}
                            </CardContent>
                            <CardFooter>
                                <div className="flex items-center w-full justify-between flex-wrap gap-3">
                                    <section className="flex items-center gap-3">
                                        <button className="flex items-center gap-1.5 text-green-600">
                                            <HiOutlineThumbUp size={18} />
                                            <Typography variant="label">
                                                {threadDetail?.upVotesBy
                                                    ?.length || 0}
                                            </Typography>
                                        </button>
                                        <button className="flex items-center gap-1.5 text-red-600">
                                            <HiOutlineThumbDown size={18} />
                                            <Typography variant="label">
                                                {threadDetail?.downVotesBy
                                                    ?.length || 0}
                                            </Typography>
                                        </button>
                                        <button className="flex items-center gap-1.5">
                                            <HiOutlineChat size={18} />
                                            <Typography variant="label">
                                                {threadDetail?.comments
                                                    ?.length || 0}
                                            </Typography>
                                        </button>
                                    </section>
                                    {threadDetail?.category && (
                                        <section className="flex items-center gap-3">
                                            <Badge variant="outline">
                                                #{threadDetail?.category}
                                            </Badge>
                                        </section>
                                    )}
                                </div>
                            </CardFooter>
                        </Card>
                    </section>
                )}
                <Separator />
                {authUser && !loading && !error && (
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
                                        Replying to {threadDetail?.owner?.name}
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
                {!loading && !error && (
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
                )}
            </main>
            <TabBar />
        </div>
    );
}

export default ThreadDetail;
