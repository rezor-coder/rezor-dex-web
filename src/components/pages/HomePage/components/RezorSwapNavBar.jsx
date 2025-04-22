import React, { useState } from "react";
import {  useLocation } from "react-router-dom";
// import { ROUTES } from "../../../../utils/constants";

import { setTheme } from "../../../../features/theme/theme.slice";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";




const RezorSwapNavBar = () => {
    // const [isTradeOpen, setIsTradeOpen] = useState(false);
    // const [isEarnOpen, setIsEarnOpen] = useState(false);
      const { theme } = useAppSelector((state) => state.theme);
      const dispatch = useAppDispatch();
    // const storedTheme = localStorage.getItem("theme") || "light";
    const [isDark, setIsDark] = useState(theme === "dark");
    
    const toggleMode = () => {
        // const newTheme = isDark ? "light" : "dark";
        var newTheme = theme === "dark" ? "light" : "dark";
        setIsDark(!isDark);
        localStorage.setItem("theme", newTheme);
        dispatch(setTheme(newTheme));
        document.body.classList.toggle("dark-mode", !isDark);
    };

  var location  = useLocation();

//   console.log(location.pathname);
  
  // if(location.pathname === "/") {

  //   require("../../../../assets/css/bootstrap/bootstrap.min.css");
  //   require("../../../../assets/css/style.css");
  //   require("../../../../assets/css/responsive.css");
  //   require("../../../../assets/css/dark-mode.css");
  // }
  
  return (
    <header className="navbar-container1 pt-sm-2 mx-xl-4">
      <div className="container custom-container main-container ">
        <nav className="navbar navbar-expand-lg bg-white border-radius-10 px-1 z-index-3">
          <div className="container-xxl">
            <a className="navbar-brand" href="/">
              <img src="/assets/images/logo-main.png" className="img-fluid" alt="" />
            </a>


            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
            >
              <img
                src="/assets/images/menu.png "
                className="border-0 menuImageForDark"
              alt="" />
            </button>

            <div
              className="offcanvas rezorSwapNavBar offcanvas-end bg-white"
              tabIndex="-1"
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
            >
              <div className="offcanvas-header">
                <h5
                  className="offcanvas-title font-geist menu-text "
                  id="offcanvasNavbarLabel"
                >
                  Menu
                </h5>
                <button
                  type="button"
                  className="btn-close text-white bg-light"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body align-items-center "  >
                <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-5 gap-3 align-items-lg-center rezorSwapNavBarUl">
                  <li className="nav-item">
                    <a className={`nav-link fw-medium font-geist ${location.pathname == '/'? "active":''}`}  href="/">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className={`nav-link fw-medium font-geist ${location.pathname == '/swap'? "active":''}`}  href="/swap">
                      Swap
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className={`nav-link fw-medium font-geist ${location.pathname == '/liquidity'? "active":''}`} href="/liquidity">
                      Liquidity
                    </a>
                  </li>
                 

                  {/* <li className="nav-item dropdown "
                    onMouseEnter={() => setIsTradeOpen(true)}
                    onMouseLeave={() => setIsTradeOpen(false)}
                  >
                    <a
                      className="nav-link fw-medium font-geist align-items-lg-center d-flex navdropdownitem dropdownimgaHover"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    >
                    Trade
                      <img
                        className="img-fluid mt-lg-2" 
                        src="/assets/images/arrow-right-forlight.png"
                      />
                    </a>

                    {isTradeOpen && (
                      <ul className="dropdown-menu show">
                        <li>
                          <Link to="#" className="dropdown-item">
                            Coming Soon
                          </Link>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Coming Soon
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Coming Soon
                          </a>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li className="nav-item dropdown"
                      onMouseEnter={() => setIsEarnOpen(true)}
                      onMouseLeave={() => setIsEarnOpen(false)}
                  >
                    <a
                      className="nav-link fw-medium font-geist align-items-lg-center d-flex navdropdownitem dropdownimgaHover"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    >
                      Earn
                      <img
                        className="img-fluid mt-lg-2"
                        src="/assets/images/arrow-right-forlight.png"
                      />
                    </a>

                    {isEarnOpen && (
                      <ul className="dropdown-menu show">
                        <li>
                          <Link to="#" className="dropdown-item">
                            Coming Soon
                          </Link>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Coming Soon
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Coming Soon
                          </a>
                        </li>
                      </ul>
                    )}
                  </li>
                   <li className="nav-item">
                    <Link className="nav-link fw-medium font-geist" to={ROUTES.LIQUIDITY} href="#">
                    Liquidity
                    </Link>
                  </li>
                   <li className="nav-item">
                    <Link className="nav-link fw-medium font-geist" to="#">
                    Trade History
                    </Link>
                  </li> */}


                  {/* <li className="nav-item">
                    <Link to="/termsandconditions" className="nav-link fw-medium font-geist" href="#">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/privacypolicy" className="nav-link fw-medium font-geist" href="#">
                      Privacy Policy
                    </Link>
                  </li> */}
                </ul>

                <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3 ms-md-4">
                  <a
                    href="https://x.com/rezor_official?s=21&t=Pqj041XnLLBjILHh9nKyzg"
                    className="community_button darkButton font-geist text-white text-decoration-none"
                  >
                    Our Community
                  </a>
                  <button
                    id="modeToggle"
                    className="border-0 bg-transparent"
                    onClick={() => toggleMode()}
                  >
                    <img
                      id="modeIcon"
                      src={
                        isDark
                          ? "/assets/images/darkToggle.png"
                          : "/assets/images/lightToggle.png"
                      }
                      alt="Mode Icon"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default RezorSwapNavBar;
