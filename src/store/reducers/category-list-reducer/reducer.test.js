/** 
 * test scenario for categoryListReducer

- categoryListReducer function: 
  - should return the initial state when given by unknown action
  - should return categoryList data, when given by SET_CATEGORY_LIST action
  - should return empty categoryList, when given empty string or empty array
*/

import { describe, expect, it } from 'vitest';
import categoryListReducer from './reducer';

describe('categoryListReducer function', () => {
    it('should return the initial state when given by unknown action', () => {
        // arrange
        const initialState = [];

        // action
        const nextState = categoryListReducer(initialState, {
            type: 'UNKNOWN_ACTION',
        });

        // assert
        expect(nextState).toEqual(initialState);
    });

    it('should return categoryList data, when given by SET_CATEGORY_LIST action', () => {
        // arrange
        const initialState = [];

        // action
        const nextState = categoryListReducer(initialState, {
            type: 'SET_CATEGORY_LIST',
            payload: [
                {
                    id: 1,
                    name: 'React',
                },
            ],
        });

        // assert
        expect(nextState).toEqual([
            {
                id: 1,
                name: 'React',
            },
        ]);
    });

    it('should return empty categoryList, when given empty string', () => {
        // arrange
        const initialState = [];

        // action
        const nextState = categoryListReducer(initialState, {
            type: 'SET_CATEGORY_LIST',
            payload: '' || [],
        });

        // assert
        expect(nextState).toEqual([]);
    });
});
