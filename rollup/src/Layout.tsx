import * as React from "react";
import { Link, Location } from "@reach/router";
import { Layout, Menu } from "antd";
import pkg from '../package.json'

export const AppLayout: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <Layout>
      <Location>
        {location => (
          <Layout.Sider theme="light">
            <h1 className="logo">{pkg.name}</h1>
            <Menu theme="light" selectedKeys={[location.location.pathname]}>
              <Menu.Item key="/">
                <Link to="/">IndexPage</Link>
              </Menu.Item>
              <Menu.Item key="/dashboard">
                <Link to="/dashboard">DashboardPage</Link>
              </Menu.Item>
            </Menu>
          </Layout.Sider>
        )}
      </Location>
      <Layout>
        <Layout.Header>
          <h1 className="page-header">{title}</h1>
        </Layout.Header>
        <Layout.Content className="page-content">{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};
