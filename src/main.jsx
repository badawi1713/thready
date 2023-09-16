import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { TooltipProvider } from './components/ui/tooltip';
import ContextProvider from './context';
import './index.css';
import services from './lib/services';
import { BASE_URL } from './lib/utils';
import store from './store';

axios.defaults.baseURL = BASE_URL;

axios.interceptors.request.use(
    (request) => {
        const token = services.getAccessToken();
        request.headers.Authorization = `Bearer ${token}`;
        return request;
    },
    (error) => Promise.reject(error)
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <TooltipProvider>
                <BrowserRouter>
                    <ContextProvider>
                        <App />
                    </ContextProvider>
                </BrowserRouter>
            </TooltipProvider>
        </Provider>
    </React.StrictMode>
);
