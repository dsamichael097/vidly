import React from "react";
import PropTypes from "prop-types";

const Pagination = (props) => {
  const { currentPage, onPageChange, totalElements, pageSize } = props;
  const pageCount = Math.ceil(totalElements / pageSize);
  // If there's just one page then no need to show pagination
  if (pageCount === 1) return null;
  //If more than one pages, then create a pages array which stores page numbers
  //And then use these page numbers to map these
  let pages = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        <li className={currentPage <= 1 ? "page-item disabled" : "page-item"}>
          <a
            onClick={() => onPageChange(currentPage - 1)}
            className="page-link"
            href="#a"
          >
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </a>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={
              page === props.currentPage ? "page-item active" : "page-item"
            }
          >
            <a
              onClick={() => onPageChange(page)}
              className="page-link"
              href="#a"
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={
            currentPage >= pageCount ? "page-item disabled" : "page-item"
          }
        >
          <a
            onClick={() => onPageChange(currentPage + 1)}
            className="page-link"
            href="#a"
          >
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  totalElements: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default Pagination;

/*

Prop Types is used to check the type of prop that we recieve vs the expected type, if the types don't match
Prop types gives an error in the browser console, so we can debug our apps easily

*/
