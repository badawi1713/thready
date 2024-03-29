import threadServices from '@/lib/services/thread-services';

const actionTypes = {
    GET_THREAD_DETAIL_PENDING: 'GET_THREAD_DETAIL_PENDING',
    GET_THREAD_DETAIL_SUCCESS: 'GET_THREAD_DETAIL_SUCCESS',
    GET_THREAD_DETAIL_FAILED: 'GET_THREAD_DETAIL_FAILED',
    POST_THREAD_DETAIL_UP_VOTE: 'POST_THREAD_DETAIL_UP_VOTE',
    POST_THREAD_DETAIL_DOWN_VOTE: 'POST_THREAD_DETAIL_DOWN_VOTE',
    POST_THREAD_DETAIL_NEUTRAL_VOTE: 'POST_THREAD_DETAIL_NEUTRAL_VOTE',
    POST_THREAD_DETAIL_COMMENT: 'POST_THREAD_DETAIL_COMMENT',
    POST_THREAD_COMMENT_UP_VOTE: 'POST_THREAD_COMMENT_UP_VOTE',
    POST_THREAD_COMMENT_DOWN_VOTE: 'POST_THREAD_COMMENT_DOWN_VOTE',
    POST_THREAD_COMMENT_NEUTRAL_VOTE: 'POST_THREAD_COMMENT_NEUTRAL_VOTE',
};

const handleThreadDetailUpVoteActionCreator = ({
    threadId = '',
    userId = '',
}) => {
    return {
        type: actionTypes.POST_THREAD_DETAIL_UP_VOTE,
        payload: {
            threadId,
            userId,
        },
    };
};

const handleThreadDetailDownVoteActionCreator = ({
    threadId = '',
    userId = '',
}) => {
    return {
        type: actionTypes.POST_THREAD_DETAIL_DOWN_VOTE,
        payload: {
            threadId,
            userId,
        },
    };
};

const handleThreadDetailNeutralVoteActionCreator = ({
    threadId = '',
    userId = '',
}) => {
    return {
        type: actionTypes.POST_THREAD_DETAIL_NEUTRAL_VOTE,
        payload: {
            threadId,
            userId,
        },
    };
};

const handleThreadCommentUpVoteActionCreator = ({
    commentId = '',
    userId = '',
}) => {
    return {
        type: actionTypes.POST_THREAD_COMMENT_UP_VOTE,
        payload: {
            commentId,
            userId,
        },
    };
};

const handleThreadCommentDownVoteActionCreator = ({
    commentId = '',
    userId = '',
}) => {
    return {
        type: actionTypes.POST_THREAD_COMMENT_DOWN_VOTE,
        payload: {
            userId,
            commentId,
        },
    };
};

const handleThreadCommentNeutralVoteActionCreator = ({
    commentId = '',
    userId = '',
}) => {
    return {
        type: actionTypes.POST_THREAD_COMMENT_NEUTRAL_VOTE,
        payload: {
            commentId,
            userId,
        },
    };
};

const handleCreateThreadDetailCommentActionCreator = ({
    threadId = '',
    comment = null,
}) => {
    return {
        type: actionTypes.POST_THREAD_DETAIL_COMMENT,
        payload: {
            threadId,
            comment,
        },
    };
};

const asycnThreadDetailUpVote = ({ threadId = '' }) => {
    return async (dispatch, getState) => {
        const { authUserReducer } = getState();
        dispatch(
            handleThreadDetailNeutralVoteActionCreator({
                threadId,
                userId: authUserReducer.id,
            })
        );
        dispatch(
            handleThreadDetailUpVoteActionCreator({
                threadId,
                userId: authUserReducer.id,
            })
        );
        try {
            await threadServices.postThreadUpVote(threadId);
        } catch (error) {
            dispatch(
                handleThreadDetailNeutralVoteActionCreator({
                    threadId: '',
                    userId: authUserReducer.id,
                })
            );
        }
    };
};

const asycnThreadDetailNeutralVote = ({ threadId = '' }) => {
    return async (dispatch, getState) => {
        const { authUserReducer } = getState();
        dispatch(
            handleThreadDetailNeutralVoteActionCreator({
                threadId,
                userId: authUserReducer.id,
            })
        );
        try {
            await threadServices.postThreadNeutralVote(threadId);
        } catch (error) {
            dispatch(
                handleThreadDetailNeutralVoteActionCreator({
                    threadId: '',
                    userId: authUserReducer.id,
                })
            );
        }
    };
};

const asycnThreadDetailDownVote = ({ threadId = '' }) => {
    return async (dispatch, getState) => {
        const { authUserReducer } = getState();
        dispatch(
            handleThreadDetailNeutralVoteActionCreator({
                threadId,
                userId: authUserReducer.id,
            })
        );
        dispatch(
            handleThreadDetailDownVoteActionCreator({
                threadId,
                userId: authUserReducer.id,
            })
        );
        try {
            await threadServices.postThreadDownVote(threadId);
        } catch (error) {
            dispatch(
                handleThreadDetailNeutralVoteActionCreator({
                    threadId,
                    userId: authUserReducer.id,
                })
            );
        }
    };
};

const asyncCreateThreadDetailComment = ({ threadId = '', content = '' }) => {
    return async (dispatch) => {
        try {
            const response = await threadServices.postThreadDetailComment(
                threadId,
                content
            );
            dispatch(
                handleCreateThreadDetailCommentActionCreator({
                    threadId,
                    comment: response,
                })
            );
            return true;
        } catch (error) {
            return false;
        }
    };
};

const asycnThreadCommentUpVote = ({ threadId = '', commentId = '' }) => {
    return async (dispatch, getState) => {
        const { authUserReducer } = getState();
        dispatch(
            handleThreadCommentNeutralVoteActionCreator({
                commentId,
                userId: authUserReducer.id,
            })
        );
        dispatch(
            handleThreadCommentUpVoteActionCreator({
                commentId,
                userId: authUserReducer.id,
            })
        );
        try {
            await threadServices.postThreadCommentUpVote(threadId, commentId);
        } catch (error) {
            dispatch(
                handleThreadCommentNeutralVoteActionCreator({
                    commentId: '',
                    userId: authUserReducer.id,
                })
            );
        }
    };
};

const asycnThreadCommentNeutralVote = ({ threadId = '', commentId }) => {
    return async (dispatch, getState) => {
        const { authUserReducer } = getState();
        dispatch(
            handleThreadCommentNeutralVoteActionCreator({
                commentId,
                userId: authUserReducer.id,
            })
        );
        try {
            await threadServices.postThreadCommentNeutralVote(
                threadId,
                commentId
            );
        } catch (error) {
            dispatch(
                handleThreadCommentNeutralVoteActionCreator({
                    commentId: '',
                    userId: authUserReducer.id,
                })
            );
        }
    };
};

const asycnThreadCommentDownVote = ({ threadId = '', commentId }) => {
    return async (dispatch, getState) => {
        const { authUserReducer } = getState();
        dispatch(
            handleThreadCommentNeutralVoteActionCreator({
                commentId,
                userId: authUserReducer.id,
            })
        );
        dispatch(
            handleThreadCommentDownVoteActionCreator({
                commentId,
                userId: authUserReducer.id,
            })
        );
        try {
            await threadServices.postThreadCommentDownVote(threadId, commentId);
        } catch (error) {
            dispatch(
                handleThreadCommentNeutralVoteActionCreator({
                    commentId: '',
                    userId: authUserReducer.id,
                })
            );
        }
    };
};

const asyncGetThreadDetail = (threadId = '') => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.GET_THREAD_DETAIL_PENDING,
        });
        try {
            const threads = await threadServices.getThreadDetailById(threadId);

            dispatch({
                type: actionTypes.GET_THREAD_DETAIL_SUCCESS,
                payload: threads?.data || null,
            });
        } catch (error) {
            const errorMessage =
                error?.response?.data?.message || error?.message;
            dispatch({
                type: actionTypes.GET_THREAD_DETAIL_FAILED,
                payload: errorMessage,
            });
        }
    };
};

export {
    actionTypes,
    asyncGetThreadDetail,
    asycnThreadDetailUpVote,
    asycnThreadDetailNeutralVote,
    asycnThreadDetailDownVote,
    asyncCreateThreadDetailComment,
    asycnThreadCommentUpVote,
    asycnThreadCommentDownVote,
    asycnThreadCommentNeutralVote,
};
