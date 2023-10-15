import { createContext, useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import PrimeReact from 'primereact/api';


const queryClient = new QueryClient();
export const AppContext = createContext();

export const useApp = () => {
    return useContext(AppContext);
}

const AppProvider = ({ children }) => {
    const { theme } = useSelector(state => state.ui);

    useEffect(() => {
        // to handle changing app theme
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        if (theme === "") {
            PrimeReact.changeTheme("/themes/light/theme.css", "/themes/light/theme.css", "supadmin-theme-link", () => { console.log("' '::Setting theme to light mode") });
        } else if (theme === "light") {
            PrimeReact.changeTheme("/themes/dark/theme.css", "/themes/light/theme.css", "supadmin-theme-link", () => { console.log("Light::Setting theme to light mode") });
        } else {
            PrimeReact.changeTheme("/themes/light/theme.css", "/themes/dark/theme.css", "supadmin-theme-link", () => { console.log("Dark::Setting theme to dark mode") });
        }
    }, [theme]);

    return (
        <AppContext.Provider value={null}>
            <QueryClientProvider client={queryClient}>
                { children }            
            </QueryClientProvider>
        </AppContext.Provider>
    )
}

const ProtectedView = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { userInfo: user } = useSelector(state => state.auth);

    useEffect(() => {
        if (!user) {
            navigate("/accounts/authorization/login", {
                state: {
                    from: location
                },
                replace: true
            });
        }            
    }, [navigate, user, location]);

    return ( 
        <>
            {children}
        </>
    );
}

export { AppProvider, ProtectedView };