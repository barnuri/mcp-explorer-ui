import type { MCPPrompt, MCPResource, MCPTool } from '../helpers/mcp';

export interface MCPServer {
    name: string;
    description: string;
    labels: string[];
    sseUrl?: string;
    sseUrlDict?: {
        [envName: string]: string;
    };
    offlineData?: MCPServerData;
    offlineDataDict?: {
        [envName: string]: MCPServerData;
    };
}

export interface MCPServerData {
    tools: MCPTool[];
    prompts: MCPPrompt[];
    resources: MCPResource[];
}
