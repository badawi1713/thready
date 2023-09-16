import services from '@/lib/services';

const actionTypes = {
    SET_AUTH_USER: 'SET_AUTH_USER',
    UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

function setAuthUserActionCreator(authUser) {
    return {
        type: actionTypes.SET_AUTH_USER,
        payload: {
            authUser,
        },
    };
}

function unsetAuthUserActionCreator() {
    return {
        type: actionTypes.UNSET_AUTH_USER,
        payload: {
            authUser: null,
        },
    };
}

function asyncSetAuthUser({ email, password }) {
    return async (dispatch) => {
        try {
            const token = await services.login({ email, password });
            if (token) {
                await services.putAccessToken(token);
                const authUser = await services.getOwnProfile();
                dispatch(setAuthUserActionCreator(authUser));
                if (authUser) {
                    return true;
                }
            }
            return false;
        } catch (error) {
            toast({
                title: 'Get Access Failed',
                description: error?.message,
                variant: 'destructive',
            });
            return false;
        }
    };
}

function asyncUnsetAuthUser() {
    return (dispatch) => {
        dispatch(unsetAuthUserActionCreator());
        services.putAccessToken('');
    };
}

export {
    actionTypes,
    asyncSetAuthUser,
    asyncUnsetAuthUser,
    setAuthUserActionCreator,
    unsetAuthUserActionCreator,
};
