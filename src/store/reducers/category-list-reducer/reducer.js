import { actionTypes } from './action';

const categoryListReducer = (categoryList = [], action = {}) => {
    switch (action.type) {
        case actionTypes.SET_CATEGORY_LIST:
            return action.payload;
        default:
            return categoryList;
    }
};

export default categoryListReducer;
