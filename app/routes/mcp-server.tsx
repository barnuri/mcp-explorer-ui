import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Spin, Layout, Typography } from 'antd';
import getConfig from '../helpers/getConfig';
import type { MCPServer } from '../models/MCPServer';
import MCPServerComponent from '../components/MCPServerComponent';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

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

    if (loadingConfig) return <Spin />;
    if (!server) return <Paragraph className='text-center text-lg font-semibold'>Server not found.</Paragraph>;

    return (
        <Layout style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            <Content>
                <MCPServerComponent server={server} />
            </Content>
        </Layout>
    );
}
