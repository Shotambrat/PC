// app/admin/layout.js
"use client"

import { Layout, Menu } from 'antd';
import { useRouter } from 'next/navigation';
import { UserOutlined, FileTextOutlined, PictureOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

export default function AdminLayout({ children }) {
  const router = useRouter();

  return (
    <Layout style={{ minHeight: '100vh' }} className='mt-8'>
      <Sider>
        <div className="logo" />
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<FileTextOutlined />} onClick={() => router.push('/admin/content-management')}>
            Content Management
          </Menu.Item>
          <Menu.Item key="2" icon={<PictureOutlined />} onClick={() => router.push('/admin/banners')}>
            Banner Management
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />} onClick={() => router.push('/admin/users')}>
            User Management
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
