import * as React from "react";
import { Form, notification, Input, Select, Button } from "antd";
import { AppLayout } from "./Layout";
import { navigate } from "@reach/router";

const IndexPage: React.FC = () => {
  return (
    <AppLayout title="IndexPage">
      <Form
        className="login-form"
        onSubmit={event => {
          event.preventDefault();
          notification.info({ message: "You are logged in!" });
          navigate("dashboard");
        }}
      >
        <Form.Item label="Email">
          <Input type="email" size="large" placeholder="me@mbasov.com" />
        </Form.Item>
        <Form.Item label="Password">
          <Input type="password" size="large" placeholder="••••••••" />
        </Form.Item>
        <Form.Item label="Role">
          <Select placeholder="Choose your role" size="large">
            <Select.Option value="HomeOwner">HomeOwner</Select.Option>
            <Select.Option value="Pro">Pro</Select.Option>
          </Select>
        </Form.Item>
        <Button type="primary" size="large" htmlType="submit">
          Sign In
        </Button>
      </Form>
    </AppLayout>
  );
};

export default IndexPage;
