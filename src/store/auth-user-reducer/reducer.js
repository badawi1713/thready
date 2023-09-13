/**
 * @TODO: Define the reducer for the authUser state
 */

import { ActionTypes } from './action';

function authUserReducer(authUser = null, action = {}) {
    switch (action.type) {
        case ActionTypes.SET_AUTH_USER:
            return action.payload.authUser;
        case ActionTypes.UNSET_AUTH_USER:
            return null;
        default:
            return authUser;
    }
}

export default authUserReducer;
