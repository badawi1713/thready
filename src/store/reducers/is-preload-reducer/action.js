import services from '@/lib/services';
import { setAuthUserActionCreator } from '../auth-user-reducer/action';

const actionTypes = {
    SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setisPreloadActionCreator(status) {
    return {
        type: actionTypes.SET_IS_PRELOAD,
        payload: {
            isPreload: status,
        },
    };
}

function asyncPreloadProcess() {
    return async (dispatch) => {
        dispatch(setisPreloadActionCreator(true));
        try {
            const authUser = await services.getOwnProfile();
            await dispatch(setAuthUserActionCreator(authUser || null));
        } catch (error) {
            dispatch(setAuthUserActionCreator(null));
        } finally {
            dispatch(setisPreloadActionCreator(false));
        }
    };
}

export { actionTypes, asyncPreloadProcess, setisPreloadActionCreator };
