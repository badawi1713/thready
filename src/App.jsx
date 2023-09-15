import RootRouter from './components/shared/root-router';
import ScrollToTop from './lib/scroll-to-top';

const App = () => {
    return (
        <>
            <ScrollToTop />
            <RootRouter />
        </>
    );
};

export default App;
