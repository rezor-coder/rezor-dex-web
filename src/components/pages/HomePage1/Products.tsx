import { Container, Row, Col, Button, Card } from "react-bootstrap";
import React, { useRef } from "react";
import Lottie from "lottie-react";
// import glowbg from "../../../assets/animations/glow_bg_hover.json";
import "./HomePage.scss";
import ProductsCards from "./ProductCards/ProductsCards";
import { useAppSelector } from "../../../app/hooks";
import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import glowbgHover from "../../../assets/images/glow_hoverbg.svg";

const Products = () => {
  // const videoRef = useRef<any>(null);
  const { theme } = useAppSelector((state) => state.theme);
  const glowbg =
    "https://rezordex-deepak.s3.us-east-2.amazonaws.com/Videos/2glow_bg_hover.webm";
  const cardVariants: Variants = {
    offscreen: {
      x: 300,
      opacity: 0,
    },
    onscreen: {
      x: 0,
      opacity: 1,
      // rotate: -10,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };
  // const handleMouseEnter = () => {
  //   if (lottieRef.current) {
  //     lottieRef.current.play();
  //   }
  // };

  // const handleMouseLeave = () => {
  //   if (lottieRef.current) {
  //     lottieRef.current.stop();
  //   }
  // };

  // const handleMouseEnter = () => {
  //   videoRef.current.play();
  // };

  // const handleMouseLeave = () => {
  //   videoRef.current.pause();
  //   videoRef.current.currentTime = 0;
  // };

  return (
    <motion.div
      initial={{ opacity: 0, y: 400 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Container className="products-grid">
        {/* <div className="products-title text-center">
          <h2>OUR PRODUCTS</h2>
          <p>
            Uniswap products are powered by the RezorChain Protocol. The
            protocol is the largest onchain marketplace, with billions of
            dollars in weekly.
          </p>
        </div> */}
        <Row className="grid-container">
          <Col xs={12} lg={8} className="grid-item large">
            <motion.div
              className="d-sm-block d-none"
              // initial={{ opacity: 0 }}
              // whileInView={{ opacity: 1 }}
              // viewport={{ once: true }}
              // transition={{
              //   opacity: { duration: 1, delay: 0.5 }, // Adding delay for opacity
              // }}
            >
              <Card
                className="text-white"
                style={{
                  height: "422px",
                  backgroundImage:
                    "linear-gradient(180deg, #141414 0%, #070707 100%)",
                }}
              >
                <div
                  className="network-card"
                  style={{
                    height: "100%",
                    backgroundImage: "url(home/products/card-glow.svg)",
                    // backgroundRepeat: "no-repeat",
                    // backgroundPosition: "top right",
                  }}
                >
                  <div className="content-section">
                    <h2>Explore the RezorSwap Network.</h2>
                    {/* <h3>Explore the Network</h3> */}
                    <p className="description">
                      Dive into the RezorSwap ecosystem and unlock a world of
                      endless trading possibilities.
                    </p>
                    <button className="explore-button">Explore</button>
                  </div>
                  <div
                    className="icons-section"
                    style={
                      {
                        //backgroundImage: " url(RezorSwapBg.png)",
                        //backgroundSize: "cover",
                      }
                    }
                  >
                    <video
                      key={theme}
                      className="background-video"
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source
                        src={
                          theme === "light"
                            ? "https://rezordex-deepak.s3.us-east-2.amazonaws.com/Videos/SW_Coins_White.mp4"
                            : "https://rezordex-deepak.s3.us-east-2.amazonaws.com/Elements/sw-black.mp4"
                        }
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </Card>
            </motion.div>
            <div className="d-sm-none d-block ">
              {/* <Card
              className="text-white"
              style={{
                height: "557px",
                backgroundImage:
                  "linear-gradient(180deg, #141414 0%, #070707 100%)",
              }}
            >
              <div
                className="network-card"
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundImage: "url(home/products/card-glow.svg)",
                }}
              >
                <div className="content-section">
                  <h2>SatiaScan</h2>
                  <h3>Explore the Network</h3>
                  <p className="description">
                    Unlocking products are powered by the RezorChain Protocol.
                    The protocol is the largest on-chain marketplace, with
                    billions of dollars in weekly.
                  </p>
                  <button className="explore-button">Explore</button>
                </div>
                <div className="icons-section">
                  <video
                    className="background-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source
                      style={{ height: "50%" }}
                      src={swbg}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </Card> */}
              <motion.div
                className="satia-scan-card"
                style={{
                  height: "557px",
                  backgroundImage: "url(home/products/card-glow-mobile.svg)",
                }}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="card-content">
                  <h2>Explore the RezorSwap Network.</h2>
                  <p>
                    Dive into the RezorSwap ecosystem and unlock a world of
                    endless trading possibilities.
                  </p>
                  <button className="explore-button"
                  >Explore</button>
                </div>
                <div className="card-icons">
                  <video
                    key={theme}
                    className="background-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source
                      // src={
                      //   theme === "light"
                      //     ? "https://rezordex-deepak.s3.us-east-2.amazonaws.com/Elements/Sw+White.mp4"
                      //     : "https://rezordex-deepak.s3.us-east-2.amazonaws.com/Elements/sw-black.mp4"
                      // }
                      src="https://rezordex-deepak.s3.us-east-2.amazonaws.com/Elements/sw-black.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </motion.div>
            </div>
          </Col>
          <Col xs={12} lg={4} className="grid-item small">
            <ProductsCards
              glowbg={glowbgHover}
              image="home/products/Swap.png"
              title="RezorSwap"
              text="Make quick & easy swaps across SBC, BSC & ETH."
              buttonName=" Swap Now"
              btnPath="/swap"
              style={{ border: "1px solid #252211" }}
            />
          </Col>
          <Col xs={12} md={6} lg={4} className="grid-item small">
            <ProductsCards
              glowbg={glowbgHover}
              image="home/products/CrossChain.png"
              title="Cross-Chain"
              text="Seamlessly swap cryptos across all EVM compatible blockchains."
              buttonName="Cross-Chain Swap"
              btnPath="/cross-chain"
              // style={{ border: "1px solid #0057FF" }}
            />
          </Col>
          <Col xs={12} md={6} lg={4} className="grid-item small">
            <ProductsCards
              glowbg={glowbgHover}
              image="home/products/Farming.png"
              title="Farming"
              text="Boost your earnings with innovative yield farming strategies."
              buttonName="Farm"
              btnPath="/farm"
              style={{ border: "1px solid #3ebd62a4" }}
            />
          </Col>
          <Col xs={12} md={6} lg={4} className="grid-item small">
            <ProductsCards
              glowbg={glowbgHover}
              image="home/products/Staking.png"
              title="Staking"
              text="Secure your assets and earn rewards with ease."
              buttonName="Stake Now"
              btnPath="/staking-pool"
              style={{ border: "1px solid var(#301934, #0057FF)" }}
            />
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default Products;
