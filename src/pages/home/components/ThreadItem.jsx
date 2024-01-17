import {
    Badge,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    Typography,
} from '@/components/ui';
import { toast } from '@/hooks/useToast';
import { formatDateTime, postedAt } from '@/lib/utils';
import {
    asycnThreadsDownVote,
    asycnThreadsNeutralVote,
    asycnThreadsUpVote,
} from '@/store/reducers/all-thread-reducer/action';
import parse from 'html-react-parser';
import { memo, useCallback } from 'react';
import {
    HiOutlineCalendar,
    HiOutlineChat,
    HiOutlineThumbDown,
    HiOutlineThumbUp,
    HiThumbDown,
    HiThumbUp,
} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ThreadItem({ thread = null, downVotes = 0, upVotes = 0 }) {
    const dispatch = useDispatch();
    const navigation = useNavigate();

    const authUser = useSelector((state) => state?.authUserReducer);

    const isUpVoted = useCallback(
        (upVotesData = []) => upVotesData?.includes(authUser?.id),
        [authUser?.id]
    );

    const isDownVoted = useCallback(
        (downVotesData = []) => downVotesData?.includes(authUser?.id),
        [authUser?.id]
    );

    const handleNavigate = (url) => {
        navigation(url);
    };
    return (
        <Card key={thread?.id}>
            <CardHeader>
                <Link to={`/thread/${thread?.id}`}>
                    <CardTitle>{thread?.title}</CardTitle>
                </Link>
                <div className="flex items-center gap-3 flex-wrap">
                    <Typography variant="label">{thread?.ownerId}</Typography>•
                    <div className="flex items-center gap-1.5">
                        <HiOutlineCalendar />
                        <Tooltip>
                            <TooltipTrigger>
                                <Typography variant="label">
                                    {postedAt(thread?.createdAt)}
                                </Typography>
                            </TooltipTrigger>
                            <TooltipContent>
                                {formatDateTime(thread.createdAt)}
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="line-clamp-4">{parse(thread?.body)}</div>
            </CardContent>
            <CardFooter>
                <div className="flex items-center w-full justify-between flex-wrap gap-3">
                    <section className="flex items-center gap-3">
                        <button
                            onClick={() => {
                                const alreadyUpVoted = isUpVoted(
                                    thread?.upVotesBy
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
                                        asycnThreadsNeutralVote({
                                            threadId: thread.id,
                                        })
                                    );
                                }
                                return dispatch(
                                    asycnThreadsUpVote({
                                        threadId: thread?.id,
                                    })
                                );
                            }}
                            className="flex items-center gap-1.5 text-green-600"
                        >
                            {isUpVoted(thread?.upVotesBy) ? (
                                <HiThumbUp size={18} />
                            ) : (
                                <HiOutlineThumbUp size={18} />
                            )}

                            <Typography variant="label">{upVotes}</Typography>
                        </button>
                        <button
                            onClick={() => {
                                const alreadyDownVoted = isDownVoted(
                                    thread?.downVotesBy
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
                                        asycnThreadsNeutralVote({
                                            threadId: thread.id,
                                        })
                                    );
                                }
                                return dispatch(
                                    asycnThreadsDownVote({
                                        threadId: thread?.id,
                                    })
                                );
                            }}
                            className="flex items-center gap-1.5 text-red-600"
                        >
                            {isDownVoted(thread?.downVotesBy) ? (
                                <HiThumbDown size={18} />
                            ) : (
                                <HiOutlineThumbDown size={18} />
                            )}

                            <Typography variant="label">{downVotes}</Typography>
                        </button>
                        <button
                            onClick={() =>
                                handleNavigate(`/thread/${thread?.id}`)
                            }
                            className="flex items-center gap-1.5"
                        >
                            <HiOutlineChat size={18} />
                            <Typography variant="label">
                                {thread?.totalComments || 0}
                            </Typography>
                        </button>
                    </section>
                    {thread?.category && (
                        <section className="flex items-center gap-3">
                            <Link to={`/?category=${thread?.category}`}>
                                <Badge variant="outline">
                                    #{thread?.category}
                                </Badge>
                            </Link>
                        </section>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}

ThreadItem.propTypes = {
    thread: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        ownerId: PropTypes.string.isRequired,
        upVotesBy: PropTypes.arrayOf(PropTypes.string),
        downVotesBy: PropTypes.arrayOf(PropTypes.string),
        totalComments: PropTypes.number,
        category: PropTypes.string,
    }).isRequired,
    downVotes: PropTypes.number.isRequired,
    upVotes: PropTypes.number.isRequired,
};

export default memo(ThreadItem);
