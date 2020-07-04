import React, { Component } from "react";
import SearchBanar from "./searchBanar";
import http from "../services/httpService";
import ListOfMovies from "./listOfMovies";
import getKey from "../config";

class MoviesList extends Component {
  state = {
    movies: [],
    total: 0,
    current_page: this.props.match.params.id || 1,
  };

  fetchData = async () => {
    const { data } = await http.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=" +
        getKey() +
        "&language=en-US&page=" +
        this.state.current_page
    );
    this.setState({ movies: data.results, total: data.total_results });
  };

  async componentDidMount() {
    await this.fetchData();
  }

  async componentDidUpdate() {
    if (
      this.state.current_page !== this.props.match.params.id &&
      this.props.match.params.id
    ) {
      this.setState({ current_page: this.props.match.params.id || 1 });
      await this.fetchData();
    }
  }

  handlePageChange = async (page) => {
    const { data } = await http.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=" +
        getKey() +
        "&language=en-US&page=" +
        page
    );
    this.setState({ movies: data.results, current_page: page });
  };

  handleChange = async (query) => {
    if (query) {
      const { data } = await http.get(
        "https://api.themoviedb.org/3/search/movie?api_key=" +
          getKey() +
          "&language=en-US&query=" +
          query +
          "&page=" +
          "1" +
          "&include_adult=false"
      );
      this.setState({ movies: data.results, total: 20 });
    } else {
      await this.fetchData();
    }
  };

  render() {
    const { movies, total, current_page } = this.state;

    return (
      <React.Fragment>
        <SearchBanar onChange={this.handleChange} />
        <ListOfMovies
          data={movies}
          total={total}
          current_page={current_page}
          handlePageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default MoviesList;
