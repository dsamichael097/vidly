import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import Search from "./common/search";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: {
      path: "title",
      order: "asc",
    },
    selectedGenre: { name: "All Genres" },
    genres: [],
    searchQuery: "",
    errors: null,
    isLoading: true,
  };

  async componentDidMount() {
    try {
      const { data } = await getGenres();

      const genres = [{ _id: "", name: "All Genres" }, ...data];

      const { data: movies } = await getMovies();

      //setTimeout(() => {
      this.setState({ movies, genres, errors: null, isLoading: false });
      //}, 4000);
    } catch (error) {
      const errors = {};
      if (error.response) {
        errors.details = error.response.data.message;
        this.setState({ errors });
      }
    }
  }

  handleDelete = async (movieId) => {
    const originalMovieState = this.state.movies;
    try {
      const movies = originalMovieState.filter(
        (movie) => movie._id !== movieId
      );
      this.setState({ movies, currentPage: 1 });
      await deleteMovie(movieId);
      toast.success("Movie Deleted Successfully");
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error(error.response.data.message);
      this.setState({ movies: originalMovieState });
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query.toLowerCase(),
      selectedGenre: { name: "All Genres" },
    });
  };

  getPagedData = () => {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
    } = this.state;

    let filteredMovies = [];
    if (searchQuery !== "") {
      filteredMovies = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery)
      );
    } else {
      filteredMovies =
        selectedGenre && selectedGenre._id
          ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
          : allMovies;
    }

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sortedMovies, currentPage, pageSize);

    return { totalCount: filteredMovies.length, movies: movies };
  };

  render() {
    const {
      pageSize,
      currentPage,
      sortColumn,
      genres,
      selectedGenre,
    } = this.state;

    const { totalCount, movies } = this.getPagedData();
    const { user } = this.props;

    if (this.state.errors) return <p> Error Loading Data </p>;
    if (this.state.isLoading)
      return <img className="loading" src="loading.gif" alt="Loading..." />;

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {user && (
            <Link
              className="btn btn-primary newMovie"
              to={`${this.props.match.path}/new`}
            >
              Add Movie
            </Link>
          )}
          <p>
            Showing {totalCount} movies in {selectedGenre.name}
          </p>
          <Search value={this.state.searchQuery} onSearch={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLikeToggle={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            totalElements={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
