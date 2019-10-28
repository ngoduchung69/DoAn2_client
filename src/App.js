import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import StudentsList from "./components/studentsList/studentsList";
import Home from "./components/home/home";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/studentsList">
              <StudentsList />
            </Route>
          </Switch>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
