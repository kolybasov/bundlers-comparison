import * as React from "react";
import { Alert, Progress, Calendar } from "antd";
import { AppLayout } from "./Layout";

const DashboardPage: React.FC = () => {
  return (
    <AppLayout title="DashboardPage">
      <Alert
        type="success"
        message="You have access to the dashboard"
        showIcon
      />
      <br />
      <Progress type="circle" percent={Math.floor(Math.random() * 100)} />
      <br />
      <br />
      <Calendar className="calendar" />
    </AppLayout>
  );
};

export default DashboardPage;
