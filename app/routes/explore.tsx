import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import getConfig from '../helpers/getConfig';
import type { MCPServer } from '../models/MCPServer';

export default function Explore() {
    const [servers, setServers] = useState([] as MCPServer[]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        getConfig().then(data => setServers(data.mcpServers || []));
    }, []);

    const filteredServers = servers.filter(server => JSON.stringify(server).toLowerCase().includes(search.toLowerCase()));

    return (
        <main className='p-4'>
            <input
                type='text'
                placeholder='Search MCP Servers...'
                value={search}
                onChange={e => setSearch(e.target.value)}
                className='w-full p-2 mb-4 border rounded dark:bg-gray-800 dark:text-white'
            />
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {filteredServers.map((server, index) => (
                    <Link key={index} to={`/mcp-server/${index}`} className='p-4 border rounded dark:bg-gray-800 dark:text-white'>
                        <h2 className='text-lg font-bold'>{server.name}</h2>
                        <p>{server.description}</p>
                        <div className='flex flex-wrap gap-2 mt-2'>
                            {server.labels.map((label, i) => (
                                <span key={i} className='px-2 py-1 text-sm bg-gray-700 rounded-full'>
                                    {label}
                                </span>
                            ))}
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
