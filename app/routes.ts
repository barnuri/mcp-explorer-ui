import { type RouteConfig } from '@react-router/dev/routes';

export const baseURL = process.env.BASE_PATH ? process.env.BASE_PATH : '/';

export default [
    { path: `${baseURL}`, file: 'routes/explore.tsx' },
    { path: `${baseURL}mcp-server/:id`, file: 'routes/mcp-server.tsx' },
    { path: `${baseURL}url-viewer`, file: 'routes/url-viewer.tsx' },
] satisfies RouteConfig;
