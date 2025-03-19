import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import getConfig from '../helpers/getConfig';
import type { MCPServer } from '../models/MCPServer';
import MCPServerComponent from '../components/MCPServerComponent';

export default function McpServer() {
    const { id } = useParams();
    const [server, setServer] = useState(null as MCPServer | null);
    const [loadingConfig, setLoadingConfig] = useState(true);

    useEffect(() => {
        setLoadingConfig(true);
        getConfig()
            .then(data => setServer(data.mcpServers[Number(id)]))
            .finally(() => setLoadingConfig(false));
    }, [id]);

    if (loadingConfig) return <p className='text-center text-lg font-semibold'>Loading configuration...</p>;
    if (!server) return <p className='text-center text-lg font-semibold'>Server not found.</p>;

    return <MCPServerComponent server={server} />;
}
