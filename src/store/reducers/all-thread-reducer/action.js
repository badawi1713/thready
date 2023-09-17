import threadServices from '@/lib/services/thread-services';

const actionTypes = {
    GET_ALL_THREADS_PENDING: 'GET_ALL_THREADS_PENDING',
    GET_ALL_THREADS_SUCCESS: 'GET_ALL_THREADS_SUCCESS',
    GET_ALL_THREADS_FAILED: 'GET_ALL_THREADS_FAILED',
};

const getAllThreadActionCreator = () => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.GET_ALL_THREADS_PENDING });
        try {
            const response = await threadServices.getAllThreadsData();
            dispatch({
                type: actionTypes.GET_ALL_THREADS_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            const errorMessage =
                error?.response?.data?.message || error?.message;
            dispatch({
                type: actionTypes.GET_ALL_THREADS_FAILED,
                payload: errorMessage,
            });
        }
    };
};

export { actionTypes, getAllThreadActionCreator };
