import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Books from "./Books";

const client = new ApolloClient({ uri: "http://localhost:4000/graphql" });

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        {/* ↑ Apolloクライアント(GraphQLのクエリ)を使えるように設定 */}
        <div>
          <h2>My first Apollo app</h2>
          <Books />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
