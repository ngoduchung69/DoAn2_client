import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import {  useQuery } from "@apollo/react-hooks";
import { LightOnQuery } from "./schema/query";
import DACN from "./components/table";
import Chartsss from "./components/chart";

const App = () => {
  const { loading, error, data } = useQuery(LightOnQuery, {
    // pollInterval: 500,
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <DACN data={data} />
          <Chartsss data={data} />
        </Route>
      </Switch>
    </Router>

  );
}


export default App;
