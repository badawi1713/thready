import Sidebar from '@/components/shared/sidebar.jsx';
import TabBar from '@/components/shared/tab-bar.jsx';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Spinner,
    Typography,
    badgeVariants,
} from '@/components/ui';
import useScreenSize from '@/hooks/useScreenSize';
import { screens } from '@/lib/utils';
import { asyncGetAllThreads } from '@/store/reducers/all-thread-reducer/action';
import { memo, useCallback, useEffect, useRef } from 'react';
import { HiArrowLeft, HiHashtag } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NewThreadForm from './components/NewThreadForm';
import Profile from './components/Profile';
import ThreadList from './components/ThreadList';
import Trending from './components/Trending';

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
    const categoryParams = searchParams.get('category') || '';

    const filteredThreads = categoryParams
        ? threads?.filter((thread) => thread?.category === categoryParams)
        : threads;

    const handleNavigate = (url) => {
        navigation(url);
    };

    const handleGoBack = () => {
        navigation('/');
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
                    {categoryParams ? (
                        <div>
                            <div className="flex items-center">
                                <Button
                                    onClick={handleGoBack}
                                    variant="link"
                                    className="flex items-center w-auto gap-2 p-0 text-lg"
                                >
                                    <HiArrowLeft size={18} />
                                    Threads
                                </Button>
                            </div>
                            <Typography variant="label">
                                With category: {categoryParams}
                            </Typography>
                        </div>
                    ) : (
                        <Typography variant="heading2">Home</Typography>
                    )}
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
                    <ThreadList />
                )}
            </main>
            <aside className="border-l py-6 px-8 lg:block hidden sticky top-0 min-h-full max-h-[100dvh] w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    {isMobileScreen ? (
                        <div className="rounded-sm dark:bg-slate-800 bg-slate-100 h-40 w-12 lg:w-80" />
                    ) : (
                        <>
                            {authUser && <Profile />}

                            {!loading && !error && <Trending />}
                        </>
                    )}
                </div>
            </aside>
            <TabBar />
        </div>
    );
}

export default memo(Home);
