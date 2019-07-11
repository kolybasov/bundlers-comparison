import * as React from "react";
import { Router, RouteComponentProps } from "@reach/router";
import loadable from "@loadable/component";
import "./styles.less";

const IndexPage = loadable<RouteComponentProps>(() => import("./IndexPage"));
const DashboardPage = loadable<RouteComponentProps>(() =>
  import("./DashboardPage")
);

export const App: React.FC = () => {
  return (
    <Router className="root">
      <IndexPage path="/" />
      <DashboardPage path="dashboard" />
    </Router>
  );
};
