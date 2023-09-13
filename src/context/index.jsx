import ThemeProvider from './theme-context';

const ContextProvider = ({ children }) => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="theme">
            {children}
        </ThemeProvider>
    );
};

export default ContextProvider;
