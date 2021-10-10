import React from "react";
import { Link } from "react-router-dom";

/**
 * Breadcrumb navigation bar
 * Includes link to Home screen & so
 */

const BreadCrumbs = ({ crumbs }) => {
  const breadCrumbs = crumbs.map((crumb, i) => {
    if (i === crumbs.length - 1) {
      return (
        <li
          key={crumb + i}
          className="breadcrumb-item active"
          aria-current="page"
        >
          {crumb}
        </li>
      );
    } else {
      return (
        <li key={crumb + i} className="breadcrumb-item">
          <Link to="#">{crumb}</Link>
        </li>
      );
    }
  });
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        {breadCrumbs}
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
