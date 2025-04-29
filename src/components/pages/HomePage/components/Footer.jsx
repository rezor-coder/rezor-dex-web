import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [status, setStatus] = useState({ status: "", msg: "" });
  const [loading, setLoading] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    console.log("working");
    e.preventDefault();
    if (formData.email != "") {
      setLoading(true);
    }
    const url =
      "https://gmteoqbjt5.execute-api.us-east-1.amazonaws.com" +
      "/src/server/V1/emailSubsription";
    try {
      const response = await axios
        .post(url, formData, {
          headers: { "Content-Type": "application/json" },
        })
        .finally(() => {
          setLoading(false);
        });

      console.log("response");
      console.log(response.data);

      setStatus({ status: response?.data?.status, msg: response?.data?.msg });
      setFormData({ email: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center mb-1">
        <footer className="footer  ">
          <div className="container">
            <div className="row pb-5 mb-3">
              <div className="col-md-5 footer_col">
                <div className="footer_logo">
                  <img
                    src="/assets/images/logo-white.png"
                    className="img-fluid"
                  />
                  <h2 className="font-geist fw-semibold margin-top-50">
                    Still have some questions?
                    <br />
                    Feel free to reach out!
                  </h2>
                  <p className="font-geist fw-semibold mt-3">
                    Drop an email and get in touch
                    <br />
                    with us for any queries
                  </p>
                  {/* <div className="d-block  align-items-center gap-5  ">
                      <div className="mt-3 ">
                        <input
                          type="email"
                          className="form-control rounded-pill font-geist w-75 "
                          id="subscribe_mail"
                          placeholder="Enter Email"
                        />
                      </div>
                    </div> */}
                  {status.status != "" && !status.status && (
                    <div
                      className="alert alert-danger alert-dismissible fade show"
                      role="alert"
                      style={{ zIndex: "9999" }}
                    >
                      {status.msg}
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                        onClick={() => setStatus({ status: "", msg: "" })}
                      ></button>
                    </div>
                  )}

                  {status.status != "" && status.status && (
                    <div
                      className="alert alert-success alert-dismissible fade show"
                      role="alert"
                      style={{ zIndex: "9999" }}
                    >
                      {status.msg}
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                        onClick={() => setStatus({ status: "", msg: "" })}
                      ></button>
                    </div>
                  )}
                  <div className="d-block  align-items-center   ">
                    <a href="https://www.rezor.org/getintouch">
                      <div className="mt-3 emailContainer rounded-pill pe-2">
                      <input
                        type="button"
                        name="email"
                        className="form-control rounded-pill border-0 font-geist w-100 "
                        id="subscribe_mail"
                        value="Get In Touch"
                        // value={formData.name}
                        onChange={handleChange}
                      />
                      <button type="submit" className="btn btn-link">
                        {loading !== "" && loading ? (
                          <div
                            className="spinner-grow  spinner-grow-sm text-primary"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          <img
                            src="/assets/images/footericons/emailSend.png"
                            className="img-fluid emailImageD"
                            alt=""
                          />
                        )}
                      </button>
                     </div>
                  
                  </a>
                  </div>
                </div>
              </div>

              <div className="col-md-4 ">
                <div className="d-flex justify-content-around align-items-start">
                  <div className="">
                    <div className="product_utilities">
                      <h2 className=" mt-md-0">Products &amp; Utilities</h2>
                      <ul className="list-unstyled mt-4 d-none d-sm-block ">
                        <li className="mt-5">
                          <Link to="https://www.rezor.org/rezorwallet"
                            
                            className="text-decoration-none font-base"
                          >
                            Rezor Wallet
                          </Link>
                        </li>
                        <li className="mt-4">
                          <a href="/swap" className="text-decoration-none">
                            Rezor Swap
                          </a>
                        </li>
                        <li className="mt-4">
                          <a href="#" className="text-decoration-none">
                            Rezor Scan(coming soon)
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="">
                    <div className="Resources">
                      <h2 className="mt-4 mt-md-0">Resources</h2>
                      <ul className="list-unstyled mt-4 d-none d-sm-block">
                        <li className="mt-4">
                          <a href="https://www.rezor.org/getintouch" className="text-decoration-none">
                            Contact
                          </a>
                        </li>
                        <li className="mt-4">
                          <a href="https://drive.google.com/drive/folders/14BgMi3FsZZ27nLyAnZsAc_1A30GYz1xg" className="text-decoration-none">
                            Brand Kit
                          </a>
                        </li>
                        {/* <li className="mt-3">
                          <a href="#" className="text-decoration-none">
                            Presskit
                          </a>
                        </li>
                        <li className="mt-3">
                          <a href="#" className="text-decoration-none">
                            Support
                          </a>
                        </li>
                        <li className="mt-3">
                          <a href="#" className="text-decoration-none">
                            Blog
                          </a>
                        </li>
                        <li className="mt-3">
                          <a href="#" className="text-decoration-none">
                            TechRate Audit
                          </a>
                        </li>
                        <li className="mt-3">
                          <a href="#" className="text-decoration-none">
                            User Agreement
                          </a>
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="forms_text supportDiv">
                  <h3 className="fw-bold font-geist mb-0 ">
                    Don’t like the forms? Drop us a line via email.
                  </h3>

                  <h6 className="fw-semibold font-geist mb-0">
                    <a href="#" className="text-white text-decoration-none">
                      support@rezor.org
                    </a>
                  </h6>
                       

                </div>
              </div>

              <div className="col-md-3 footer_col">
                <div className="keep_in_touch ">
                  <h2 className="mt-4 mt-md-0">Keep in touch with</h2>
                  <div className=" mt-4 gap-4 align-items-center d-none d-sm-flex iconContainer">
                    <a
                      href="https://x.com/rezor_official?s=21&t=Pqj041XnLLBjILHh9nKyzg"
                      className="text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-twitter-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                      </svg>
                    </a>
                    {/* <a href="#" className="text-white"> 
                      <img
                        className="image-fluid"
                        src="/assets/images/footericons/youtube.png"
                        alt="Footer Image"
                        width=""
                      />
                    </a>
                    <a href="#" className="text-white"> 
                      <img
                        className="image-fluid"
                        src="/assets/images/footericons/telegram.png"
                        alt="Footer Image"
                        width=""
                      />
                    </a>
                    <a href="#" className="text-white"> 
                      <img
                        className="image-fluid"
                        src="/assets/images/footericons/instagram.png"
                        alt="Footer Image"
                        width=""
                      />
                    </a>
                  </div>
                  <div className="d-none d-sm-flex mt-4 gap-4 align-items-center">
                    <a href="#" className="text-white"> 
                      <img
                        className="image-fluid"
                        src="/assets/images/footericons/snapchat.png"
                        alt="Footer Image"
                        width=""
                      />
                    </a>
                    <a href="#" className="text-white"> 
                      <img
                        className="image-fluid"
                        src="/assets/images/footericons/reddit.png"
                        alt="Footer Image"
                        width=""
                      />
                    </a>
                    <a href="#" className="text-white"> 
                      <img
                        className="image-fluid"
                        src="/assets/images/footericons/tiktok.png"
                        alt="Footer Image"
                        width=""
                      />
                    </a>
                    <a href="#" className="text-white"> 
                      <img
                        className="image-fluid"
                        src="/assets/images/footericons/discord.png"
                        alt="Footer Image"
                        width=""
                      />
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer_bottom w-100 mx-auto">
            <div className="d-flex  align-items-center justify-content-between mx-auto ">
              <div className="">
                <div className="copyright_content copyright_content-1">
                  <p className="font-geist fw-semibold mb-0">
                    All rights reserved.
                    <span className="px-1">
                      <a href="/privacypolicy" className="text-decoration-none">
                        Privacy Policy.
                      </a>
                    </span>
                    Copyright Rezor
                  </p>
                </div>
              </div>

              {/* <div className="">
                  <div className="footer_logos d-flex gap-2 align-items-center">
                    <img
                      src="/assets/images/footer-logo1.png"
                      className="img-fluid"
                      alt="Footer Logo"
                      width="100px"
                    />
                    <img
                      src="/assets/images/footer-logo2.png"
                      className="img-fluid"
                      alt="Footer Logo"
                      width="100px"
                    />
                  </div>
                </div> */}
              <div
                className=" d-flex justify-content-end"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                style={{ cursor: "pointer" }}
              >
                <div className="back-to-top d-flex justify-content-center align-items-center gap-2">
                  <p className="font-geist fw-semibold mb-0">Back to Top</p>
                  <img
                    src="/assets/images/back-to-top.png"
                    className="img-fluid"
                    width="20px"
                  />
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/*  mobile footer */}

      <div className=" justify-content-center mobile_footer_parent mb-2">
        <footer className="mobile_footer  ">
          <div className="container">
            <h2 className="font-geist fw-semibold margin-top-50 text-white">
              Still have some questions? Feel free to reach out!
            </h2>
            <p
              className="font-geist fw-semibold mt-4 text-white"
              style={{ fontSize: "14px" }}
            >
              Drop an email and get in touch with us for any queries
            </p>
            <div className="d-block  align-items-center   ">
              <a href='https://www.rezor.org/getintouch'>
              <div className="mt-3 emailContainer rounded-pill pe-3">
                <input
                  type="button"
                  className="form-control rounded-pill border-0 font-geist w-100 fs-6"
                  id="subscribe_mail"
                  value="Get In Touch"
                />
                <img src="/assets/images/footericons/emailSend.png" alt="" />
              </div>
              </a>
            </div>
            <div className="forms_text ">
              <h3 className="fw-bold font-geist mb-0 mt-3">
                Don’t like the forms? Drop us a line via email.
              </h3>

              <h6 className="fw-semibold font-geist mb-0">
                <a href="#" className="text-white text-decoration-none">
                  support@rezor.org
                </a>
              </h6>
              
            </div>
            <div className=" mt-5">
              <div className="dropdown">
                <div
                  className="dropdown-custom dropdown-toggle"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#p&u"
                  aria-expanded="false"
                  aria-controls="p&u"
                >
                  <p className="m-0 p-0">Products & Utilities</p>
                  <img
                    src="/assets/images/footericons/footerDropdownIcon.png"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <ul className="collapse" id="p&u">
                  <li>
                    <Link to="https://www.rezor.org/rezorwallet" className="dropdown-item">
                      Rezor Wallet
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                    Rezor Swap (Coming Soon)
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                    Rezor Scan (Coming Soon)
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className=" mt-5">
              <div className="dropdown">
               <div
                 className="dropdown-custom dropdown-toggle"
                 type="button" data-bs-toggle="collapse" data-bs-target="#resources" aria-expanded="false" aria-controls="resources"
                >
                  <p className="m-0 p-0"> Resources</p>
                  <img
                    src="/assets/images/footericons/footerDropdownIcon.png"
                    className="img-fluid"
                    alt=""
                  />
                </div> 

                <ul className="collapse" id="resources">
                  <li>
                    
                    <a className="dropdown-item" href="/getintouch">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="https://drive.google.com/drive/folders/14BgMi3FsZZ27nLyAnZsAc_1A30GYz1xg">
                      Brand Kit
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* <div className=" mt-5 pb-5">
              <div className="dropdown">
                <div
                  className="dropdown-custom dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <p className="m-0 p-0"> Keep in touch with</p>
                  <img
                    src="/assets/images/footericons/footerDropdownIcon.png"
                    className="img-fluid"
                    alt=""
                  /> 
                </div>
                <ul className="dropdown-menu" data-bs-display="static">
                  <li>
                    <a className="dropdown-item" href="#">
                      Product 1
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Product 2
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Product 3
                    </a>
                  </li>
                </ul>
              </div>
            </div> */}
            <div className=" mt-5 pb-5">
              <div className="">
                <div
                  className="dropdown-custom dropdown-toggle"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#ktw"
                  aria-expanded="false"
                  aria-controls="ktw"
                >
                  <p className="m-0 p-0"> Keep in touch with</p>
                  <img
                    src="/assets/images/footericons/footerDropdownIcon.png"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <ul className="collapse social-icon" id="ktw">
                  <li>
                    <a
                      href="https://x.com/rezor_official?s=21&t=Pqj041XnLLBjILHh9nKyzg"
                      className="text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-twitter-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* <div className=" d-flex justify-content-center align-items-center backtotop_m mx-auto">
              <div className="back-to-top d-flex justify-content-center align-items-center gap-2">
                <p className="font-geist fw-semibold mb-0">Back to Top</p>
                <img
                  src="/assets/images/back-to-top.png"
                  className="img-fluid"
                  width="20%"
                />
              </div>
            </div> */}
          <div
            className="d-flex justify-content-center align-items-center backtotop_m mx-auto"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ cursor: "pointer" }}
          >
            <div className="back-to-top d-flex justify-content-center align-items-center gap-2">
              <p className="font-geist fw-semibold mb-0">Back to Top</p>
              <img
                src="/assets/images/back-to-top.png"
                className="img-fluid"
                width="20%"
                alt="Back to Top"
              />
            </div>
          </div>
        </footer>
        <div className="text-center mx-auto gap-3 mt-3 ">
          <div className="">
            <div className="copyright_content copyright_content-1">
              <p className="font-geist fw-semibold mb-0">
                All rights reserved.
                <span className="px-1">
                  <a href="/privacypolicy" className="text-decoration-none">
                    Privacy Policy.
                  </a>
                </span>
                Copyright Rezor 
              </p>
            </div>
          </div>
          {/* <div className=" d-flex justify-content-center mt-4 mb-5">
              <div className="footer_logos d-flex gap-2 align-items-center">
                <img
                  src="/assets/images/footer-logo1.png"
                  className="img-fluid"
                  alt="Footer Logo"
                  width="100px"
                />
                <img
                  src="/assets/images/footer-logo2.png"
                  className="img-fluid"
                  alt="Footer Logo"
                  width="100px"
                />
              </div>
            </div> */}
        </div>
      </div>
    </>
  );
};

export default Footer;
