// Header.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from ".././assets/images/logo.png";
import US from ".././assets/images/icons/flags/US.png";
import { LOGOUT } from "../api/apiService";

function Header() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchKeyword.trim() !== "") {
      navigate(`/ProductSearch?keyword=${encodeURIComponent(searchKeyword)}`);
    }
  };

  return (
    <header className="section-header">
      <nav className="navbar d-none d-md-flex p-md-0 navbar-expand-sm navbar-light border-bottom" style={{background: 'linear-gradient(to bottom, #f94d30, #ff6633)'}}>
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTop4"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTop4">
            <ul className="navbar-nav mr-auto">
              <li>
                <span className="nav-link text-white">
                  Hi{" "}
                  <Link className="text-white" to="/Profile">
                    {" "}
                    {userEmail}{" "}
                  </Link>
                </span>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li>
                <a href="#" className="nav-link text-white">
                  <i className="fa fa-bell"></i>
                </a>
              </li>
              <li>
                <Link to="/Profile" className="nav-link text-white">
                  <i className="fa fa-user"></i>
                </Link>
              </li>

              {/* <li>
                <Link to="/Cart" className="nav-link text-white">
                  <i className="fa fa-shopping-cart"></i>
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <section className="header-main border-bottom">
          <div className="row row-sm align-items-center">
            <div className="col-6 col-sm col-md col-lg flex-grow-0">
              <Link to="/" className="brand-wrap">
                <img className="logo" src={logo} alt="Logo" />
              </Link>
            </div>
            <div className="col-lg-6 col-xl col-md-5 col-sm-12 flex-grow-1">
              <form onSubmit={handleSearchSubmit} className="search-header">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                  />
                  <button
                    className="btn text-primary px-5"
                    type="submit"
                    style={{ backgroundColor: "#fdefe6" }}
                  >
                    Tìm kiếm
                  </button>
                </div>
              </form>
            </div>
            <div className="col-auto">
              <Link to="/Cart" className="btn btn-white px-4" >
                <i className="fa fa-shopping-cart text-main" style={{fontSize:32}}></i>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </header>
  );
}

export default Header;
