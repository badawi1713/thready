import { actionTypes } from './action';

const initialState = {
    loading: true,
    threads: [],
    error: '',
};

const allThreadReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case actionTypes.GET_ALL_THREADS_PENDING:
            return initialState;
        case actionTypes.GET_ALL_THREADS_SUCCESS:
            return { loading: false, threads: action.payload, error: '' };
        case actionTypes.GET_ALL_THREADS_FAILED:
            return { loading: false, threads: [], error: action.payload };
        case actionTypes.POST_THREADS_UP_VOTE: {
            const threads = state.threads.map((thread) => {
                if (thread?.id === action.payload.threadId) {
                    return {
                        ...thread,
                        upVotesBy: thread?.upVotesBy.includes(
                            action.payload.userId
                        )
                            ? thread.upVotesBy
                            : thread.upVotesBy.concat([action.payload.userId]),
                    };
                }
                return thread;
            });
            return {
                ...state,
                threads,
            };
        }
        case actionTypes.POST_THREADS_NEUTRAL_VOTE: {
            const threads = state.threads.map((thread) => {
                if (thread?.id === action.payload.threadId) {
                    return {
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
                    };
                }
                return thread;
            });
            return {
                ...state,
                threads,
            };
        }
        case actionTypes.POST_THREADS_DOWN_VOTE: {
            const threads = state.threads.map((thread) => {
                if (thread?.id === action.payload.threadId) {
                    return {
                        ...thread,
                        downVotesBy: thread?.downVotesBy.includes(
                            action.payload.userId
                        )
                            ? thread.downVotesBy
                            : thread.downVotesBy.concat([
                                  action.payload.userId,
                              ]),
                    };
                }
                return thread;
            });
            return {
                ...state,
                threads,
            };
        }
        default:
            return state;
    }
};

export default allThreadReducer;
