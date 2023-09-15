import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { TooltipProvider } from './components/ui/tooltip';
import ContextProvider from './context';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <TooltipProvider>
            <BrowserRouter>
                <ContextProvider>
                    <App />
                </ContextProvider>
            </BrowserRouter>
        </TooltipProvider>
    </React.StrictMode>
);
