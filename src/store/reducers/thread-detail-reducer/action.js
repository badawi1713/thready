import sharedServices from '@/lib/services/shared-services';
import threadServices from '@/lib/services/thread-services';

const actionTypes = {
    GET_THREAD_DETAIL_PENDING: 'GET_THREAD_DETAIL_PENDING',
    GET_THREAD_DETAIL_SUCCESS: 'GET_THREAD_DETAIL_SUCCESS',
    GET_THREAD_DETAIL_FAILED: 'GET_THREAD_DETAIL_FAILED',
};

const asyncGetThreadDetail = (threadId = '') => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.GET_THREAD_DETAIL_PENDING,
        });
        try {
            const threads = await threadServices.getThreadDetailById(threadId);
            await sharedServices.getUserListData();

            dispatch({
                type: actionTypes.GET_THREAD_DETAIL_SUCCESS,
                payload: threads?.data || null,
            });
        } catch (error) {
            const errorMessage =
                error?.response?.data?.message || error?.message;
            dispatch({
                type: actionTypes.GET_THREAD_DETAIL_FAILED,
                payload: errorMessage,
            });
        }
    };
};

export { actionTypes, asyncGetThreadDetail };
