import Sidebar from '@/components/shared/sidebar.jsx';
import TabBar from '@/components/shared/tab-bar.jsx';
import { Button, Separator, Spinner, Typography } from '@/components/ui';
import useScreenSize from '@/hooks/useScreenSize';
import { screens } from '@/lib/utils';
import { asyncGetThreadDetail } from '@/store/reducers/thread-detail-reducer/action';
import { memo, useCallback, useEffect, useRef } from 'react';
import { HiArrowLeft } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommentItem from './components/CommentItem';
import ThreadContent from './components/ThreadContent';
import CommentForm from './components/CommentForm';

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
                    <ThreadContent />
                )}
                <Separator />
                {authUser && !loading && !error && <CommentForm />}
                {!loading && !error && (
                    <section className="py-6 px-8 flex flex-col gap-4">
                        <Typography variant="body1">Comments</Typography>
                        {/* Comment List */}
                        {threadDetail?.comments?.length > 0 ? (
                            threadDetail?.comments?.map((comment) => {
                                return (
                                    <CommentItem
                                        key={comment.id}
                                        comment={comment}
                                    />
                                );
                            })
                        ) : (
                            <div className="flex items-center gap-3">
                                <Typography className="text-gray-500">
                                    There is no comment yet!
                                </Typography>
                                {!authUser && (
                                    <Typography>
                                        You must{' '}
                                        <Link
                                            to="/login"
                                            className="underline underline-offset-8"
                                        >
                                            Login
                                        </Link>{' '}
                                        first to post your comment!
                                    </Typography>
                                )}
                            </div>
                        )}
                    </section>
                )}
            </main>
            <TabBar />
        </div>
    );
}

export default memo(ThreadDetail);
