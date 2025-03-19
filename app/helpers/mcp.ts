import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js';
import type { ListPromptsResult, ListToolsResult } from '@modelcontextprotocol/sdk/types.js';

async function getClient(url: URL) {
    const transport = new SSEClientTransport(url);
    const client = new Client(
        {
            name: 'mcp-explorer-ui',
            version: '1.0.0',
        },
        {
            capabilities: {
                prompts: {},
                resources: {},
                tools: {},
            },
        },
    );
    await client.connect(transport);
    return client;
}

export type MCPTool = ListToolsResult['tools'][number];
export type MCPResource = ListPromptsResult['prompts'][number];
export type MCPPrompt = ListPromptsResult['prompts'][number];

export async function getTools(url: URL): Promise<MCPTool[]> {
    const client = await getClient(url);
    const tools = await client.listTools();
    return tools.tools;
}

export async function getPrompts(url: URL): Promise<MCPPrompt[]> {
    const client = await getClient(url);
    const prompts = await client.listPrompts();
    return prompts.prompts;
}

export async function getResources(url: URL): Promise<MCPResource[]> {
    const client = await getClient(url);
    const resources = await client.listResources();
    return resources.resources;
}
