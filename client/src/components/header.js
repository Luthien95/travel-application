import React from "react";
import Cookie from "js-cookie";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Header() {
  let history = useHistory();
  let username = Cookie.get("username");

  const removeCookie = () => {
    Cookie.remove("token", { path: "" });
    Cookie.remove("username", { path: "" });
    history.push("/login");
  };

  return (
    <header className="header">
      <p>
        <FontAwesomeIcon icon={faUser} className="header__icon" /> {username}
      </p>
      <p onClick={removeCookie}>Logout</p>
    </header>
  );
}

export default Header;
