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
        <main className='p-4 max-w-6xl mx-auto'>
            <input
                type='text'
                placeholder='Search MCP Servers...'
                value={search}
                onChange={e => setSearch(e.target.value)}
                className='w-full p-3 mb-6 border rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {filteredServers.map((server, index) => (
                    <Link
                        key={index}
                        to={`/mcp-server/${index}`}
                        className='p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 hover:shadow-lg transition-shadow'
                    >
                        <h2 className='text-xl font-bold mb-2'>{server.name}</h2>
                        <p className='text-gray-600 dark:text-gray-300'>{server.description}</p>
                        <div className='flex flex-wrap gap-2 mt-3'>
                            {server.labels.map((label, i) => (
                                <span
                                    key={i}
                                    className='px-3 py-1 text-sm font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 rounded-full'
                                >
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
