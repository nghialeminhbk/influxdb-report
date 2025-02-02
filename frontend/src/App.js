import React, { useState } from 'react';
import './App.css';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, ConfigProvider } from 'antd';
import Report from './pages/Report';
const { Header, Sider, Content } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [resize, setResize] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const siderStyle = {
    overflow: 'auto',
    height: '100vh',
    position: 'sticky',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Poppins",
          borderRadius: "0.25rem",
        }
      }}
    >
      <Layout hasSider>
        <Sider style={siderStyle} collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
          <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
            <img className="logo" src="./aws1.png" alt='nghia' style={{ width: "50px", height: "50px" }} />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <PieChartOutlined />,
                label: 'Reports',
              }
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              padding: 24,
              minHeight: 280,
            }}
          >
            <Report
              resize={resize}
              onResize={(e) => setResize(e)}
            />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
export default App;