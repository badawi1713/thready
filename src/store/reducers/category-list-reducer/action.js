const actionTypes = {
    SET_CATEGORY_LIST: 'SET_CATEGORY_LIST',
};

const getCategoryListActionHandler = (categoryList = []) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.SET_CATEGORY_LIST,
            payload: categoryList,
        });
    };
};

export { actionTypes, getCategoryListActionHandler };
