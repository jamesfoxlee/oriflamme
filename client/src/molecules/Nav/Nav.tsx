import React, { useContext } from "react";
import PropTypes from "prop-types";

import "./Nav.css";

import { UserContext } from "../../context/user.context";

export default function Nav() {
  const [user] = useContext(UserContext);
  const userForDisplay = user && user.name ? user.name : "Guest";

  return (
    <div className="nav">
      <div className="nav__logo">Oriflamme</div>
      <div className="nav__user">
        <div>{userForDisplay}</div>
      </div>
    </div>
  );
}

const { string, shape } = PropTypes;
Nav.propTypes = {
  user: shape({
    id: string,
    name: string,
  }),
};
