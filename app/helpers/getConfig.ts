import type { Config } from '../models/Config';

export default () => {
    const configPath = process.env.CONFIG_PATH || '/config.json';
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
