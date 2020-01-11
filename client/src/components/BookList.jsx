import React, { useState } from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import BookDetails from "./BookDetails";

export const getBooksQuery = gql(`
  {
    books {
      id
      name
      genre
    }
  }
`);

const BookList = props => {
  const [selected, setSelected] = useState(null);

  const { data, error, loading } = useQuery(getBooksQuery);
  //const data = useQuery(getBooksQuery);

  let displayBooks;

  if (loading) {
    displayBooks = <h1>Loading books .. please wait </h1>;
  } else {
    displayBooks = data.books.map(book => (
      <li onClick={event => setSelected(book.id)} key={book.id}>
        {book.name}
      </li>
    ));
  }

  return (
    <div>
      {loading && <h1>loading...</h1>}
      <ul id="book-list">{displayBooks}</ul>
      <BookDetails bookId={selected} />
    </div>
  );
};

BookList.propTypes = {};

export default BookList;
