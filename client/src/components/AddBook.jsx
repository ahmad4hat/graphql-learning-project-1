import React, { useState } from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { getBooksQuery } from "./BookList";

const getAuthorQuery = gql`
  {
    authors {
      name
      age
      id
    }
  }
`;

const ADD_BOOK_MUTATION = gql`
  mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

const AddBook = props => {
  const { data, error, loading } = useQuery(getAuthorQuery);
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const [addBook, addBookData] = useMutation(ADD_BOOK_MUTATION);

  let AuthorList;

  if (loading) {
    AuthorList = <option disabled>Loading Author .. please wait </option>;
  } else {
    AuthorList = data.authors.map(author => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  }
  const submitBook = event => {
    event.preventDefault();
    console.log({ name, genre, authorId });
    console.log("----------------");
    addBook({
      variables: {
        name,
        genre,
        authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
    console.log(addBookData);
  };
  return (
    <form id="add-book" onSubmit={submitBook}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          value={genre}
          onChange={event => setGenre(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select onChange={event => setAuthorId(event.target.value)}>
          <option>Select author</option>
          {AuthorList}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

AddBook.propTypes = {};

export default AddBook;
