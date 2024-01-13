import Sidebar from '@/components/shared/sidebar.jsx';
import TabBar from '@/components/shared/tab-bar.jsx';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Badge,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    Spinner,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    Typography,
    badgeVariants,
} from '@/components/ui';
import useScreenSize from '@/hooks/useScreenSize';
import { toast } from '@/hooks/useToast';
import { getInitials, postedAt, screens } from '@/lib/utils';
import {
    asycnThreadsDownVote,
    asycnThreadsNeutralVote,
    asycnThreadsUpVote,
    asyncGetAllThreads,
} from '@/store/reducers/all-thread-reducer/action';
import parse from 'html-react-parser';
import { memo, useCallback, useEffect, useRef } from 'react';
import {
    HiHashtag,
    HiOutlineCalendar,
    HiOutlineChat,
    HiOutlineThumbDown,
    HiOutlineThumbUp,
    HiThumbDown,
    HiThumbUp,
} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import NewThreadForm from './components/NewThreadForm';

function Home() {
    const isMounted = useRef(true);
    const dispatch = useDispatch();
    const screenSize = useScreenSize();
    const { width } = screenSize;
    const isMobileScreen = width <= screens.md;
    const navigation = useNavigate();

    const authUser = useSelector((state) => state?.authUserReducer);
    const { loading, error, threads } = useSelector(
        (state) => state?.allThreadReducer
    );
    const categoryList = useSelector((state) => state.categoryListReducer);

    const searchParams = new URLSearchParams(window.location.search);
    const categoryParams = searchParams.get('category');

    const filteredThreads = categoryParams
        ? threads?.filter((thread) => thread?.category === categoryParams)
        : threads;

    const isUpVoted = useCallback(
        (upVotes = []) => upVotes?.includes(authUser?.id),
        [authUser?.id]
    );

    const isDownVoted = useCallback(
        (downVotes = []) => downVotes?.includes(authUser?.id),
        [authUser?.id]
    );

    const handleNavigate = (url) => {
        navigation(url);
    };

    const getAllThreads = useCallback(() => {
        dispatch(asyncGetAllThreads());
    }, [dispatch]);

    useEffect(() => {
        if (isMounted.current) {
            getAllThreads();
            isMounted.current = false;
        }
    }, [getAllThreads]);

    return (
        <div className="flex items-stretch min-h-[100dvh] 2xl:container relative">
            {!isMobileScreen && <Sidebar />}
            <main className=" w-full flex-1 flex flex-col pb-20 md:pb-0 min-h-[100dvh]">
                <section className="py-6 px-8 md:sticky md:top-0 bg-background  border-b z-10">
                    <Typography variant="heading2">Home</Typography>
                </section>
                {!loading && !error && (
                    <section className="py-6 px-8 border-b lg:hidden">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-1 font-normal">
                                    <HiHashtag /> Trending
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2 flex-wrap">
                                    {categoryList?.length < 1 ? (
                                        <Typography
                                            variant="body1"
                                            className=" text-primary text-center"
                                        >
                                            Sorry, there is no something
                                            trending right now!
                                        </Typography>
                                    ) : (
                                        categoryList?.map((category) => {
                                            return (
                                                <button
                                                    key={category}
                                                    onClick={() => {
                                                        const url =
                                                            categoryParams ===
                                                            category
                                                                ? '/'
                                                                : `/?category=${category}`;
                                                        handleNavigate(url);
                                                    }}
                                                    className={badgeVariants({
                                                        variant:
                                                            categoryParams ===
                                                            category
                                                                ? 'default'
                                                                : 'outline',
                                                    })}
                                                >
                                                    #{category}
                                                </button>
                                            );
                                        })
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                )}
                {authUser && <NewThreadForm />}
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
                ) : filteredThreads?.length < 1 ? (
                    <section className="py-6 px-8 flex justify-center items-center mb-6">
                        <Typography
                            variant="body1"
                            className=" text-primary text-center"
                        >
                            Sorry, there is no threads available now!
                        </Typography>
                    </section>
                ) : (
                    <section className="py-6 px-8 flex flex-col gap-10 mb-6">
                        {filteredThreads?.map((thread) => {
                            const downVotes = thread.downVotesBy.length || 0;
                            const upVotes = thread.upVotesBy.length || 0;
                            return (
                                <Card key={thread?.id}>
                                    <CardHeader>
                                        <Link to={`/thread/${thread?.id}`}>
                                            <CardTitle>
                                                {thread?.title}
                                            </CardTitle>
                                        </Link>
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <Typography variant="label">
                                                {thread?.ownerId}
                                            </Typography>
                                            •
                                            <div className="flex items-center gap-1.5">
                                                <HiOutlineCalendar />
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <Typography variant="label">
                                                            {postedAt(
                                                                thread?.createdAt
                                                            )}
                                                        </Typography>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        {thread.createdAt}
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="line-clamp-4">
                                            {parse(thread?.body)}
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <div className="flex items-center w-full justify-between flex-wrap gap-3">
                                            <section className="flex items-center gap-3">
                                                <button
                                                    onClick={() => {
                                                        const alreadyUpVoted =
                                                            isUpVoted(
                                                                thread?.upVotesBy
                                                            );
                                                        if (!authUser) {
                                                            return toast({
                                                                title: 'Cannot do that',
                                                                description:
                                                                    'You must login first to like this thread',
                                                                variant:
                                                                    'destructive',
                                                            });
                                                        }
                                                        if (alreadyUpVoted) {
                                                            return dispatch(
                                                                asycnThreadsNeutralVote(
                                                                    {
                                                                        threadId:
                                                                            thread.id,
                                                                    }
                                                                )
                                                            );
                                                        }
                                                        return dispatch(
                                                            asycnThreadsUpVote({
                                                                threadId:
                                                                    thread?.id,
                                                            })
                                                        );
                                                    }}
                                                    className="flex items-center gap-1.5 text-green-600"
                                                >
                                                    {isUpVoted(
                                                        thread?.upVotesBy
                                                    ) ? (
                                                        <HiThumbUp size={18} />
                                                    ) : (
                                                        <HiOutlineThumbUp
                                                            size={18}
                                                        />
                                                    )}

                                                    <Typography variant="label">
                                                        {upVotes}
                                                    </Typography>
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        const alreadyDownVoted =
                                                            isDownVoted(
                                                                thread?.downVotesBy
                                                            );
                                                        if (!authUser) {
                                                            return toast({
                                                                title: 'Cannot do that',
                                                                description:
                                                                    'You must login first to like this thread',
                                                                variant:
                                                                    'destructive',
                                                            });
                                                        }
                                                        if (alreadyDownVoted) {
                                                            return dispatch(
                                                                asycnThreadsNeutralVote(
                                                                    {
                                                                        threadId:
                                                                            thread.id,
                                                                    }
                                                                )
                                                            );
                                                        }
                                                        return dispatch(
                                                            asycnThreadsDownVote(
                                                                {
                                                                    threadId:
                                                                        thread?.id,
                                                                }
                                                            )
                                                        );
                                                    }}
                                                    className="flex items-center gap-1.5 text-red-600"
                                                >
                                                    {isDownVoted(
                                                        thread?.downVotesBy
                                                    ) ? (
                                                        <HiThumbDown
                                                            size={18}
                                                        />
                                                    ) : (
                                                        <HiOutlineThumbDown
                                                            size={18}
                                                        />
                                                    )}

                                                    <Typography variant="label">
                                                        {downVotes}
                                                    </Typography>
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleNavigate(
                                                            `/thread/${thread?.id}`
                                                        )
                                                    }
                                                    className="flex items-center gap-1.5"
                                                >
                                                    <HiOutlineChat size={18} />
                                                    <Typography variant="label">
                                                        {thread?.totalComments ||
                                                            0}
                                                    </Typography>
                                                </button>
                                            </section>
                                            {thread?.category && (
                                                <section className="flex items-center gap-3">
                                                    <Badge variant="outline">
                                                        #{thread?.category}
                                                    </Badge>
                                                </section>
                                            )}
                                        </div>
                                    </CardFooter>
                                </Card>
                            );
                        })}
                    </section>
                )}
            </main>
            <aside className="border-l py-6 px-8 lg:block hidden sticky top-0 min-h-full max-h-[100dvh] w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    {isMobileScreen ? (
                        <div className="rounded-sm dark:bg-slate-800 bg-slate-100 h-40 w-12 lg:w-80" />
                    ) : (
                        <>
                            {authUser && (
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
                                                    <AvatarImage
                                                        src={authUser?.avatar}
                                                    />
                                                    <AvatarFallback>
                                                        {getInitials(
                                                            authUser?.name
                                                        )}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-medium uppercase leading-none">
                                                        {authUser?.name ||
                                                            'Unknown'}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {authUser?.email ||
                                                            'Email is unavailable'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {!loading && !error && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-1 font-normal">
                                            <HiHashtag /> Trending
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            {categoryList?.length < 1 ? (
                                                <Typography
                                                    variant="body1"
                                                    className=" text-primary text-center"
                                                >
                                                    Sorry, there is no something
                                                    trending right now!
                                                </Typography>
                                            ) : (
                                                categoryList?.map(
                                                    (category) => {
                                                        return (
                                                            <button
                                                                key={category}
                                                                onClick={() => {
                                                                    const url =
                                                                        categoryParams ===
                                                                        category
                                                                            ? '/'
                                                                            : `/?category=${category}`;
                                                                    handleNavigate(
                                                                        url
                                                                    );
                                                                }}
                                                                className={badgeVariants(
                                                                    {
                                                                        variant:
                                                                            categoryParams ===
                                                                            category
                                                                                ? 'default'
                                                                                : 'outline',
                                                                    }
                                                                )}
                                                            >
                                                                #{category}
                                                            </button>
                                                        );
                                                    }
                                                )
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </>
                    )}
                </div>
            </aside>
            <TabBar />
        </div>
    );
}

export default memo(Home);
