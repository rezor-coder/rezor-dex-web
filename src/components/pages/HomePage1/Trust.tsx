import React from "react";
import Lottie from "lottie-react";
import glowbg from "../../../assets/animations/glow_bg.json";
import { useAppSelector } from "../../../app/hooks";
import wave from "../../../assets/images/trust/wave.svg";
import lightWave from "../../../assets/images/trust/light_wave.svg";
import { motion } from "framer-motion";
import glowSvg from "../../../assets/images/glow_bg.svg";

const Trust = () => {
  const { theme } = useAppSelector((state) => state.theme);
  return (
    <div className="container">
      <div className="trust-section">
        <motion.div
          className="content"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="title">
            Trusted by Millions.{" "}
            <p className="sub-title">Powered by RezorChain.</p>
          </p>
          <p className="details">
            Uniswap products are powered by the RezorChain Protocol. The
            protocol is the largest onchain marketplace, with billions of
            dollars in weekly volume across thousands of tokens on Ethereum and
            7+ additional chains.
          </p>
        </motion.div>
        <div className="main-cards">
          <motion.div
            className="cards"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* <div className="glow-bg">
            <Lottie animationData={glowbg} loop={true} />
          </div> */}
            {/* <video autoPlay loop muted>
            <source
              src="https://rezordex-deepak.s3.us-east-2.amazonaws.com/Videos/2glow_bg.webm"
              type="video/webm"
            />
            Your browser does not support the video tag.
          </video> */}
            <div
              className="parent-allTimeVolumeCard"
              // style={{
              //   borderRadius: "20px",
              //   background: "linear-gradient(180deg, #141414 0%, #070707 100%)",
              // }}
            >
              <div
                className="allTimeVolumeCard"
                style={{
                  backgroundImage:
                    theme === "light"
                      ? "url(home/trust/light_wave.svg)"
                      : "url(home/trust/wave.svg)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "bottom",
                }}
              >
                <p className="title">All time Volume</p>
                <h1 className="value">$1.2B</h1>
              </div>
            </div>
            <div className="sub-cards">
              <div
                className="volumeCard"
                style={{
                  border: "1px solid #0057FF",
                }}
              >
                <p className="title">All Time Swappers</p>
                <h1 className="value" style={{ color: "#0057FF" }}>
                  $1.2B
                </h1>
              </div>
              <div
                className="volumeCard"
                style={{
                  border: "1px solid #3EBD61",
                }}
              >
                <p className="title">24H Volume</p>
                <h1 className="value" style={{ color: "#3EBD61" }}>
                  $1.2B
                </h1>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Trust;
