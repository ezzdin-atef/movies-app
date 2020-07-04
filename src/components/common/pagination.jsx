import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import _ from "lodash";

const Pagination = ({
  itemsCount,
  pageSize,
  currentPage,
  onPageChange,
  type,
}) => {
  currentPage = parseInt(currentPage, 10);
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  let pages = _.range(1, pagesCount + 1);
  if (pagesCount >= 10 && currentPage + 6 <= pagesCount && currentPage >= 10)
    pages = _.range(currentPage - 5, currentPage + 6);
  else if (pagesCount >= 10 && currentPage + 6 >= pagesCount)
    pages = _.range(pagesCount - 11, pagesCount + 1);
  else pages = _.range(1, 11);

  return (
    <nav>
      <ul className="pagination">
        {currentPage > 9 && pagesCount >= 10 && (
          <React.Fragment>
            <li className={"page-item"}>
              <NavLink
                to={"/" + type + "/pages/1"}
                className="page-link"
                onClick={() => onPageChange(1)}
              >
                1
              </NavLink>
            </li>{" "}
            <span className="mx-2">...</span>
          </React.Fragment>
        )}
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <NavLink
              to={"/" + type + "/pages/" + page}
              className="page-link"
              onClick={() => onPageChange(page)}
            >
              {page}
            </NavLink>
          </li>
        ))}
        {currentPage <= pagesCount - 6 && (
          <React.Fragment>
            <span className="mx-2">...</span>
            <li className={"page-item"}>
              <NavLink
                to={"/" + type + "/pages/" + pagesCount}
                className="page-link"
                onClick={() => onPageChange(pagesCount)}
              >
                {pagesCount}
              </NavLink>
            </li>{" "}
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
