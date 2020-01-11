import React from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const getAuthorQuery = gql(`{
    authors{
      name,
      age, 
      id
    }
  }`);

const AddBook = props => {
  const { data, error, loading } = useQuery(getAuthorQuery);

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

  console.log(data);
  return (
    <form id="add-book">
      <div className="field">
        <label>Book name:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label>Author:</label>
        <select>
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
