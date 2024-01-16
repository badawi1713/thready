const actionTypes = {
    SET_CATEGORY_LIST: 'SET_CATEGORY_LIST',
};

const getCategoryListActionCreator = (categoryList = []) => {
    return {
        type: actionTypes.SET_CATEGORY_LIST,
        payload: categoryList,
    };
};

const asyncGetCategoryListActionHandler = (categoryList = []) => {
    return (dispatch) => {
        dispatch(getCategoryListActionCreator(categoryList));
    };
};

export {
    actionTypes,
    asyncGetCategoryListActionHandler,
    getCategoryListActionCreator,
};
