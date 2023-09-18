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
            return { ...state, loading: false, threads: action.payload };
        case actionTypes.GET_ALL_THREADS_FAILED:
            return { ...state, loading: false, error: action.payload };
        case actionTypes.GET_THREADS_BY_CATEGORY:
        default:
            return state;
    }
};

export default allThreadReducer;
