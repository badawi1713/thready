import { actionTypes } from './action';

function authUserReducer(authUser = null, action = {}) {
    switch (action.type) {
        case actionTypes.SET_AUTH_USER:
            return action.payload.authUser;
        case actionTypes.UNSET_AUTH_USER:
            return null;
        default:
            return authUser;
    }
}

export default authUserReducer;
