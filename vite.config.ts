import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    base: process.env.BASE_PATH ? process.env.BASE_PATH : undefined,
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
    define: {
        'process.env.CONFIG_PATH': JSON.stringify(process.env.CONFIG_PATH || '/config.json'),
    },
});
