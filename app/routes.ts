import { type RouteConfig, index } from '@react-router/dev/routes';

export default [
    index('routes/explore.tsx'),
    { path: 'mcp-server/:id', file: 'routes/mcp-server.tsx' },
    { path: 'url-viewer', file: 'routes/url-viewer.tsx' },
] satisfies RouteConfig;
