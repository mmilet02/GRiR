import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header>
      <Link to="/">
        <div className="navLink">Home</div>
      </Link>
      <Link to="/fpc">
        <div className="navLink">FCP</div>
      </Link>
    </header>
  );
}

export default Header;
