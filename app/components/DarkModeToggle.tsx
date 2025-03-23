import { useEffect, useLayoutEffect, useState } from 'react';
import { Button, theme } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

export function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(true); // Initialize as true by default
    const { token } = theme.useToken();

    useLayoutEffect(() => {
        // Default to dark mode if no preference is stored
        const storedPreference = window.localStorage.getItem('darkMode');
        setDarkMode(storedPreference === null ? true : storedPreference === 'true');
    }, []);

    useEffect(() => {
        // Apply dark mode to both document and Ant Design components
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', darkMode);
        document.documentElement.style.colorScheme = darkMode ? 'dark' : 'light';
        window.localStorage.setItem('darkMode', darkMode.toString());

        // Apply to body for Ant Design styling
        document.body.className = darkMode ? 'dark-theme' : 'light-theme';

        // Manually dispatch an event for any components that need to react to theme changes
        window.dispatchEvent(new Event('themeChange'));
    }, [darkMode]);

    return (
        <Button
            type='text'
            onClick={() => setDarkMode(!darkMode)}
            icon={darkMode ? <SunOutlined /> : <MoonOutlined />}
            style={{
                marginLeft: 'auto',
                color: token.colorTextBase,
            }}
        >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
    );
}
