/** 
 * test scenario for allThreadReducer

- allThreadReducer function: 
  - should return the initial state when given by unknown action
  - should return loading true when given by GET_ALL_THREADS_PENDING action type
  - should return loading false, empty threads, error message when given by GET_ALL_THREADS_FAILED action type
  - should return loading false, threads with the array type, empty error string when given by GET_ALL_THREADS_SUCCESS action type
  - should return the threads with the active upvote state when given by POST_THREADS_UP_VOTE action type
  - should return the threads with the non-active upvote/downvote state when given by POST_THREADS_NEUTRAL_VOTE action type
*/

import { describe, expect, it } from 'vitest';
import allThreadReducer from './reducer';

describe('allThreadReducer function', () => {
    it('should return the initial state when given by unknown action', () => {
        // arrange
        const initialState = { loading: true, threads: [], error: '' };
        const action = { type: 'UNKNOWN' };

        // action
        const nextState = allThreadReducer(initialState, action);

        // assert
        expect(nextState).toEqual(initialState);
    });

    it('should return loading true when given by GET_ALL_THREADS_PENDING action type', () => {
        // arrange
        const initialState = { loading: true, threads: [], error: '' };
        const action = { type: 'GET_ALL_THREADS_PENDING' };

        // action
        const nextState = allThreadReducer(initialState, action);

        // assert
        expect(nextState).toEqual(initialState);
    });

    it('should return loading false, empty threads, error message when given by GET_ALL_THREADS_FAILED action type', () => {
        // arrange
        const initialState = { loading: true, threads: [], error: '' };
        const action = {
            type: 'GET_ALL_THREADS_FAILED',
            payload: 'Something went wrong',
        };

        // action
        const nextState = allThreadReducer(initialState, action);

        // assert
        expect(nextState).toEqual({
            loading: false,
            threads: [],
            error: 'Something went wrong',
        });
    });

    it('should return loading false, threads with the array type, empty error string when given by GET_ALL_THREADS_SUCCESS action type', () => {
        // arrange
        const initialState = { loading: true, threads: [], error: '' };
        const action = {
            type: 'GET_ALL_THREADS_SUCCESS',
            payload: [
                {
                    id: 'thread-Np47p4jhUXYhrhRn',
                    title: 'Bagaimana pengalamanmu belajar Redux?',
                    body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
                    category: 'redux',
                    createdAt: '2023-05-29T07:55:52.266Z',
                    ownerId: 'user-mQhLzINW_w5TxxYf',
                    totalComments: 0,
                    upVotesBy: [],
                    downVotesBy: [],
                },
                {
                    id: 'thread-91KocEqYPRz68MhD',
                    title: 'Halo! Selamat datang dan silakan perkenalkan diri kamu',
                    body: '<div>Bagaimana kabarmu? Semoga baik-baik saja ya. Sekali lagi saya ucapkan selamat datang semuanya!</div><div><br></div><div>Seperti yang sudah disampaikan sebelumnya, pada diskusi ini kamu bisa memperkenalkan diri kamu dan juga berkenalan dengan teman sekelas lainnya.</div><div><br></div><div>Berhubungan baik dengan teman sekelas dan instruktur merupakan bagian penting dari pembelajaran di kelas ini, karena mereka dapat membantu jika kamu mengalami kendala dalam mempelajari dan memahami materi.&nbsp;&nbsp;</div><div><br></div><div>Oleh karena itu, luangkanlah waktumu untuk saling mengenal dan mencairkan suasana. Membangun interaksi dengan siswa lain akan membuat pengalaman belajar kamu jauh lebih menyenangkan dan menarik.&nbsp;</div><div><br></div><div>Beberapa hal yang dapat kamu tulis pada perkenalan diri:</div><div><br></div><div>- Siapa kamu dan dari mana kamu berasal?</div><div>- Apa pekerjaan atau pendidikan kamu saat ini?</div><div>- Kenapa kamu mengambil pelatihan ini? Apakah mungkin karena kamu sedang mengejar perubahan dalam karir, atau lainnya?</div>',
                    category: 'perkenalan',
                    createdAt: '2023-05-29T07:54:35.746Z',
                    ownerId: 'user-aROWej8yYA1sOfHN',
                    totalComments: 1,
                    upVotesBy: ['user-mQhLzINW_w5TxxYf'],
                    downVotesBy: [],
                },
            ],
        };

        // action
        const nextState = allThreadReducer(initialState, action);

        // assert
        expect(nextState).toEqual({
            loading: false,
            threads: action.payload,
            error: '',
        });
    });

    it('should return the threads with the active upvote state when given by POST_THREADS_UP_VOTE action type', () => {
        // arrange
        const initialState = {
            loading: false,
            threads: [
                {
                    id: 'thread-Np47p4jhUXYhrhRn',
                    title: 'Bagaimana pengalamanmu belajar Redux?',
                    body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
                    category: 'redux',
                    createdAt: '2023-05-29T07:55:52.266Z',
                    ownerId: 'user-mQhLzINW_w5TxxYf',
                    totalComments: 0,
                    upVotesBy: [],
                    downVotesBy: [],
                },
            ],
            error: '',
        };
        const action = {
            type: 'POST_THREADS_UP_VOTE',
            payload: {
                threadId: 'thread-Np47p4jhUXYhrhRn',
                userId: 'user-1',
            },
        };

        // action
        const nextState = allThreadReducer(initialState, action);

        const threads = initialState.threads.map((thread) => {
            if (thread?.id === action.payload.threadId) {
                return {
                    ...thread,
                    upVotesBy: thread?.upVotesBy.includes(action.payload.userId)
                        ? thread.upVotesBy
                        : thread.upVotesBy.concat([action.payload.userId]),
                };
            }
            return thread;
        });

        // assert
        expect(nextState).toEqual({
            loading: false,
            threads,
            error: '',
        });
    });

    it('should return the threads with the non-active upvote/downvote state when given by POST_THREADS_NEUTRAL_VOTE action type', () => {
        // arrange
        const initialState = {
            loading: false,
            threads: [
                {
                    id: 'thread-Np47p4jhUXYhrhRn',
                    title: 'Bagaimana pengalamanmu belajar Redux?',
                    body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
                    category: 'redux',
                    createdAt: '2023-05-29T07:55:52.266Z',
                    ownerId: 'user-mQhLzINW_w5TxxYf',
                    totalComments: 0,
                    upVotesBy: ['user-1'],
                    downVotesBy: [],
                },
            ],
            error: '',
        };
        const action = {
            type: 'POST_THREADS_NEUTRAL_VOTE',
            payload: {
                threadId: 'thread-Np47p4jhUXYhrhRn',
                userId: 'user-1',
            },
        };

        // action
        const nextState = allThreadReducer(initialState, action);

        const threads = initialState.threads.map((thread) => {
            if (thread?.id === action.payload.threadId) {
                return {
                    ...thread,
                    upVotesBy: thread?.upVotesBy.includes(action.payload.userId)
                        ? thread.upVotesBy.filter(
                              (id) => id !== action.payload.userId
                          )
                        : thread.upVotesBy,
                    downVotesBy: thread?.downVotesBy.includes(
                        action.payload.userId
                    )
                        ? thread.downVotesBy.filter(
                              (id) => id !== action.payload.userId
                          )
                        : thread.downVotesBy,
                };
            }
            return thread;
        });

        // assert
        expect(nextState).toEqual({
            loading: false,
            threads,
            error: '',
        });
    });

    it('should return the threads with the active downvote state when given by POST_THREADS_DOWN_VOTE action type', () => {
        // arrange
        const initialState = {
            loading: false,
            threads: [
                {
                    id: 'thread-Np47p4jhUXYhrhRn',
                    title: 'Bagaimana pengalamanmu belajar Redux?',
                    body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
                    category: 'redux',
                    createdAt: '2023-05-29T07:55:52.266Z',
                    ownerId: 'user-mQhLzINW_w5TxxYf',
                    totalComments: 0,
                    upVotesBy: [],
                    downVotesBy: [],
                },
            ],
            error: '',
        };
        const action = {
            type: 'POST_THREADS_DOWN_VOTE',
            payload: {
                threadId: 'thread-Np47p4jhUXYhrhRn',
                userId: 'user-1',
            },
        };

        // action
        const nextState = allThreadReducer(initialState, action);

        const threads = initialState.threads.map((thread) => {
            if (thread?.id === action.payload.threadId) {
                return {
                    ...thread,
                    downVotesBy: thread?.downVotesBy.includes(
                        action.payload.userId
                    )
                        ? thread.downVotesBy
                        : thread.downVotesBy.concat([action.payload.userId]),
                };
            }
            return thread;
        });

        // assert
        expect(nextState).toEqual({
            loading: false,
            threads,
            error: '',
        });
    });
});
