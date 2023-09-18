import sharedServices from '@/lib/services/shared-services';
import threadServices from '@/lib/services/thread-services';
import { getCategoryListActionHandler } from '../category-list-reducer/action';

const actionTypes = {
    GET_ALL_THREADS_PENDING: 'GET_ALL_THREADS_PENDING',
    GET_ALL_THREADS_SUCCESS: 'GET_ALL_THREADS_SUCCESS',
    GET_ALL_THREADS_FAILED: 'GET_ALL_THREADS_FAILED',
};

const getAllThreadActionCreator = () => {
    return async (dispatch) => {
        try {
            const threads = await threadServices.getAllThreadsData();
            const users = await sharedServices.getUserListData();
            const categories = threads?.data?.map(({ category }) => category);
            const threadCategoryList = [...new Set(categories)];
            const populateThreadAndUser =
                threads?.data?.length > 0
                    ? threads?.data?.map((thread) => {
                          return {
                              ...thread,
                              ownerId:
                                  users?.data?.find(
                                      (user) => user?.id === thread?.ownerId
                                  ).name || 'Unknown',
                          };
                      })
                    : [];
            dispatch(getCategoryListActionHandler(threadCategoryList));
            dispatch({
                type: actionTypes.GET_ALL_THREADS_SUCCESS,
                payload: populateThreadAndUser,
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
