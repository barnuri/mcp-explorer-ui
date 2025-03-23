import { type RouteConfig, index } from '@react-router/dev/routes';

export const baseURL = process.env.BASE_PATH ? process.env.BASE_PATH : '/';

export default [
    index('routes/explore.tsx'),
    { path: 'mcp-server/:id', file: 'routes/mcp-server.tsx' },
    { path: 'url-viewer', file: 'routes/url-viewer.tsx' },
] satisfies RouteConfig;
