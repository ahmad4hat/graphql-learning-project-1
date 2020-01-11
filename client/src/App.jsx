import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
//components
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>ahmad's reading list</h1>
        <BookList />
        <h1>Author list</h1>
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
