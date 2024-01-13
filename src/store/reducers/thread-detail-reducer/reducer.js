import { actionTypes } from './action';

const initialState = {
    loading: true,
    threadDetail: null,
    error: '',
};

const threadDetailReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case actionTypes.GET_THREAD_DETAIL_PENDING:
            return { ...state, loading: true, error: '' };
        case actionTypes.GET_THREAD_DETAIL_SUCCESS:
            return { ...state, loading: false, threadDetail: action.payload };
        case actionTypes.GET_THREAD_DETAIL_FAILED:
            return { ...state, loading: false, error: action.payload };
        case actionTypes.POST_THREAD_DETAIL_UP_VOTE: {
            const thread = state.threadDetail;
            if (thread?.id === action.payload.threadId) {
                return {
                    ...state,
                    threadDetail: {
                        ...thread,
                        upVotesBy: thread?.upVotesBy.includes(
                            action.payload.userId
                        )
                            ? thread.upVotesBy
                            : thread.upVotesBy.concat([action.payload.userId]),
                    },
                };
            }
            return state;
        }
        case actionTypes.POST_THREAD_DETAIL_NEUTRAL_VOTE: {
            const thread = state.threadDetail;
            if (thread?.id === action.payload.threadId) {
                return {
                    ...state,
                    threadDetail: {
                        ...thread,
                        upVotesBy: thread?.upVotesBy.includes(
                            action.payload.userId
                        )
                            ? thread.upVotesBy.filter(
                                  (id) => id !== action.payload.userId
                              )
                            : thread.upVotesBy,
                        downVotesBy: thread?.downVotesBy.includes(
                            action.payload.userId
                        )
                            ? thread.downVotesBy.filter(
                                  (id) => id !== action.payload.userId
                              )
                            : thread.downVotesBy,
                    },
                };
            }
            return state;
        }
        case actionTypes.POST_THREAD_DETAIL_DOWN_VOTE: {
            const thread = state.threadDetail;
            if (thread?.id === action.payload.threadId) {
                return {
                    ...state,
                    threadDetail: {
                        ...thread,
                        downVotesBy: thread?.downVotesBy.includes(
                            action.payload.userId
                        )
                            ? thread.downVotesBy
                            : thread.downVotesBy.concat([
                                  action.payload.userId,
                              ]),
                    },
                };
            }
            return state;
        }
        case actionTypes.POST_THREAD_DETAIL_COMMENT: {
            const thread = state.threadDetail;
            if (thread?.id === action?.payload?.threadId) {
                return {
                    ...state,
                    threadDetail: {
                        ...thread,
                        comments: [action.payload.comment, ...thread.comments],
                    },
                };
            }
            return state;
        }
        default:
            return state;
    }
};

export default threadDetailReducer;
