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
    FormMessage,
    Separator,
    Spinner,
    Textarea,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    Typography,
} from '@/components/ui';
import useScreenSize from '@/hooks/useScreenSize';
import { toast } from '@/hooks/useToast';
import { formatDateTime, getInitials, postedAt, screens } from '@/lib/utils';
import {
    asycnThreadCommentDownVote,
    asycnThreadCommentNeutralVote,
    asycnThreadCommentUpVote,
    asycnThreadDetailDownVote,
    asycnThreadDetailNeutralVote,
    asycnThreadDetailUpVote,
    asyncCreateThreadDetailComment,
    asyncGetThreadDetail,
} from '@/store/reducers/thread-detail-reducer/action';
import { yupResolver } from '@hookform/resolvers/yup';
import parse from 'html-react-parser';
import { useCallback, useEffect, useRef } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import {
    HiArrowLeft,
    HiOutlineCalendar,
    HiOutlineChat,
    HiOutlineThumbDown,
    HiOutlineThumbUp,
    HiThumbDown,
    HiThumbUp,
} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

const schema = yup.object().shape({
    content: yup.string().required('Your comment must be filled'),
});

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

    const formMethods = useForm({
        defaultValues: {
            content: '',
        },
        resolver: yupResolver(schema),
    });

    const { handleSubmit, control, formState, reset } = formMethods;

    const { errors, isSubmitting } = formState;

    const handleSave = handleSubmit(async (formData) => {
        const payload = {
            threadId: threadDetail?.id,
            content: formData.content,
        };
        const response = await dispatch(
            asyncCreateThreadDetailComment(payload)
        );
        if (response) {
            reset({
                content: '',
            });
        }
    });

    const isUpVoted = useCallback(
        (upVotes = []) => upVotes?.includes(authUser?.id),
        [authUser?.id]
    );

    const isDownVoted = useCallback(
        (downVotes = []) => downVotes?.includes(authUser?.id),
        [authUser?.id]
    );

    const downVotes = threadDetail?.downVotesBy?.length || 0;
    const upVotes = threadDetail?.upVotesBy?.length || 0;

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
                                                {formatDateTime(
                                                    threadDetail.createdAt ||
                                                        new Date()
                                                )}
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
                                        <button
                                            onClick={() => {
                                                const alreadyUpVoted =
                                                    isUpVoted(
                                                        threadDetail?.upVotesBy
                                                    );
                                                if (!authUser) {
                                                    return toast({
                                                        title: 'Cannot do that',
                                                        description:
                                                            'You must login first to vote this thread',
                                                        variant: 'destructive',
                                                    });
                                                }
                                                if (alreadyUpVoted) {
                                                    return dispatch(
                                                        asycnThreadDetailNeutralVote(
                                                            {
                                                                threadId:
                                                                    threadDetail?.id,
                                                            }
                                                        )
                                                    );
                                                }
                                                return dispatch(
                                                    asycnThreadDetailUpVote({
                                                        threadId:
                                                            threadDetail?.id,
                                                    })
                                                );
                                            }}
                                            className="flex items-center gap-1.5 text-green-600"
                                        >
                                            {isUpVoted(
                                                threadDetail?.upVotesBy
                                            ) ? (
                                                <HiThumbUp size={18} />
                                            ) : (
                                                <HiOutlineThumbUp size={18} />
                                            )}

                                            <Typography variant="label">
                                                {upVotes}
                                            </Typography>
                                        </button>
                                        <button
                                            onClick={() => {
                                                const alreadyDownVoted =
                                                    isDownVoted(
                                                        threadDetail?.downVotesBy
                                                    );
                                                if (!authUser) {
                                                    return toast({
                                                        title: 'Cannot do that',
                                                        description:
                                                            'You must login first to vote this thread',
                                                        variant: 'destructive',
                                                    });
                                                }
                                                if (alreadyDownVoted) {
                                                    return dispatch(
                                                        asycnThreadDetailNeutralVote(
                                                            {
                                                                threadId:
                                                                    threadDetail?.id,
                                                            }
                                                        )
                                                    );
                                                }
                                                return dispatch(
                                                    asycnThreadDetailDownVote({
                                                        threadId:
                                                            threadDetail?.id,
                                                    })
                                                );
                                            }}
                                            className="flex items-center gap-1.5 text-red-600"
                                        >
                                            {isDownVoted(
                                                threadDetail?.downVotesBy
                                            ) ? (
                                                <HiThumbDown size={18} />
                                            ) : (
                                                <HiOutlineThumbDown size={18} />
                                            )}

                                            <Typography variant="label">
                                                {downVotes}
                                            </Typography>
                                        </button>
                                        <button className="flex items-center gap-1.5 cursor-auto">
                                            <HiOutlineChat size={18} />
                                            <Typography variant="label">
                                                {threadDetail?.totalComments ||
                                                    0}
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
                            <FormProvider {...formMethods}>
                                <form onSubmit={handleSave}>
                                    <CardHeader>
                                        <div className="flex items-center gap-3">
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

                                            <Typography variant="body1">
                                                Replying to{' '}
                                                {threadDetail?.owner?.name}
                                            </Typography>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <Controller
                                            name="content"
                                            control={control}
                                            render={({
                                                field: {
                                                    onChange,
                                                    value,
                                                    ...field
                                                },
                                            }) => {
                                                return (
                                                    <div className="flex flex-col w-full gap-2">
                                                        <Textarea
                                                            placeholder="Write your comment..."
                                                            {...field}
                                                            id="content"
                                                            onChange={(e) =>
                                                                onChange(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            value={value}
                                                        />
                                                        {errors?.content
                                                            ?.message && (
                                                            <FormMessage>
                                                                {
                                                                    errors
                                                                        ?.content
                                                                        ?.message
                                                                }
                                                            </FormMessage>
                                                        )}
                                                    </div>
                                                );
                                            }}
                                        />
                                    </CardContent>
                                    <CardFooter className="flex justify-end">
                                        <Button
                                            disabled={isSubmitting}
                                            className="self-end"
                                        >
                                            {isSubmitting
                                                ? 'Replying'
                                                : 'Reply'}
                                        </Button>
                                    </CardFooter>
                                </form>
                            </FormProvider>
                        </Card>
                    </section>
                )}
                {!loading && !error && (
                    <section className="py-6 px-8 flex flex-col gap-4">
                        <Typography variant="body1">Comments</Typography>
                        {/* Comment List */}
                        {threadDetail?.comments?.length > 0 ? (
                            threadDetail?.comments?.map((comment) => {
                                return (
                                    <Card key={comment?.id}>
                                        <CardHeader>
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarImage
                                                        src={
                                                            comment?.owner
                                                                ?.avatar
                                                        }
                                                    />
                                                    <AvatarFallback>
                                                        {getInitials(
                                                            comment?.owner?.name
                                                        )}
                                                    </AvatarFallback>
                                                </Avatar>

                                                <div>
                                                    <Typography variant="body1">
                                                        {comment?.owner?.name}
                                                    </Typography>
                                                    <Typography
                                                        className="text-gray-400"
                                                        variant="caption"
                                                    >
                                                        {formatDateTime(
                                                            comment?.createdAt
                                                        )}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            {parse(comment?.content || '-')}
                                        </CardContent>
                                        <CardFooter>
                                            <section className="flex items-center gap-3">
                                                <button
                                                    onClick={() => {
                                                        const alreadyUpVoted =
                                                            isUpVoted(
                                                                comment?.upVotesBy
                                                            );
                                                        if (!authUser) {
                                                            return toast({
                                                                title: 'Cannot do that',
                                                                description:
                                                                    'You must login first to vote this thread',
                                                                variant:
                                                                    'destructive',
                                                            });
                                                        }
                                                        if (alreadyUpVoted) {
                                                            return dispatch(
                                                                asycnThreadCommentNeutralVote(
                                                                    {
                                                                        threadId:
                                                                            threadDetail?.id,
                                                                        commentId:
                                                                            comment?.id,
                                                                    }
                                                                )
                                                            );
                                                        }
                                                        return dispatch(
                                                            asycnThreadCommentUpVote(
                                                                {
                                                                    threadId:
                                                                        threadDetail?.id,
                                                                    commentId:
                                                                        comment?.id,
                                                                }
                                                            )
                                                        );
                                                    }}
                                                    className="flex items-center gap-1.5 text-green-600"
                                                >
                                                    {isUpVoted(
                                                        comment?.upVotesBy
                                                    ) ? (
                                                        <HiThumbUp size={18} />
                                                    ) : (
                                                        <HiOutlineThumbUp
                                                            size={18}
                                                        />
                                                    )}

                                                    <Typography variant="label">
                                                        {comment?.upVotesBy
                                                            ?.length || 0}
                                                    </Typography>
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        const alreadyDownVoted =
                                                            isDownVoted(
                                                                comment?.downVotesBy
                                                            );
                                                        if (!authUser) {
                                                            return toast({
                                                                title: 'Cannot do that',
                                                                description:
                                                                    'You must login first to vote this thread',
                                                                variant:
                                                                    'destructive',
                                                            });
                                                        }
                                                        if (alreadyDownVoted) {
                                                            return dispatch(
                                                                asycnThreadCommentNeutralVote(
                                                                    {
                                                                        threadId:
                                                                            threadDetail?.id,
                                                                        commentId:
                                                                            comment?.id,
                                                                    }
                                                                )
                                                            );
                                                        }
                                                        return dispatch(
                                                            asycnThreadCommentDownVote(
                                                                {
                                                                    threadId:
                                                                        threadDetail?.id,
                                                                    commentId:
                                                                        comment?.id,
                                                                }
                                                            )
                                                        );
                                                    }}
                                                    className="flex items-center gap-1.5 text-red-600"
                                                >
                                                    {isDownVoted(
                                                        comment?.downVotesBy
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
                                                        {comment?.downVotesBy
                                                            ?.length || 0}
                                                    </Typography>
                                                </button>
                                            </section>
                                        </CardFooter>
                                    </Card>
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

export default ThreadDetail;
