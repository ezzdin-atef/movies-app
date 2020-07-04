import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "./common/pagination";

class ListOfMovies extends Component {
  state = {};
  render() {
    const { data, total, current_page, handlePageChange } = this.props;
    const defaultImg =
      "https://images.unsplash.com/photo-1592153851212-8477c272d3d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjExMDk0fQ&auto=format&fit=crop&w=634&q=80";
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            {(data || []).map((item) => (
              <div key={item.id} className="col-md-4 col-sm-12 movie-box">
                <div>
                  <Link to={"/movie/" + item.id}>
                    <div className="overlay"></div>
                    <img
                      src={
                        (item.poster_path &&
                          "https://image.tmdb.org/t/p/w600_and_h900_bestv2" +
                            item.poster_path) ||
                        defaultImg
                      }
                      alt={item.title}
                    />
                  </Link>
                  <span className="vote">{item.vote_average * 10 + "%"}</span>
                </div>
                <h3>
                  <Link to={"/movie/" + item.id}>{item.title}</Link>
                </h3>
                <code>{item.release_date}</code>
              </div>
            ))}
          </div>
          <Pagination
            itemsCount={total}
            pageSize={20}
            currentPage={parseInt(current_page, 10)}
            onPageChange={handlePageChange}
            type="movies"
          />
        </div>
      </React.Fragment>
    );
  }
}

export default ListOfMovies;
