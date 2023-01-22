import React from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("currentUser");
    navigate("/login");
    window.location.reload();
  }
  const token = JSON.parse(localStorage.getItem("currentUser"))?.token;
  const decoded = token ? jwt_decode(token) : null;
  return (
    <div className="_navbar">
      <nav className="navbar navbar-expand-lg ">
        <a className="navbar-brand" href="/">
          Ibiza
        </a>
        <button
          className="navbar-toggler "
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i className="fa fa-bars" style={{ color: "white" }}></i>
          </span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {token ? (
              <div className="dropdown mr-5">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa fa-user" aria-hidden="true"></i>{" "}
                  {decoded?.name}
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item" href="/profile">
                    Profile
                  </a>
                  {decoded.isAdmin && (
                    <a className="dropdown-item" href="/admin">
                      Admin
                    </a>
                  )}
                  <a className="dropdown-item" href="#top" onClick={logout}>
                    Logout
                  </a>
                </div>
              </div>
            ) : (
              <>
                <li className="nav-item ">
                <Link to="/register">
                  <a className="nav-link" href="#top">
                    Register
                  </a>
                  </Link>
                </li>
                <li className="nav-item">
                <Link to="/login">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
