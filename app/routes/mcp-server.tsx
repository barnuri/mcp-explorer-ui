import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import getConfig from '../helpers/getConfig';
import type { MCPServer } from '../models/MCPServer';
import { getTools, type MCPTool } from '../helpers/mcp';
import { MCPToolComponent } from './MCPToolComponent';

export default function McpServer() {
    const { id } = useParams();
    const [server, setServer] = useState(null as MCPServer | null);
    const [tools, setTools] = useState([] as MCPTool[]);
    const [loadingConfig, setLoadingConfig] = useState(true);
    const [loadingTools, setLoadingTools] = useState(false);

    useEffect(() => {
        setLoadingConfig(true);
        getConfig()
            .then(data => setServer(data.mcpServers[Number(id)]))
            .finally(() => setLoadingConfig(false));
    }, [id]);

    useEffect(() => {
        if (server?.sseUrl) {
            setLoadingTools(true);
            getTools(new URL(server.sseUrl))
                .then(data => setTools(data))
                .finally(() => setLoadingTools(false));
        }
    }, [server]);

    if (loadingConfig) return <p className='text-center text-lg font-semibold'>Loading configuration...</p>;
    if (!server) return <p className='text-center text-lg font-semibold'>Server not found.</p>;

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
            {loadingTools ? (
                <p className='text-center text-lg font-semibold'>Loading tools...</p>
            ) : (
                <ul className='mt-2 space-y-2'>
                    {tools.map((tool, i) => (
                        <MCPToolComponent key={i} tool={tool} />
                    ))}
                </ul>
            )}
        </main>
    );
}
