import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Input, Card, Row, Col } from 'antd';
import getConfig from '../helpers/getConfig';
import type { MCPServer } from '../models/MCPServer';

export default function Explore() {
    const [servers, setServers] = useState([] as MCPServer[]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        getConfig().then(data => setServers(data.mcpServers || []));
    }, []);

    const filteredServers = servers.filter(server => JSON.stringify(server).toLowerCase().includes(search.toLowerCase()));

    return (
        <main style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            <Input
                placeholder='Search MCP Servers...'
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ marginBottom: '24px' }}
            />
            <Row gutter={[16, 16]}>
                {filteredServers.map((server, index) => (
                    <Col key={index} xs={24} sm={12} md={8}>
                        <Link to={`/mcp-server/${index}`}>
                            <Card title={server.name} hoverable>
                                <p>{server.description}</p>
                                <div>
                                    {server.labels.map((label, i) => (
                                        <Tag key={i} color='green'>
                                            {label}
                                        </Tag>
                                    ))}
                                </div>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </main>
    );
}
