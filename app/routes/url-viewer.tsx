import { useState } from 'react';
import { Input, Layout, Typography } from 'antd';
import MCPServerComponent from '../components/MCPServerComponent';
import type { MCPServer } from '../models/MCPServer';

const { Content } = Layout;
const { Title } = Typography;

export default function UrlViewer() {
    const [url, setUrl] = useState('');
    const server: MCPServer = {
        name: 'MCP Server Viewer',
        description: '',
        labels: [],
        sseUrl: url,
    };
    return (
        <Layout style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            <Content>
                <Title level={1}>URL Viewer</Title>
                <Input
                    type='text'
                    placeholder='Enter MCP Server URL...'
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    style={{ marginBottom: '24px' }}
                />
                {url && <MCPServerComponent server={server} />}
            </Content>
        </Layout>
    );
}
