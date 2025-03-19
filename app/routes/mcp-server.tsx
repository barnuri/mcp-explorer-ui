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

    if (!server) return <p>Loading...</p>;

    return (
        <main className='p-4'>
            <h1 className='text-2xl font-bold'>{server.name}</h1>
            <p>{server.description}</p>
            <div className='flex flex-wrap gap-2 mt-2'>
                {server.labels.map((label, i) => (
                    <span key={i} className='px-2 py-1 text-sm bg-gray-700 rounded-full'>
                        {label}
                    </span>
                ))}
            </div>
            <h2 className='mt-4 text-xl font-bold'>Tools</h2>
            <ul>
                {tools.map((tool, i) => (
                    <li key={i}>{tool.name}</li>
                ))}
            </ul>
        </main>
    );
}
