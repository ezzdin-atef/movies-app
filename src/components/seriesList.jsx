import React, { Component } from "react";
import SearchBanar from "./searchBanar";
import ListOfSeries from "./listOfSeries";
import http from "../services/httpService";

class SeriesList extends Component {
  state = {
    series: [],
    total: 0,
    current_page: this.props.match.params.id || 1,
  };

  fetchData = async () => {
    const { data } = await http.get(
      "https://api.themoviedb.org/3/tv/popular?api_key=" +
        process.env.REACT_APP_API_KEY +
        "&language=en-US&page=" +
        this.state.current_page
    );
    this.setState({ series: data.results, total: data.total_results });
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
      "https://api.themoviedb.org/3/tv/latest?api_key=" +
        process.env.REACT_APP_API_KEY +
        "&language=en-US&page=" +
        page
    );
    this.setState({ movies: data.results, current_page: page });
  };

  handleChange = async (query) => {
    if (query) {
      const { data } = await http.get(
        "https://api.themoviedb.org/3/search/tv?api_key=" +
          process.env.REACT_APP_API_KEY +
          "&language=en-US&query=" +
          query +
          "&page=" +
          this.state.current_page +
          "&include_adult=false"
      );
      this.setState({ series: data.results, total: 20 });
    } else {
      await this.fetchData();
    }
  };

  render() {
    const { series, total, current_page } = this.state;
    return (
      <React.Fragment>
        <SearchBanar onChange={this.handleChange} />
        <ListOfSeries
          data={series}
          total={total}
          current_page={current_page}
          handlePageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default SeriesList;
