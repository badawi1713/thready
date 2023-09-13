const ActionTypes = {
    SET_AUTH_USER: 'SET_AUTH_USER',
    UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

function setAuthUserActionCreator(authUser) {
    return {
        type: ActionTypes.SET_AUTH_USER,
        payload: {
            authUser,
        },
    };
}

function unsetAuthUserActionCreator() {
    return {
        type: ActionTypes.UNSET_AUTH_USER,
        payload: {
            authUser: null,
        },
    };
}

function asyncSetAuthUser({ id, password }) {
    return async (dispatch) => {
        try {
            const token = await api.login({ id, password });
            api.putAccessToken(token);
            const authUser = await api.getOwnProfile();
            dispatch(setAuthUserActionCreator(authUser));
        } catch (error) {
            alert(error.message);
        }
    };
}

function asyncUnsetAuthUser() {
    return (dispatch) => {
        dispatch(unsetAuthUserActionCreator());
        api.putAccessToken('');
    };
}

export {
    ActionTypes,
    asyncSetAuthUser,
    asyncUnsetAuthUser,
    setAuthUserActionCreator,
    unsetAuthUserActionCreator,
};
