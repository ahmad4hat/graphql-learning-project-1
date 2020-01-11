import React from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const getBooksQuery = gql(`
  {
    books {
      id
      name
      genre
    }
  }
`);

const BookList = props => {
  const { data, error, loading } = useQuery(getBooksQuery);
  //const data = useQuery(getBooksQuery);

  let displayBooks;

  if (loading) {
    displayBooks = <h1>Loading books .. please wait </h1>;
  } else {
    displayBooks = data.books.map(book => <li key={book.id}>{book.name}</li>);
  }

  console.log(data);
  return (
    <div>
      {loading && <h1>loading...</h1>}
      <ul>{displayBooks}</ul>
    </div>
  );
};

BookList.propTypes = {};

export default BookList;
