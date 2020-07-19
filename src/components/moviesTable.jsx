import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Like from "./common/like";
import auth from "../services/authService";

class MoviesTable extends Component {
  columns = [
    {
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
      label: "Title",
      path: "title",
    },
    {
      label: "Genre",
      path: "genre.name",
    },
    {
      label: "Stock",
      path: "numberInStock",
    },
    {
      label: "Rate",
      path: "dailyRentalRate",
    },
    {
      key: "like",
      content: (movie) => (
        <Like
          onLikeToggle={() => this.props.onLikeToggle(movie)}
          likeStatus={movie.liked}
        />
      ),
    },
  ];

  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie._id)}
        className="btn btn-danger"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }
  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table
        items={movies}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;

/*

Here Content property is set to a function which when called will return our custom component
And that component will be rendered on the module on which it is called.

*/
