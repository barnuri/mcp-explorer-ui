import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteError } from 'react-router';
import { Layout as AntLayout, Menu, ConfigProvider, theme } from 'antd';
import { Link } from 'react-router';
import type { Route } from './+types/root';
import './app.css';
import { DarkModeToggle } from './components/DarkModeToggle';
import '@ant-design/v5-patch-for-react-19';
import { useEffect, useState } from 'react';

const { Header, Content, Footer } = AntLayout;
const { darkAlgorithm, defaultAlgorithm } = theme;

export const links: Route.LinksFunction = () => [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
    },
    {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
    },
];

export function Layout({ children }: { children: React.ReactNode }) {
    // Initialize with true for dark mode by default
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

    // Listen for theme changes and set initial state
    useEffect(() => {
        const checkTheme = () => {
            const isDark = document.body.className.includes('dark-theme');
            setIsDarkMode(isDark);
        };

        // Check stored preference on initial load
        const storedPreference = localStorage.getItem('darkMode');
        if (storedPreference !== null) {
            setIsDarkMode(storedPreference === 'true');
        }

        // Listen for theme changes
        window.addEventListener('themeChange', checkTheme);
        return () => window.removeEventListener('themeChange', checkTheme);
    }, []);

    return (
        <html lang='en' data-theme={isDarkMode ? 'dark' : 'light'}>
            <head>
                <meta charSet='utf-8' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <Meta />
                <Links />
            </head>
            <body className={isDarkMode ? 'dark-theme' : 'light-theme'}>
                <ConfigProvider
                    theme={{
                        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
                        token: {
                            colorBgBase: isDarkMode ? '#1f1f1f' : '#ffffff',
                            colorTextBase: isDarkMode ? '#ffffff' : '#000000',
                            borderRadius: 6,
                        },
                    }}
                >
                    <AntLayout style={{ minHeight: '100vh' }}>
                        <Header style={{ display: 'flex', alignItems: 'center' }}>
                            <div className='logo' />
                            <Menu
                                theme={isDarkMode ? 'dark' : 'light'}
                                mode='horizontal'
                                items={[
                                    { key: '1', label: <Link to='/'>Explorer</Link> },
                                    { key: '2', label: <Link to='/url-viewer'>SSE Url Viewer</Link> },
                                ]}
                                defaultSelectedKeys={['1']}
                                style={{ flex: 1 }}
                            ></Menu>
                            <DarkModeToggle />
                        </Header>
                        <Content
                            style={{
                                padding: '0 50px',
                                backgroundColor: isDarkMode ? '#141414' : '#f0f2f5',
                            }}
                        >
                            {children}
                        </Content>
                    </AntLayout>
                </ConfigProvider>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}

export function ErrorBoundary() {
    const error = useRouteError();
    let message = 'Oops!';
    let details = 'An unexpected error occurred.';
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? '404' : 'Error';
        details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className='pt-16 p-4 container mx-auto'>
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className='w-full p-4 overflow-x-auto'>
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    );
}
