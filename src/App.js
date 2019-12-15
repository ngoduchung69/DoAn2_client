import React, { Component } from "react";
// import ApolloClient from "apollo-boost";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import StudentsList from "./components/studentsList/studentsList";
import Home from "./components/home/home";
import { createUploadLink } from "apollo-upload-client";
import {InMemoryCache} from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

// const link = createUploadLink({ uri: "http://localhost:4000/graphql" });

export const client = new ApolloClient({
  // uri: "http://localhost:4000/graphql",
  link,
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home}>
              {/* <Home /> */}
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
