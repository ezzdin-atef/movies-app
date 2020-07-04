import React, { Component } from "react";
import NavBar from "./navBar";
import http from "../services/httpService";
import getKey from "../config";

class SearchBanar extends Component {
  state = {
    img: "",
  };

  async componentDidMount() {
    const { data } = await http.get(
      "https://api.themoviedb.org/3/trending/all/day?api_key=" + getKey()
    );
    const rand = Math.round(Math.random() * 20);
    let img =
      "https://image.tmdb.org/t/p/w600_and_h900_bestv2/or06FN3Dka5tukK1e9sl16pB3iy.jpg";
    if (data.results[rand] !== undefined)
      img =
        "https://image.tmdb.org/t/p/w600_and_h900_bestv2" +
        data.results[rand].poster_path;
    this.setState({ img });
  }

  render() {
    const { img } = this.state;
    return (
      <div
        className="bannar"
        style={{
          backgroundImage: `url(${img})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="overlay blur"></div>
        <NavBar />
        <div className="container">
          <h1>Movies App</h1>
          <input
            type="serach"
            name="serach"
            placeholder="Serach..."
            id="search"
            className="form-control form-control-lg"
            onChange={(e) => this.props.onChange(e.target.value)}
          />
        </div>
      </div>
    );
  }
}

export default SearchBanar;
