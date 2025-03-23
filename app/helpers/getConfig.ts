import type { Config } from '../models/Config';
import { baseURL } from '../routes';

export default () => {
    // Use a relative path to ensure it works with the base path
    const configPath = baseURL + (process.env.CONFIG_PATH?.replace(/^\//, '') || 'config.json');
    return fetch(configPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load config: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            return data as Config;
        });
};
