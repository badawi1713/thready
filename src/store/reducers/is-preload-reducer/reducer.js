import { actionTypes } from './action';

const isPreloadReducer = (isPreLoad = true, action) => {
    switch (action.type) {
        case actionTypes.SET_IS_PRELOAD:
            return action?.payload;
        default:
            return isPreLoad;
    }
};

export default isPreloadReducer;
