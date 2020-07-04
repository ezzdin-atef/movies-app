import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <nav className="nav">
          <ul>
            <li>
              <NavLink to="/movies">Movies</NavLink>
              <NavLink to="/Series">Series</NavLink>
            </li>
          </ul>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
