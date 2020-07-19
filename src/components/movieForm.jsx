import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { toast } from "react-toastify";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
    items: [],
  };

  async componentDidMount() {
    const { history, match } = this.props;
    try {
      const items = await getGenres();
      this.setState({ items: items.data });

      if (match.params.id === "new") return;

      const { data: movie } = await getMovie(match.params.id);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (error) {
      if (error.response.status === 404) return history.replace("/not-found");
    }
  }

  mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .required()
      .label("Number In Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).label("Daily Rental Rate"),
  };

  doSubmit = async () => {
    const { history, match } = this.props;
    try {
      await saveMovie(this.state.data, match.params.id);
      history.push("/movies");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) return history.replace("/not-found");
        else if (error.response.data.path) {
          const errors = { ...this.state.errors };
          errors[error.response.data.path[0]] = error.response.data.message;
          this.setState(errors);
        } else toast.error(error.response.data);
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelectMenu("genreId", "Genre")}
          {this.renderInput("numberInStock", "Number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default MovieForm;
