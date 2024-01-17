import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    Typography,
} from '@/components/ui';
import { toast } from '@/hooks/useToast';
import { formatDateTime, getInitials } from '@/lib/utils';
import {
    asycnThreadCommentDownVote,
    asycnThreadCommentNeutralVote,
    asycnThreadCommentUpVote,
} from '@/store/reducers/thread-detail-reducer/action';
import parse from 'html-react-parser';
import { memo, useCallback } from 'react';
import {
    HiOutlineThumbDown,
    HiOutlineThumbUp,
    HiThumbDown,
    HiThumbUp,
} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function CommentItem({ comment = null }) {
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

    return (
        <Card key={comment?.id}>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={comment?.owner?.avatar} />
                        <AvatarFallback>
                            {getInitials(comment?.owner?.name)}
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <Typography variant="body1">
                            {comment?.owner?.name}
                        </Typography>
                        <Typography className="text-gray-400" variant="caption">
                            {formatDateTime(comment?.createdAt)}
                        </Typography>
                    </div>
                </div>
            </CardHeader>
            <CardContent>{parse(comment?.content || '-')}</CardContent>
            <CardFooter>
                <section className="flex items-center gap-3">
                    <button
                        onClick={() => {
                            const alreadyUpVoted = isUpVoted(
                                comment?.upVotesBy
                            );
                            if (!authUser) {
                                return toast({
                                    title: 'Cannot do that',
                                    description:
                                        'You must login first to vote this comment',
                                    variant: 'destructive',
                                });
                            }
                            if (alreadyUpVoted) {
                                return dispatch(
                                    asycnThreadCommentNeutralVote({
                                        threadId: threadDetail?.id,
                                        commentId: comment?.id,
                                    })
                                );
                            }
                            return dispatch(
                                asycnThreadCommentUpVote({
                                    threadId: threadDetail?.id,
                                    commentId: comment?.id,
                                })
                            );
                        }}
                        className="flex items-center gap-1.5 text-green-600"
                    >
                        {isUpVoted(comment?.upVotesBy) ? (
                            <HiThumbUp size={18} />
                        ) : (
                            <HiOutlineThumbUp size={18} />
                        )}

                        <Typography variant="label">
                            {comment?.upVotesBy?.length || 0}
                        </Typography>
                    </button>
                    <button
                        onClick={() => {
                            const alreadyDownVoted = isDownVoted(
                                comment?.downVotesBy
                            );
                            if (!authUser) {
                                return toast({
                                    title: 'Cannot do that',
                                    description:
                                        'You must login first to vote this comment',
                                    variant: 'destructive',
                                });
                            }
                            if (alreadyDownVoted) {
                                return dispatch(
                                    asycnThreadCommentNeutralVote({
                                        threadId: threadDetail?.id,
                                        commentId: comment?.id,
                                    })
                                );
                            }
                            return dispatch(
                                asycnThreadCommentDownVote({
                                    threadId: threadDetail?.id,
                                    commentId: comment?.id,
                                })
                            );
                        }}
                        className="flex items-center gap-1.5 text-red-600"
                    >
                        {isDownVoted(comment?.downVotesBy) ? (
                            <HiThumbDown size={18} />
                        ) : (
                            <HiOutlineThumbDown size={18} />
                        )}

                        <Typography variant="label">
                            {comment?.downVotesBy?.length || 0}
                        </Typography>
                    </button>
                </section>
            </CardFooter>
        </Card>
    );
}

export default memo(CommentItem);

CommentItem.propTypes = {
    comment: PropTypes.shape({
        id: PropTypes.string,
        content: PropTypes.string,
        createdAt: PropTypes.string,
        owner: PropTypes.shape({
            name: PropTypes.string,
            avatar: PropTypes.string,
        }),
        upVotesBy: PropTypes.arrayOf(PropTypes.string),
        downVotesBy: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
};
