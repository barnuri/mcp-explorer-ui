import { useEffect, useState } from 'react';
import { Tabs, Spin, Tag, Button, Input, Modal, Form, Select } from 'antd';
import { getTools, getPrompts, getResources, type MCPTool, type MCPPrompt, type MCPResource, callTool } from '../helpers/mcp';
import type { MCPServer } from '../models/MCPServer';
import { MCPToolComponent } from './MCPToolComponent';

export default function MCPServerComponent({ server }: { server: MCPServer }) {
    const [tools, setTools] = useState([] as MCPTool[]);
    const [prompts, setPrompts] = useState([] as MCPPrompt[]);
    const [resources, setResources] = useState([] as MCPResource[]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [form] = Form.useForm();
    const serverDict = { ...(server.sseUrlDict || {}), ...(server.offlineDataDict || {}) };
    const envs = Object.keys(serverDict);
    const [selectedEnv, setSelectedEnv] = useState(envs[0] || '');
    const sseUrl = envs.length > 0 && server.sseUrlDict ? server.sseUrlDict[selectedEnv] : server.sseUrl;
    const offlineData = envs.length > 0 && server.offlineDataDict ? server.offlineDataDict[selectedEnv] : server.offlineData;

    useEffect(() => {
        if (sseUrl) {
            setLoading(true);
            const url = new URL(sseUrl);
            Promise.all([getTools(url), getPrompts(url), getResources(url)])
                .then(([toolsData, promptsData, resourcesData]) => {
                    setTools(toolsData);
                    setPrompts(promptsData);
                    setResources(resourcesData);
                })
                .finally(() => setLoading(false));
        }
        if (offlineData) {
            setTools(offlineData.tools || []);
            setPrompts(offlineData.prompts || []);
            setResources(offlineData.resources || []);
            setLoading(false);
        }
    }, [server, selectedEnv]);

    const showModal = (item: any) => {
        setSelectedItem(item);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if (!sseUrl) {
            return;
        }
        form.validateFields().then(values => {
            console.log('Parameters:', values);
            setIsModalVisible(false);
            callTool(new URL(sseUrl!), selectedItem, values);
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleEnvChange = (value: string) => {
        setSelectedEnv(value);
        setLoading(true);
        setTools([]);
        setPrompts([]);
        setResources([]);
    };

    if (!server) return <p className='text-center text-lg font-semibold'>Server not found.</p>;

    return (
        <main style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>{server.name}</h1>
            <p>{server.description}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
                {server.labels.map((label, i) => (
                    <Tag key={i} color='blue'>
                        {label}
                    </Tag>
                ))}
            </div>

            {envs.length > 0 && (
                <div style={{ marginTop: '16px', marginBottom: '16px' }}>
                    <span style={{ marginRight: '8px', fontWeight: 'bold' }}>Environment:</span>
                    <Select value={selectedEnv} onChange={handleEnvChange} style={{ width: 200 }}>
                        {envs.map(env => (
                            <Select.Option key={env} value={env}>
                                {env}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
            )}

            <div style={{ marginTop: '24px' }}>
                <Tabs
                    defaultActiveKey='tools'
                    items={[
                        {
                            tabKey: 'Tools',
                            label: 'Tools',
                            key: 'Tools',
                            children: loading ? (
                                <Spin />
                            ) : (
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {tools.map((tool, i) => (
                                        <li key={i} style={{ marginBottom: '8px' }}>
                                            <MCPToolComponent tool={tool} />
                                            <Button style={{ marginTop: 15 }} type='primary' onClick={() => showModal(tool)}>
                                                Execute with Parameters
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            ),
                        },
                        {
                            tabKey: 'Prompts',
                            label: 'Prompts',
                            key: 'Prompts',
                            children: loading ? (
                                <Spin />
                            ) : (
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {prompts.map((prompt, i) => (
                                        <li
                                            key={i}
                                            style={{
                                                padding: '16px',
                                                border: '1px solid #d9d9d9',
                                                borderRadius: '4px',
                                                backgroundColor: '#f5f5f5',
                                                marginBottom: '8px',
                                            }}
                                        >
                                            {prompt.name}
                                            {prompt.description}
                                            {/* <Button type='primary' onClick={() => showModal(prompt)}>
                                            Execute with Parameters
                                        </Button> */}
                                        </li>
                                    ))}
                                </ul>
                            ),
                        },
                        {
                            tabKey: 'Resources',
                            label: 'Resources',
                            key: 'Resources',
                            children: loading ? (
                                <Spin />
                            ) : (
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {resources.map((resource, i) => (
                                        <li
                                            key={i}
                                            style={{
                                                padding: '16px',
                                                border: '1px solid #d9d9d9',
                                                borderRadius: '4px',
                                                backgroundColor: '#f5f5f5',
                                                marginBottom: '8px',
                                            }}
                                        >
                                            {resource.name}
                                            {resource.description}
                                            {/* <Button type='primary' onClick={() => showModal(resource)}>
                                            Execute with Parameters
                                        </Button> */}
                                        </li>
                                    ))}
                                </ul>
                            ),
                        },
                    ]}
                />
            </div>
            <Modal title='Execute with Parameters' open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} layout='vertical'>
                    {selectedItem?.inputSchema &&
                        Object.keys(selectedItem.inputSchema.properties).map((key: string) => (
                            <Form.Item key={key} label={key} name={key} rules={[{ required: true, message: `Please input ${key}` }]}>
                                <Input />
                            </Form.Item>
                        ))}
                </Form>
            </Modal>
        </main>
    );
}
