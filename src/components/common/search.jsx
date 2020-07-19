import React from "react";

const Search = ({ value, onSearch }) => {
  return (
    <input
      type="text"
      name="search"
      className="form-control my-3"
      placeholder="Search..."
      value={value}
      onChange={(e) => onSearch(e.currentTarget.value)}
    />
  );
};

export default Search;
