import React, { Component } from "react";
import { Link } from "react-router-dom";
import HomeBtn from "./common/homeBtn";
import http from "../services/httpService";
import getKey from "../config";

class TvView extends Component {
  state = {
    id: this.props.match.params.id,
    data: [],
    similar: [],
  };
  fetchData = async () => {
    const { data } = await http.get(
      "https://api.themoviedb.org/3/tv/" +
        this.state.id +
        "?api_key=" +
        getKey()
    );
    const { data: similar } = await http.get(
      "https://api.themoviedb.org/3/tv/" +
        this.state.id +
        "/similar?api_key=" +
        getKey() +
        "&language=en-US"
    );
    this.setState({ data, similar });
  };

  async componentDidMount() {
    await this.fetchData();
  }

  async componentDidUpdate() {
    if (this.props.match.params.id !== this.state.id) {
      this.setState({ id: this.props.match.params.id });
    }
    await this.fetchData();
  }

  render() {
    const { data, similar } = this.state;
    const img =
      "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + data.poster_path;
    return (
      <div
        className="movie-view"
        style={{
          backgroundImage: `url(${img})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <HomeBtn />
        <div className="overlay blur"></div>
        <div className="container">
          <div className="row">
            <div className="col-5 left">
              <img src={img} alt={data.title} />
            </div>
            <div className="col-7 right">
              <h1>{data.name}</h1>
              <div className="genres">
                Genres:
                <ul>
                  {(data.genres || []).map((g) => (
                    <li key={g.id}>{g.name}</li>
                  ))}
                </ul>
              </div>
              <div className="release">
                Release Date: <code>{data.first_air_date}</code>
              </div>
              <div className="status">
                Status:{" "}
                <span
                  style={{
                    color: `${
                      data.status === "Ended"
                        ? "var(--warning)"
                        : "var(--danger)"
                    }`,
                  }}
                >
                  {data.status}
                </span>
              </div>
              <div className="rate">
                <i className="fa fa-star" aria-hidden="true"></i>{" "}
                {data.vote_average * 10 + "%"}
              </div>
              <p className="lead">{data.overview}</p>
              <div className="similar">
                <ul>
                  Similar Series:
                  {similar.total_results === 0 && (
                    <p className="text-danger">there is no movies</p>
                  )}
                  {(similar.results || []).slice(0, 8).map((m) => (
                    <li key={m.id}>
                      <Link to={"/tv/" + m.id}>{m.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TvView;
