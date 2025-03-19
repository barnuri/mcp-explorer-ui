import { useEffect, useState } from 'react';
import { getTools, getPrompts, getResources, type MCPTool, type MCPPrompt, type MCPResource } from '../helpers/mcp';
import type { MCPServer } from '../models/MCPServer';
import { MCPToolComponent } from './MCPToolComponent';

export default function MCPServerComponent({ server }: { server: MCPServer }) {
    const [tools, setTools] = useState([] as MCPTool[]);
    const [prompts, setPrompts] = useState([] as MCPPrompt[]);
    const [resources, setResources] = useState([] as MCPResource[]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('tools');

    useEffect(() => {
        if (server?.sseUrl) {
            setLoading(true);
            const url = new URL(server.sseUrl);
            Promise.all([getTools(url), getPrompts(url), getResources(url)])
                .then(([toolsData, promptsData, resourcesData]) => {
                    setTools(toolsData);
                    setPrompts(promptsData);
                    setResources(resourcesData);
                })
                .finally(() => setLoading(false));
        }
    }, [server]);

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
            <div className='mt-6'>
                <div className='flex border-b'>
                    {['tools', 'prompts', 'resources'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 font-semibold ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
                {loading ? (
                    <p className='text-center text-lg font-semibold'>Loading {activeTab}...</p>
                ) : (
                    <div className='mt-4'>
                        {activeTab === 'tools' && (
                            <ul className='space-y-2'>
                                {tools.map((tool, i) => (
                                    <MCPToolComponent key={i} tool={tool} />
                                ))}
                            </ul>
                        )}
                        {activeTab === 'prompts' && (
                            <ul className='space-y-2'>
                                {prompts.map((prompt, i) => (
                                    <li key={i} className='p-3 border rounded-lg bg-gray-100 dark:bg-gray-800'>
                                        {prompt.name}
                                        {prompt.description}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {activeTab === 'resources' && (
                            <ul className='space-y-2'>
                                {resources.map((resource, i) => (
                                    <li key={i} className='p-3 border rounded-lg bg-gray-100 dark:bg-gray-800'>
                                        {resource.name}
                                        {resource.description}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
