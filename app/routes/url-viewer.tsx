import { useState } from 'react';
import MCPServerComponent from '../components/MCPServerComponent';
import type { MCPServer } from '../models/MCPServer';

export default function UrlViewer() {
    const [url, setUrl] = useState('');
    const server: MCPServer = {
        name: 'MCP Server Viewer',
        description: '',
        labels: [],
        sseUrl: url,
    };
    return (
        <main className='p-4 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-bold mb-4'>URL Viewer</h1>
            <input
                type='text'
                placeholder='Enter MCP Server URL...'
                value={url}
                onChange={e => setUrl(e.target.value)}
                className='w-full p-3 mb-4 border rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {url && <MCPServerComponent server={server} />}
        </main>
    );
}
