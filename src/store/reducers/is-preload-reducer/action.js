import services from '@/lib/services';
import { setAuthUserActionCreator } from '../auth-user-reducer/action';

const actionTypes = {
    SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreloadActionCreator(isPreLoad) {
    return {
        type: actionTypes.SET_IS_PRELOAD,
        payload: isPreLoad,
    };
}

function asyncPreloadProcess() {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.SET_IS_PRELOAD,
            payload: {
                isPreLoad: true,
            },
        });
        try {
            const authUser = await services.getOwnProfile();
            dispatch(setAuthUserActionCreator(authUser || null));
        } catch (error) {
            dispatch(setAuthUserActionCreator(null));
        } finally {
            dispatch({
                type: actionTypes.SET_IS_PRELOAD,
                payload: {
                    isPreLoad: false,
                },
            });
        }
    };
}

export { actionTypes, asyncPreloadProcess, setIsPreloadActionCreator };
