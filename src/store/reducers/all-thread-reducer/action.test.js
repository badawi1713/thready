/**
 * test scenario for asyncGetAllThreads
 *
 * - asyncGetAllThreads thunk
 *  - should dispatch action correctly when data fetching is successful
 *  - should dispatch action and showing error message when data fetching failed
 */

import sharedServices from '@/lib/services/shared-services';
import threadServices from '@/lib/services/thread-services';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
    asyncGetAllThreads,
    getThreadsActionCreator,
    getThreadsErrorActionCreator,
} from './action';
import {
    asyncGetCategoryListActionHandler,
    getCategoryListActionCreator,
} from '../category-list-reducer/action';

const fakeThreadsResponse = [
    {
        id: 'thread-Np47p4jhUXYhrhRn',
        title: 'Bagaimana pengalamanmu belajar Redux?',
        body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
        category: 'redux',
        createdAt: '2023-05-29T07:55:52.266Z',
        ownerId: 'user-mQhLzINW_w5TxxYf',
        totalComments: 0,
        upVotesBy: ['user-wm85c2upoNlk3T8W'],
        downVotesBy: [],
    },
];

const fakeUsersResponse = [
    {
        id: 'user-1',
        name: 'Dzaky',
        email: 'dzaky.badawi@gmail.com',
        avatar: 'https://ui-avatars.com/api/?name=Dzaky&background=random',
    },
];

const fakeErrorResponse = new Error('Sorry, something went wrong!');

describe('asyncGetAllThreads thunk', () => {
    beforeEach(() => {
        sharedServices._getUserListData = sharedServices.getUserListData;
        threadServices._getAllThreadsData = threadServices.getAllThreadsData;
    });

    afterEach(() => {
        sharedServices._getUserListData = sharedServices.getUserListData;
        threadServices._getAllThreadsData = threadServices.getAllThreadsData;

        // delete backup data
        delete sharedServices._getUserListData;
        delete threadServices._getAllThreadsData;
    });

    it('should dispatch action correctly when data fetching is successful', async () => {
        // arrange
        // stub implementation
        sharedServices.getUserListData = () =>
            Promise.resolve(fakeUsersResponse);
        threadServices.getAllThreadsData = () =>
            Promise.resolve(fakeThreadsResponse);

        // mock dispatch
        const dispatch = vi.fn();

        // act
        await asyncGetAllThreads()(dispatch);
        const threads = fakeThreadsResponse;
        const users = fakeUsersResponse;
        const categories = threads?.data?.map(({ category }) => category);
        const threadCategoryList = [...new Set(categories)];
        const populateThreadAndUser =
            threads?.length > 0
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

        await asyncGetCategoryListActionHandler(threadCategoryList)(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(
            getThreadsActionCreator(populateThreadAndUser)
        );
        expect(dispatch).toHaveBeenCalledWith(
            getCategoryListActionCreator(populateThreadAndUser)
        );
    });

    it('should dispatch action and showing error message when data fetching failed', async () => {
        // arrange
        // stub implementation
        sharedServices.getUserListData = () =>
            Promise.reject(fakeErrorResponse);
        threadServices.getAllThreadsData = () =>
            Promise.reject(fakeErrorResponse);

        // mock dispatch
        const dispatch = vi.fn();

        // mock alert
        window.alert = vi.fn();

        // action
        await asyncGetAllThreads()(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(
            getThreadsErrorActionCreator(fakeErrorResponse.message)
        );
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });
});
