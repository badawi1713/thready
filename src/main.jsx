import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TooltipProvider } from './components/ui/tooltip';
import ContextProvider from './context';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <TooltipProvider>
            <ContextProvider>
                <App />
            </ContextProvider>
        </TooltipProvider>
    </React.StrictMode>
);
