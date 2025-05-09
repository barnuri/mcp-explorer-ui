import { useState } from 'react';
import { Collapse } from 'antd';
import type { MCPTool } from '../helpers/mcp';

export function MCPToolComponent({ tool }: { tool: MCPTool }) {
    const [expanded, setExpanded] = useState(true);
    const toolSchema: { [key: string]: { type: string; description: string } } = (tool.inputSchema.properties as any) || {};
    let displayName = tool.name;
    if (!isNaN(parseInt(tool.name.replaceAll('-', '')))) {
        displayName = tool.description || '';
    } else {
        displayName = `${tool.name} - ${tool.description}`;
    }
    return (
        <Collapse className='mb-2' activeKey={expanded ? '1' : undefined} onChange={() => setExpanded(!expanded)}>
            <Collapse.Panel header={displayName} key='1'>
                {tool.inputSchema && (
                    <ul className='mt-2 space-y-1'>
                        {Object.keys(toolSchema).map((key, i) => (
                            <li key={i} className='text-sm text-gray-600 dark:text-gray-300'>
                                {key}: {toolSchema[key].type} - {toolSchema[key].description}
                            </li>
                        ))}
                    </ul>
                )}
            </Collapse.Panel>
        </Collapse>
    );
}
