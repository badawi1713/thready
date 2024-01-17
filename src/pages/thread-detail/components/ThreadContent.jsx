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
    asycnThreadDetailDownVote,
    asycnThreadDetailNeutralVote,
    asycnThreadDetailUpVote,
} from '@/store/reducers/thread-detail-reducer/action';
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
import { Link } from 'react-router-dom';

function ThreadContent() {
    const dispatch = useDispatch();

    const authUser = useSelector((state) => state?.authUserReducer);
    const { threadDetail } = useSelector((state) => state?.threadDetailReducer);

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

    return (
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
                                        {postedAt(threadDetail?.createdAt)}
                                    </Typography>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {formatDateTime(
                                        threadDetail.createdAt || new Date()
                                    )}
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>{parse(threadDetail?.body)}</CardContent>
                <CardFooter>
                    <div className="flex items-center w-full justify-between flex-wrap gap-3">
                        <section className="flex items-center gap-3">
                            <button
                                onClick={() => {
                                    const alreadyUpVoted = isUpVoted(
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
                                            asycnThreadDetailNeutralVote({
                                                threadId: threadDetail?.id,
                                            })
                                        );
                                    }
                                    return dispatch(
                                        asycnThreadDetailUpVote({
                                            threadId: threadDetail?.id,
                                        })
                                    );
                                }}
                                className="flex items-center gap-1.5 text-green-600"
                            >
                                {isUpVoted(threadDetail?.upVotesBy) ? (
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
                                    const alreadyDownVoted = isDownVoted(
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
                                            asycnThreadDetailNeutralVote({
                                                threadId: threadDetail?.id,
                                            })
                                        );
                                    }
                                    return dispatch(
                                        asycnThreadDetailDownVote({
                                            threadId: threadDetail?.id,
                                        })
                                    );
                                }}
                                className="flex items-center gap-1.5 text-red-600"
                            >
                                {isDownVoted(threadDetail?.downVotesBy) ? (
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
                                    {threadDetail?.totalComments || 0}
                                </Typography>
                            </button>
                        </section>
                        {threadDetail?.category && (
                            <section className="flex items-center gap-3">
                                <Link
                                    to={`/?category=${threadDetail?.category}`}
                                >
                                    <Badge variant="outline">
                                        #{threadDetail?.category}
                                    </Badge>
                                </Link>
                            </section>
                        )}
                    </div>
                </CardFooter>
            </Card>
        </section>
    );
}

export default memo(ThreadContent);
