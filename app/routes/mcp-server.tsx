import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import getConfig from '../helpers/getConfig';
import type { MCPServer } from '../models/MCPServer';
import type { MCPTool } from '../models/MCPTool';

export default function McpServer() {
    const { id } = useParams();
    const [server, setServer] = useState(null as MCPServer | null);
    const [tools, setTools] = useState([] as MCPTool[]);

    useEffect(() => {
        getConfig().then(data => setServer(data.mcpServers[Number(id)]));
    }, [id]);

    useEffect(() => {
        if (server?.sseUrl) {
            const eventSource = new EventSource(server.sseUrl);
            eventSource.onmessage = event => {
                setTools(prev => [...prev, JSON.parse(event.data)]);
            };
            return () => eventSource.close();
        }
    }, [server]);

    if (!server) return <p className='text-center text-lg font-semibold'>Loading...</p>;

    return (
        <main className='p-4 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-bold mb-2'>{server.name}</h1>
            <p className='text-gray-600 dark:text-gray-300'>{server.description}</p>
            <div className='flex flex-wrap gap-2 mt-4'>
                {server.labels.map((label, i) => (
                    <span
                        key={i}
                        className='px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 rounded-full'
                    >
                        {label}
                    </span>
                ))}
            </div>
            <h2 className='mt-6 text-2xl font-bold'>Tools</h2>
            <ul className='mt-2 space-y-2'>
                {tools.map((tool, i) => (
                    <li key={i} className='p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 hover:shadow-md transition-shadow'>
                        {tool.name}
                    </li>
                ))}
            </ul>
        </main>
    );
}
