import { useEffect, useLayoutEffect, useState } from 'react';
import { Button } from 'antd';

export function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(false);

    useLayoutEffect(() => {
        setDarkMode((window.localStorage.getItem('darkMode') || 'true') === 'true');
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        document.documentElement.classList.add('transition-colors', 'duration-300');
        (document.querySelector('html') as any).className = darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900';
        window.localStorage.setItem('darkMode', darkMode.toString());
    }, [darkMode]);

    return (
        <Button
            onClick={() => setDarkMode(!darkMode)}
            className='absolute top-4 right-4 p-2 border rounded bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors'
        >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
    );
}
