import React from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

export const GET_BOOK_QUERY = gql`
  query($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          id
          name
          genre
        }
      }
    }
  }
`;

//type is is imptant

const BookDetails = props => {
  const { data, loading, error } = useQuery(GET_BOOK_QUERY, {
    variables: { id: props.bookId }
  });

  let bookDetails = null;

  if (data && data.book) {
    bookDetails = (
      <div>
        <h2 id="book-title">{data.book.name}</h2>
        <p>{data.book.genre}</p>
        <h3>Author details</h3>
        <h4>name :{data.book.author.name}</h4>
        <h2>Other books of this {data.book.author.name}</h2>
        <ul>
          {data.book.author.books.map(book => (
            <li key={book.name}>
              <p>{book.name}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    bookDetails = <p>No book selected</p>;
  }
  return <div id="book-detail">{bookDetails}</div>;
};

BookDetails.propTypes = {};

export default BookDetails;
