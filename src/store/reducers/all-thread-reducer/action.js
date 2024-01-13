import sharedServices from '@/lib/services/shared-services';
import threadServices from '@/lib/services/thread-services';
import { getCategoryListActionHandler } from '../category-list-reducer/action';

const actionTypes = {
    GET_ALL_THREADS_PENDING: 'GET_ALL_THREADS_PENDING',
    GET_ALL_THREADS_SUCCESS: 'GET_ALL_THREADS_SUCCESS',
    GET_ALL_THREADS_FAILED: 'GET_ALL_THREADS_FAILED',
    POST_THREADS_UP_VOTE: 'POST_THREADS_UP_VOTE',
    POST_THREADS_DOWN_VOTE: 'POST_THREADS_DOWN_VOTE',
    POST_THREADS_NEUTRAL_VOTE: 'POST_THREADS_NEUTRAL_VOTE',
};

const handleThreadsUpVoteActionCreator = ({ threadId = '', userId = '' }) => {
    return {
        type: actionTypes.POST_THREADS_UP_VOTE,
        payload: {
            threadId,
            userId,
        },
    };
};

const handleThreadsNeutralVoteActionCreator = ({
    threadId = '',
    userId = '',
}) => {
    return {
        type: actionTypes.POST_THREADS_NEUTRAL_VOTE,
        payload: {
            threadId,
            userId,
        },
    };
};

const handleThreadsDownVoteActionCreator = ({ threadId = '', userId = '' }) => {
    return {
        type: actionTypes.POST_THREADS_DOWN_VOTE,
        payload: {
            threadId,
            userId,
        },
    };
};

const asycnThreadsUpVote = ({ threadId = '' }) => {
    return async (dispatch, getState) => {
        const { authUserReducer } = getState();
        dispatch(
            handleThreadsNeutralVoteActionCreator({
                threadId,
                userId: authUserReducer.id,
            })
        );
        dispatch(
            handleThreadsUpVoteActionCreator({
                threadId,
                userId: authUserReducer.id,
            })
        );
        try {
            await threadServices.postThreadUpVote(threadId);
        } catch (error) {
            dispatch(
                handleThreadsNeutralVoteActionCreator({
                    threadId,
                    userId: authUserReducer.id,
                })
            );
        }
    };
};

const asycnThreadsNeutralVote = ({ threadId = '' }) => {
    return async (dispatch, getState) => {
        const { authUserReducer } = getState();
        dispatch(
            handleThreadsNeutralVoteActionCreator({
                threadId,
                userId: authUserReducer.id,
            })
        );
        try {
            await threadServices.postThreadNeutralVote(threadId);
        } catch (error) {
            dispatch(
                handleThreadsNeutralVoteActionCreator({
                    threadId,
                    userId: authUserReducer.id,
                })
            );
        }
    };
};

const asycnThreadsDownVote = ({ threadId = '' }) => {
    return async (dispatch, getState) => {
        const { authUserReducer } = getState();
        dispatch(
            handleThreadsNeutralVoteActionCreator({
                threadId,
                userId: authUserReducer.id,
            })
        );
        dispatch(
            handleThreadsDownVoteActionCreator({
                threadId,
                userId: authUserReducer.id,
            })
        );
        try {
            await threadServices.postThreadDownVote(threadId);
        } catch (error) {
            dispatch(
                handleThreadsNeutralVoteActionCreator({
                    threadId,
                    userId: authUserReducer.id,
                })
            );
        }
    };
};

const asyncGetAllThreads = () => {
    return async (dispatch) => {
        try {
            const threads = await threadServices.getAllThreadsData();
            const users = await sharedServices.getUserListData();
            const categories = threads?.data?.map(({ category }) => category);
            const threadCategoryList = [...new Set(categories)];
            const populateThreadAndUser =
                threads?.data?.length > 0
                    ? threads?.data?.map((thread) => {
                          return {
                              ...thread,
                              ownerId:
                                  users?.data?.find(
                                      (user) => user?.id === thread?.ownerId
                                  ).name || 'Unknown',
                          };
                      })
                    : [];
            dispatch(getCategoryListActionHandler(threadCategoryList));
            dispatch({
                type: actionTypes.GET_ALL_THREADS_SUCCESS,
                payload: populateThreadAndUser,
            });
        } catch (error) {
            const errorMessage =
                error?.response?.data?.message || error?.message;
            dispatch({
                type: actionTypes.GET_ALL_THREADS_FAILED,
                payload: errorMessage,
            });
        }
    };
};

export {
    actionTypes,
    asyncGetAllThreads,
    asycnThreadsUpVote,
    asycnThreadsNeutralVote,
    asycnThreadsDownVote,
    handleThreadsUpVoteActionCreator,
};
