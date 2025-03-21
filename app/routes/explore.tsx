import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Input, Card, Row, Col, Tag, Typography, theme } from 'antd';
import getConfig from '../helpers/getConfig';
import type { MCPServer } from '../models/MCPServer';

const { Title } = Typography;

export default function Explore() {
    const [servers, setServers] = useState([] as MCPServer[]);
    const [search, setSearch] = useState('');
    const { token } = theme.useToken();

    useEffect(() => {
        getConfig().then(data => setServers(data.mcpServers || []));
    }, []);

    const filteredServers = servers.filter(server => JSON.stringify(server).toLowerCase().includes(search.toLowerCase()));

    return (
        <main style={{ 
            padding: '24px', 
            maxWidth: '1200px', 
            margin: '0 auto',
            backgroundColor: token.colorBgContainer,
            borderRadius: token.borderRadiusLG,
            marginTop: '24px',
            boxShadow: token.boxShadow
        }}>
            <Title level={2} style={{ color: token.colorTextHeading, marginBottom: '20px' }}>
                MCP Servers Explorer
            </Title>

            <Input 
                placeholder='Search MCP Servers...' 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                style={{ 
                    marginBottom: '24px',
                    backgroundColor: token.colorBgElevated,
                    borderColor: token.colorBorder
                }} 
            />
            
            <Row gutter={[16, 16]}>
                {filteredServers.map((server, index) => (
                    <Col key={index} xs={24} sm={12} md={8}>
                        <Link to={`/mcp-server/${index}`}>
                            <Card
                                title={server.name} 
                                hoverable
                                style={{
                                    backgroundColor: token.colorBgElevated,
                                    borderColor: token.colorBorderSecondary,
                                    transition: 'all 0.3s ease'
                                }}
                                headStyle={{
                                    color: token.colorTextHeading,
                                    backgroundColor: token.colorBgContainer,
                                    borderColor: token.colorBorderSecondary
                                }}
                                bodyStyle={{
                                    color: token.colorText
                                }}
                            >
                                <p>{server.description}</p>
                                <div>
                                    {server.labels.map((label, i) => (
                                        <Tag 
                                            key={i} 
                                            color='blue'
                                            style={{
                                                marginRight: '8px',
                                                marginBottom: '4px'
                                            }}
                                        >
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
