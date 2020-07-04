import React from "react";
import { Link } from "react-router-dom";

const HomeBtn = () => {
  return (
    <Link to="/" className="home-btn">
      <i className="fa fa-reply" aria-hidden="true"></i> Go To Homepage
    </Link>
  );
};

export default HomeBtn;
