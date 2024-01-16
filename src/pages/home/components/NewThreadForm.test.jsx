/**
 * testing scenario
 *
 * - NewThreadForm page
 *   - should handle title typing correctly
 *   - should handle thread's body typing correctly
 *   - should handle category typing correctly
 */

import store from '@/store';
import matchers from '@testing-library/jest-dom/matchers';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import NewThreadForm from './NewThreadForm';

expect.extend(matchers);

describe('NewThreadForm page', () => {
    afterEach(() => {
        cleanup();
    });

    it('should handle title typing correctly', async () => {
        // arrange
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <NewThreadForm />
                </BrowserRouter>
            </Provider>
        );
        const titleInput = await screen.getByLabelText('Thread Title');

        // action
        await userEvent.type(titleInput, 'How to learn React with Ease');

        // assert
        expect(titleInput).toHaveValue('How to learn React with Ease');
    });

    it("should handle thread's body typing correctly", async () => {
        // arrange
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <NewThreadForm />
                </BrowserRouter>
            </Provider>
        );
        const bodyInput = await screen.getByPlaceholderText(
            "What's on your mind?"
        );

        // action
        await userEvent.type(
            bodyInput,
            'Build an user interface with React...'
        );

        // assert
        expect(bodyInput).toHaveValue('Build an user interface with React...');
    });

    it('should handle category typing correctly', async () => {
        // arrange
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <NewThreadForm />
                </BrowserRouter>
            </Provider>
        );
        const categoryInput = await screen.getByLabelText('Category');

        // action
        await userEvent.type(categoryInput, 'React');

        // assert
        expect(categoryInput).toHaveValue('React');
    });
});
