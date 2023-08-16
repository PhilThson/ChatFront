import logo from "../main-page/ChatIcon.png";
import React from "react";

const Header = ({ subtitle }) => (
  <header className="row">
    <div className="column">
      <img src={logo} alt="logo" />
    </div>
    <div className="column small-12 medium-6 large-9 subtitle">{subtitle}</div>
  </header>
);

export default Header;
