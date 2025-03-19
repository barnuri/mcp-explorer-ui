import { useState } from 'react';
import type { MCPTool } from '../helpers/mcp';

export function MCPToolComponent({ tool }: { tool: MCPTool }) {
    const [expanded, setExpanded] = useState(true);
    const toolSchema: { [key: string]: { type: string; description: string } } = (tool.inputSchema.properties as any) || {};
    return (
        <li title={tool.name} className='p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 hover:shadow-md transition-shadow'>
            <div className='flex justify-between items-center cursor-pointer' onClick={() => setExpanded(!expanded)}>
                <h3 className='font-bold'>{tool.description}</h3>
                <span>{expanded ? '-' : '+'}</span>
            </div>
            {expanded && (
                <div className='mt-2'>
                    {tool.inputSchema && (
                        <ul className='mt-2 space-y-1'>
                            {Object.keys(toolSchema).map((key, i) => (
                                <li key={i} className='text-sm text-gray-600 dark:text-gray-300'>
                                    {key}: {toolSchema[key].type} - {toolSchema[key].description}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </li>
    );
}
