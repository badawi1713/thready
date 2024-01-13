import services from '@/lib/services';
import authServices from '@/lib/services/auth-services';
import { setAuthUserActionCreator } from '../auth-user-reducer/action';

const actionTypes = {
    SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreloadActionCreator(status) {
    return {
        type: actionTypes.SET_IS_PRELOAD,
        payload: {
            isPreload: status,
        },
    };
}

function asyncPreloadProcess() {
    return async (dispatch) => {
        dispatch(setIsPreloadActionCreator(true));
        try {
            const token = await authServices.getAccessToken();
            if (token) {
                const authUser = await services.getOwnProfile();
                return dispatch(setAuthUserActionCreator(authUser || null));
            }
            return dispatch(setAuthUserActionCreator(null));
        } catch (error) {
            return dispatch(setAuthUserActionCreator(null));
        } finally {
            setTimeout(() => dispatch(setIsPreloadActionCreator(false)), 1000);
        }
    };
}

export { actionTypes, asyncPreloadProcess, setIsPreloadActionCreator };
