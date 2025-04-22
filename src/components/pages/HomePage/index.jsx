import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import TradingVolumeChart from "./components/tradingvolumechart";
import RezorSwapNavBar from "./components/RezorSwapNavBar";






const RezorSwap = () => {

  useEffect(() => { 
    const script = document.createElement("script");
    script.src = "/assets/js/bootstrap/bootstrap.bundle.min.js";
    script.async = true;
    // script.onload = () => this.scriptLoaded();
  
    document.body.appendChild(script);

  }, []);
  const data = [
    {
      id: 1,
      name: "BTC",
      fullName: "Bitcoin",
      img: "btc.png",
      change: +0.3,
      icon: "up.png",
    },
    {
      id: 2,
      name: "ETH",
      fullName: "Ethereum",
      img: "eth.png",
      change: -0.45,
      icon: "down.png",
    },
    {
      id: 3,
      name: "BTC",
      fullName: "Bitcoin",
      img: "btc.png",
      change: +0.3,
      icon: "up.png",
    },
    {
      id: 4,
      name: "USDT",
      fullName: "Tether",
      img: "tether.png",
      change: +0.23,
      icon: "up.png",
    },
    {
      id: 5,
      name: "ETH",
      fullName: "Ethereum",
      img: "eth.png",
      change: -0.45,
      icon: "down.png",
    },
    {
      id: 6,
      name: "DOGE",
      fullName: "Doge Coin",
      img: "doge.png",
      change: -1.45,
      icon: "down.png",
    },
    {
      id: 7,
      name: "BTC",
      fullName: "Bitcoin",
      img: "btc.png",
      change: +0.3,
      icon: "up.png",
    },
    {
      id: 8,
      name: "USDT",
      fullName: "Tether",
      img: "tether.png",
      change: +0.23,
      icon: "up.png",
    },
    {
      id: 9,
      name: "ETH",
      fullName: "Ethereum",
      img: "eth.png",
      change: -0.45,
      icon: "down.png",
    },
    {
      id: 10,
      name: "DOGE",
      fullName: "Doge Coin",
      img: "doge.png",
      change: -1.45,
      icon: "down.png",
    },
    
  ];
  return (
    <>
      <div className="rezorSwap-wrapper">
        <div className="rezorswap-bg">
          <div className="">
            {/* <NavBar /> */}
            <RezorSwapNavBar />
          </div>
          {/* first section */}
          <div className="swap-container container position-relative">
            <div className="row">
              <div className="col-xl-7">
                <div className="rezorswap_heading">
                  <h1 className="primary-font rezorswap_heading_h1 fw-semibold">
                    Swap, Stake & <br />
                    Conquer the Chains.
                  </h1>
                  <p className="primary-font mt-4 rezorswap_p text-center text-lg-start">
                    Connect your wallet now to unlock seamless swaps,
                    <br /> secure staking, and unparalleled financial
                    empowerment
                    <br /> across multiple blockchains.
                  </p>
                  <a
                    href="/swap"
                    className="swapnow_button fw-bold primary-font d-flex align-items-center justify-content-center px-4 py-4 gap-5 mx-auto mx-lg-0 mt-4 position-relative z-index-3"
                  >
                    Swap Now
                    <img
                      src="./assets/images/rezorSwapImages/bitcoin-convert.png"
                      className="img-fluid"
                      alt="arrow-down"
                    />{" "}
                  </a>
                </div>
              </div>
              <div className="col-xl-5">
                <div className="rezorswap_bg_img position-absolute">
                  <img
                    src="assets/images/rezorSwapImages/first-section/rezorswap-bg.png"
                    className=""
                    alt="rezorswap"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COINS SECTION */}
        <div className="mt-lg-3 mt-5 d-flex align-items-center gap-4 mx-2 coinsContainer justify-content-center">
          <div className="coinsWrapper">
            {data.map((coin) => (
              <div
                key={coin.id}
                className="d-flex justify-content-between align-items-center coin-div"
              >
                <div className="d-flex gap-2 align-items-center">
                  <img
                    src={`/assets/images/coins/${coin.img}`}
                    alt={coin.name}
                  />
                  <div>
                    <h6
                      className="m-0 p-0 primary-font"
                      style={{ fontSize: "14px" }}
                    >
                      {coin.name}
                    </h6>
                    <p
                      className="m-0 p-0 primary-font"
                      style={{ fontSize: "10px" }}
                    >
                      {coin.fullName}
                    </p>
                  </div>
                </div>
                <div
                  className={`d-flex align-items-center gap-2 primary-font ${
                    coin.change >= 0 ? "profitColor" : "lossColor"
                  }`}
                >
                  <span>
                    {coin.change > 0 ? `+${coin.change}%` : `${coin.change}%`}
                  </span>
                  <img
                    src={`/assets/images/coins/${coin.icon}`}
                    alt="change-icon"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* second section */}
        <div className="padding-left-div">
          <div className="swap-container container">
            <div className="trusted-by-million">
              <div className="row  flex-column-reverse flex-lg-row">
                <div className="col-lg-5">
                  <div className="all-times-div">
                    <div className="all-time-value position-relative">
                      <div className="heading-all-time">
                        <p className="primary-font fw-semibold">
                          All Time <br /> Volume
                        </p>
                      </div>
                      <div className="heading-all-time-bitcoin">
                        <div className="all-value-img">
                          <img
                            src="assets/images/rezorSwapImages/second-section/all-value-wave.png"
                            className="img-fluid w-100"
                          />
                        </div>
                        <h1 className="primary-font">$1.2B</h1>
                      </div>
                    </div>
                    <div className="row all_time_row">
                      <div className="col-6 mt-3 ps-0 pe-1 ps-lg-2">
                        <div className="all-time-swappers position-relative">
                          <div className="heading-all-time-swappers">
                            <p className="primary-font fw-semibold">
                              All time <br />
                              Swappers
                            </p>
                          </div>
                          <div className="heading-all-time-swappers-new">
                            <h1 className="primary-font">2M+</h1>
                          </div>
                        </div>
                      </div>
                      <div className="col-6 mt-3 pe-0 ps-1 pe-lg-2">
                        <div className="all-time-swappers position-relative">
                          <div className="heading-all-time-swappers">
                            <p className="primary-font fw-semibold">
                              24H <br />
                              Volume
                            </p>
                          </div>
                          <div className="heading-all-time-swappers-new">
                            <h1 className="primary-font">$0.1M</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7 position-relative">
                  <div className="statisticks_div_black trustedMillionDark">
                    <div className="trusted_million_img">
                      {/* <img
                      src="assets/images/rezorSwapImages/second-section/trusted_million_div.png"
                      className="w-100"
                    /> */}
                      {/* </div> */}
                      <div className="heading_million_div">
                        <div className="col-xl-8 col-xxl-6 col-lg-8 col-md-8 col-sm-9">
                          <h1 className="fw-semibold primary-font">
                            Trusted by
                            <br />
                            <span>millions</span>
                          </h1>
                          <p className="primary-font">
                            With hundreds of tokens across Rezor, BNB, ETH and
                            10+ EVM compatible chains, RezorSwap products are
                            the go-to choice for secure and seamless trading.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* third section */}
          <div className="swap-container container">
            <div className="our-products">
              <div className="col-12 text-center">
                <div className="heading-products">
                  <h2 className="primary-font our_products_heading_h2 fw-semibold">
                    Our Products
                  </h2>
                  <p className="primary-font our_products_paragraph_p">
                    RezorSwap products are powered by the Rezor Ecosystem— a
                    powerhouse in
                    <br /> Web3, driving innovation with a next-gen suite of
                    utilities.
                  </p>
                </div>
              </div>
              <div className="row saitascan_row mx-lg-auto">
                <div className="col-lg-5 col-xl-6">
                  <div className="saitascan_bg position-relative">
                    <div className="col-lg-12 col-xl-9 ">
                      <div className="heading_saitascan">
                        <h2 className="primary-font fw-bold heading_saitascan_h2">
                          RezorScan
                          <br /> Explore the Network
                        </h2>
                        <p className="primary-font mt-3 paragraph_p">
                          Dive into the RezorSwap ecosystem and
                          <br /> unlock a world of endless trading <br />{" "}
                          possibilities.
                        </p>
                        <button className="darkButton explore_btn rounded-2 primary-font mt-4">
                          Coming Soon
                        </button>
                      </div>
                    </div>

                    <div className="saitascan_bg_globe position-absolute">
                      <img src="assets/images/rezorSwapImages/third-section/saitascan.png" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-7 col-xl-6">
                  <div className="row">
                    <div className="col-lg-6 mt-lg-0 mt-4 mt-sm-2 col-sm-6 pe-sm-1">
                      <div className="rezor_swap_div">
                        <div className="rezor_swap_img text-center">
                          <img src="assets/images/rezorSwapImages/third-section/rezor_swap_img.svg" />
                        </div>
                        <div className="rezor_swap_heading text-center">
                          <h4 className="primary-font fw-bold mt-3">
                            RezorSwap
                          </h4>
                          <p className="primary-font paragraph_p">
                            Quick & easy swaps across
                            <br /> BSC & ETH.
                          </p>
                          <a  href="/swap" className="darkButton explore_btn rounded-2 primary-font mt-5">
                            Swap Now
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 mt-lg-0 mt-4 mt-sm-2 col-sm-6 ps-sm-1">
                      <div className="rezor_swap_div">
                        <div className="rezor_swap_img text-center">
                          <img src="assets/images/rezorSwapImages/third-section/CrossChain_div_img.svg" />
                        </div>
                        <div className="rezor_swap_heading text-center">
                          <h4 className="primary-font fw-bold">Cross-Chain</h4>
                          <p className="primary-font paragraph_p">
                            Seamless crypto swaps across
                            <br /> EVM compatible blockchains.
                          </p>
                          <button className="darkButton explore_btn rounded-2 primary-font mt-4">
                            Cross-Chain Swap
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 mt-sm-2 mt-xl-3 mt-4 col-sm-6 pe-sm-1">
                      <div className="rezor_swap_div">
                        <div className="rezor_swap_img text-center">
                          <img src="assets/images/rezorSwapImages/third-section/Farming_div_img.svg" />
                        </div>
                        <div className="rezor_swap_heading text-center">
                          <h4 className="primary-font fw-bold mt-3">Farming</h4>
                          <p className="primary-font paragraph_p">
                            Amplify your earnings with <br />
                            innovative yield strategies.
                          </p>
                          <button className="darkButton explore_btn rounded-2 primary-font mt-5">
                            Farm
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 mt-sm-2 mt-xl-3 ps-sm-1 mt-4 col-sm-6">
                      <div className="rezor_swap_div">
                        <div className="rezor_swap_img text-center">
                          <img src="assets/images/rezorSwapImages/third-section/Staking_div_img.svg" />
                        </div>
                        <div className="rezor_swap_heading text-center">
                          <h4 className="primary-font fw-bold mt-3">Staking</h4>
                          <p className="primary-font paragraph_p">
                            Secure your assets and earn
                            <br /> rewards with ease.
                          </p>
                          <button className="darkButton explore_btn rounded-2 primary-font mt-5">
                            Stake Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* fourth section */}
          <div className="swap-container container">
            <div className="statistics_overview">
              <div className="row mx-lg-auto">
                <div className="col-lg-6">
                  <div className="statistics_heading text-center text-lg-start">
                    <h2 className="primary-font overview_h2 fw-semibold">
                      Statistics & Overview
                    </h2>
                    <p className="primary-font overview_p fw-medium">
                      Numbers don’t lie—witness the strength and scale of the
                      RezorSwap ecosystem. Explore
                      <br /> real-time stats that showcase our scale, strength,
                      and unwavering transparency.
                    </p>
                    <div className="trading_view">
                      <TradingVolumeChart />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 position-relative">
                  <div className="statisticks_div_black">
                    <div className="statistics_div_img">
                      <div className="col-lg-9">
                        <div className="heading_statisticks_image">
                          <h2 className="primary-font heading_statistics_h2 fw-bold">
                            Statistics
                          </h2>
                          <p className="fw-semibold text-white primary-font">Coming Soon</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-5 col-sm-6 mt-5">
                          <h4 className="primary-font fw-bold h4_heading_statistics">
                            00000000
                          </h4>
                          <div className="d-flex align-items-center flex_statistics">
                            <p className="primary-font mb-0 p_para_statistics">
                              TVL
                            </p>
                            <img src="assets/images/rezorSwapImages/fourth-section/arrow-right.png" />
                          </div>
                        </div>
                        <div className="col-lg-5 col-sm-6 mt-5">
                          <h4 className="primary-font fw-bold h4_heading_statistics">
                            $ 00000000
                          </h4>
                          <div className="d-flex align-items-center flex_statistics">
                            <p className="primary-font mb-0 p_para_statistics">
                              Market cap
                            </p>
                            <img src="assets/images/rezorSwapImages/fourth-section/arrow-right.png" />
                          </div>
                        </div>
                        <div className="col-lg-5 col-sm-6 mt-5">
                          <h4 className="primary-font fw-bold h4_heading_statistics">
                            00000000
                          </h4>
                          <div className="d-flex align-items-center flex_statistics">
                            <p className="primary-font mb-0 p_para_statistics">
                              FDV
                            </p>
                            <img src="assets/images/rezorSwapImages/fourth-section/arrow-right.png" />
                          </div>
                        </div>
                        <div className="col-lg-5 col-sm-6 mt-5">
                          <h4 className="primary-font fw-bold h4_heading_statistics">
                            00000000
                          </h4>
                          <div className="d-flex align-items-center flex_statistics">
                            <p className="primary-font mb-0 p_para_statistics">
                              1 day volume
                            </p>
                            <img src="assets/images/rezorSwapImages/fourth-section/arrow-right.png" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* fifth section */}
        <div className="community_div">
          <div className="swap-container container">
            <div className="empowered_community">
              <div className="row align-items-center flex-column-reverse flex-lg-row">
                <div className="col-lg-6">
                  <div className="community_heading_div text-center text-lg-start">
                    <h1 className="h1_heading_community primary-font">
                      Empowered by
                      <br /> Community
                    </h1>
                    <p className="primary-font p_para_community mt-4 mb-0">
                      At RezorSwap, our community isn’t just a part of the
                      journey—it’s
                      <br /> the driving force. Your engagement powers our
                      growth, innovation, and the
                      <br /> future of seamless crypto trading. Join us & help
                      shape the future!
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="community_image_div text-center">
                    <img src="assets/images/rezorSwapImages/fifth-section/Community_img.svg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default RezorSwap;
