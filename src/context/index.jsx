import ThemeProvider from './theme-context';

function ContextProvider({ children }) {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="theme">
            {children}
        </ThemeProvider>
    );
}

export default ContextProvider;
