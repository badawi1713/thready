import { actionTypes } from './action';

const initialState = {
    isPreload: true,
};

const isPreloadReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case actionTypes.SET_IS_PRELOAD:
            return { isPreload: action?.payload?.isPreload };
        default:
            return state;
    }
};

export default isPreloadReducer;
