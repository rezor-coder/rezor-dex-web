import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";
import { Accordion, Col, Row } from "react-bootstrap";
import { useAppSelector } from "../../../app/hooks";
import lightLogo from "../../../assets/logo/light-logo.svg";
import logo from "../../../assets/logo/logo.svg";
import smallLogo from "../../../assets/logo/small-logo.svg";
import {
  ArrowdownFilledIcon,
  Facebook,
  Instagram,
  Linkedin,
  Telegram,
  Twitter,
} from "../../../assets/icons/svgicons";
import { motion } from "framer-motion";

const Footer = () => {
  const { theme } = useAppSelector((state) => state.theme);
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        opacity: { duration: 1, delay: 0.5 }, // Adding delay for opacity
      }}
    >
      <div className="d-none d-md-block">
        <div className="footer-container">
          <div className="footer-section logo-section">
            <div className="logo">
              {/* <img height={"30px"} src="/logo.png" alt="Logo" /> */}
              <img
                height={"30px"}
                className="d-sm-block d-none"
                src={theme === "light" ? lightLogo : logo}
                alt="logo"
              />
              <img
                height={"30px"}
                src={smallLogo}
                alt="logo"
                className="d-sm-none"
              />
              {/* <span className="header__logo-text">RezorSwap</span> */}
            </div>
            <p>
              Products are powered by the RezorPro Protocol. The protocol is the
              largest on-chain marketplace, with billions of dollars in trading.
            </p>
          </div>
          <div className="footer-section">
            <h4>Products</h4>
            <ul>
              <li>
                <Link to="/swap">RezorSwap</Link>
              </li>
              <li>
                <Link to="#">Track</Link>
              </li>
              <li>
                <Link to="/staking-pool">Staking Pool</Link>
              </li>
              <li>
                <Link to="/cross-chain">Cross Chain</Link>
              </li>
              <li>
                <Link to="#">Farming</Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li>
                <Link target="_blank" to="https://rezorchain.com">
                  RezorChain
                </Link>
              </li>
              {/* <li>
                <Link to="#">RezorSafe</Link>
              </li> */}
              <li>
                <Link
                  target="_blank"
                  to="https://play.google.com/store/apps/details?id=com.rezorpro&hl=en_IN&pli=1"
                >
                  RezorPro
                </Link>
              </li>
              <li>
                <Link target="_blank" to="https://xbridge.tech/">
                  XBridge
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Others</h4>
            <ul>
              <li>
                <Link to="#">About</Link>
              </li>
              <li>
                <Link to="#">FAQ</Link>
              </li>
              <li>
                <Link to="#">Privacy Policy</Link>
              </li>
              <li>
                <Link to="#">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Keep in touch</h4>
            <p>Email</p>
            <p>Info@rezorchain.com</p>
            <div className="social-icons">
              <div className="icon">
                <a
                  href="https://x.com/RezorChainCoin?t=a3CEIVO0BUl093GQo6Lqjw&s=08"
                  target="_blank" // Opens the link in a new tab
                  rel="noopener noreferrer" // Security reasons
                >
                  <Twitter />
                </a>
              </div>
              <div className="icon">
                <a
                  href="https://t.me/RezormaWorldwide"
                  target="_blank" // Opens the link in a new tab
                  rel="noopener noreferrer" // Security reasons
                >
                  <Telegram />
                </a>
              </div>
              <div className="icon">
                <a
                  href="https://www.linkedin.com/company/rezorchain/"
                  target="_blank" // Opens the link in a new tab
                  rel="noopener noreferrer" // Security reasons
                >
                  <Linkedin />
                </a>
              </div>
              <div className="icon">
                <a
                  href="https://www.instagram.com/rezorchaincoin/"
                  target="_blank" // Opens the link in a new tab
                  rel="noopener noreferrer" // Security reasons
                >
                  <Instagram />
                </a>
              </div>
              <div className="icon">
                <a
                  href="https://www.facebook.com/groups/wearerezorma/?ref=share&mibextid=NSMWBT"
                  target="_blank" // Opens the link in a new tab
                  rel="noopener noreferrer" // Security reasons
                >
                  <Facebook />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-block d-md-none">
        <footer className="sm-footer">
          <div className="footer-logo">
            {/* <img src="/path-to-your-logo.png" alt="RezorSwap Logo" /> */}
            <img
              height={"30px"}
              src={theme === "light" ? lightLogo : logo}
              alt="logo"
            />
            <p>
              Products are powered by the RezorChain Protocol. The protocol is
              the largest onchain marketplace, with billions of dollars in
              weekly.
            </p>
          </div>
          <section className="liquidityPage">
            <Row>
              <Col lg={6}>
                <div className="liquidityAdd_faq">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <span> Products</span> <ArrowdownFilledIcon />
                      </Accordion.Header>
                      <Accordion.Body>
                        <Link to="/swap">
                          <p>RezorSwap</p>
                        </Link>
                        <p>Trade</p>
                        <Link to="/staking-pool">
                          <p>Staking Pool</p>
                        </Link>
                        <p>Cross Chain</p>
                        <p>Farming</p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        <span>Company</span> <ArrowdownFilledIcon />
                      </Accordion.Header>
                      <Accordion.Body>
                        <Link target="_blank" to="https://rezorchain.com">
                          <p>RezorChain</p>
                        </Link>
                        <p>
                          <Link
                            target="_blank"
                            to="https://play.google.com/store/apps/details?id=com.rezorpro&hl=en_IN&pli=1"
                          >
                            <p>RezorPro</p>
                          </Link>
                        </p>
                        <p>RezorCard</p>
                        <p>
                          <Link target="_blank" to="https://xbridge.tech/">
                            <p>XBridge</p>
                          </Link>
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        <span>Others</span> <ArrowdownFilledIcon />
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>About</p>
                        <p>FAQs</p>
                        <p>Privacy Policy</p>
                        <p>Terms & Conditions</p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </Col>
            </Row>
          </section>

          <div className="footer-contact">
            <h4>Keep in touch</h4>
            <p>Email</p>
            <p>Info@rezorchain.com</p>
          </div>
        </footer>
      </div>
      <div className="footer-bottom">
        <p>All rights reserved. Copyright by RezorChain</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
