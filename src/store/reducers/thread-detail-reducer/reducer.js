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
        default:
            return state;
    }
};

export default threadDetailReducer;
