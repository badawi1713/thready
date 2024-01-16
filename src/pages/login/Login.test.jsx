/**
 * testing scenario
 *
 * - Login page
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 */

import store from '@/store';
import matchers from '@testing-library/jest-dom/matchers';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import Login from './Login';

expect.extend(matchers);

describe('Login page', () => {
    afterEach(() => {
        cleanup();
    });

    it('should handle email typing correctly', async () => {
        // arrange
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );
        const emailInput = await screen.getByLabelText('Email');

        // action
        await userEvent.type(emailInput, 'john.doe@gmail.com');
        // assert
        expect(emailInput).toHaveValue('john.doe@gmail.com');
    });

    it('should handle password typing correctly', async () => {
        // arrange
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );
        const passwordInput = await screen.getByLabelText('Password');

        // action
        await userEvent.type(passwordInput, 'xPASSWORDx');
        // assert
        expect(passwordInput).toHaveValue('xPASSWORDx');
    });
});
