import React, { useEffect, useState } from "react";
import "./Statistics.scss";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  CategoryScale,
} from "chart.js";
import { DropDownArrow, RightArrow } from "../../../../assets/icons/svgicons";
import StatisticsCard from "./StatisticsCard";
import ActivityChart from "./ActivityChart";
import maskgroup from "../../../../assets/images/statistics/mask-group.svg";
import CandlestickChart from "../../../common/CandlestickChart/CandlestickChart";
import TradingViewWidget from "../../TokenDashboard/TradingViewWidget/TradingViewWidget";
import StatisticsChart from "./StatisticsChart";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { NetworkTypes } from "../../../../interfaces/common";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  CategoryScale
);

interface CoinData {
  tokenName: string;
  tokenSymbol: string;
  totalSupply: number | any;
  circulatingSupply: number | any;
  price: number;
  circulationMarketCap: number;
}

const Statistics = () => {
  const [viewChart, setViewChart] = useState(false);
  const [viewStatistics, setViewStatistics] = useState(false);
  const [tradingVolume, setTradingVolume] = useState(false);
  const [activity, setActivity] = useState("1D");
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  // const selectedChain: NetworkTypes = useSelector(
  //   (state: any) => state?.user?.chainValues?.symbol
  // );
  const selectedChain: NetworkTypes = useSelector(
    (state: any) => {
      const symbol = state?.user?.chainValues?.symbol;
      return symbol === 'STC' ? 'SBC' : symbol;
    }
  );
  console.log(selectedChain)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/v1/coin/info?chain=${selectedChain}&symbol=stc`
        );
        const result = await response.json();
        if (result.status === 200 && !result.error) {
          setCoinData(result.data);
        } else {
          console.error("Error fetching data:", result.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);
  const data = {
    labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"],
    datasets: [
      {
        label: "Activity",
        data: [0, 1, 0.5, 3.5, 2, 1, 2.5],
        fill: false,
        borderColor: "#007AFF", // Line color
        tension: 0.4, // Smooth line
        pointRadius: 3, // No points
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#737373",
        },
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#1f2937", // Tooltip background color
        titleColor: "#fff", // Tooltip title color
        bodyColor: "#fff", // Tooltip body color
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
    },
  };

  const handleViewChart = () => {
    setViewChart(!viewChart);
  };
  const handleStatistics = () => {
    setViewStatistics(!viewStatistics);
  };
  const handleVolumeDropDown = () => {
    setTradingVolume(!tradingVolume);
  };
  const handleVolume = (value: string) => {
    setActivity(value);
    setTradingVolume(!tradingVolume);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        opacity: { duration: 1, delay: 0.5 }, // Adding delay for opacity
      }}
    >
      <div className="products-title text-center">
        <h2>Statistics & Overview</h2>
        <p>
          RezorChain products are powered by the RezorChain Protocol. The
          protocol is the largest OnChain marketplace, with billions of dollars
          in weekly.
        </p>
      </div>
      <div className="d-none d-md-block">
        <div className="statistics-overview">
          <motion.div
            className="statistics-card"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              backgroundImage: " url(home/products/card-glow.svg)",
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
          >
            <div className="card-header">
              <h2>Statistics</h2>
              <div className="export-button">
                <Link to="/trade">
                  <p>Explore</p>
                </Link>
              </div>
            </div>
            <p className="description">
              Dive into the stats that showcase the strength and scale of the
              RezorSwap ecosystem. Check out our latest figures and see for
              yourself how transparency and performance define our platform.
            </p>
            <div className="stats-grid">
              <div className="stats-item">
                <div className="top-section">
                  <p className="stats-value">
                    {coinData?.price
                      ? `$ ${coinData?.price.toFixed(4)}`
                      : "N/A"}
                  </p>
                  <RightArrow />
                </div>
                <p className="stats-label">Price</p>
              </div>
              <div className="stats-item">
                <div className="top-section">
                  <p className="stats-value">
                    {/* {coinData?.circulationMarketCap
                      ? ` $ ${coinData.circulationMarketCap.toFixed(2)}`
                      : "N/A"} */}
                    ${" "}
                    {coinData && coinData.circulationMarketCap
                      ? `${(
                          coinData.circulationMarketCap / 1_000_000_000
                        ).toFixed(2)}B`
                      : "N/A"}
                  </p>

                  <RightArrow />
                </div>
                <p className="stats-label">Market cap</p>
              </div>
              <div className="stats-item">
                <div className="top-section">
                  {coinData?.totalSupply ? (
                    <p className="stats-value">
                      {(coinData.totalSupply / 1_000_000_000).toFixed(2)}B
                    </p>
                  ) : (
                    <p>N/A</p>
                  )}
                  <RightArrow />
                </div>
                <p className="stats-label">Total Supply</p>
              </div>
              <div className="stats-item">
                <div className="top-section">
                  {coinData?.circulatingSupply ? (
                    <p className="stats-value">
                      {(coinData.circulatingSupply / 1_000_000_000).toFixed(2)}B
                    </p>
                  ) : (
                    <p>N/A</p>
                  )}
                  <RightArrow />
                </div>
                <p className="stats-label">Circulating Supply</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="trading-volume-section"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              backgroundImage: " url(home/products/card-glow.svg)",
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
          >
            <div className="trading-volume-header">
              <h2>Trading Volume</h2>
              <div className="buy-button">
             <Link to="/swap">
             <p>Buy STC</p>
             </Link>
              </div>
            </div>
            <div className="trading-chart">
              <div className="trading-chart-header">
                <p className="title">Activity</p>
                <div className="drop-down-nav-item">
                  <div
                    onClick={handleVolumeDropDown}
                    className="chart-dropdown"
                  >
                    <p>Volume {activity}</p>
                    <DropDownArrow />
                  </div>
                  {tradingVolume && (
                    <div className="drop-down">
                      <p>
                        <div
                          className="value"
                          onClick={() => handleVolume("1M")}
                        >
                          1M
                        </div>
                      </p>
                      <p>
                        <div
                          className="value"
                          onClick={() => handleVolume("7D")}
                        >
                          7D
                        </div>
                      </p>
                      <p>
                        <div
                          className="value"
                          onClick={() => handleVolume("1D")}
                        >
                          1D
                        </div>
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {/* <Line data={data} options={options} /> */}
              {/* <div style={{ position: "relative" }}> */}
              {/* <CandlestickChart /> */}
              {/* <TradingViewWidget/> */}
              <StatisticsChart activity={activity} />
              {/* </div> */}
            </div>
          </motion.div>
        </div>
      </div>
      <div className="d-block d-md-none">
        <div className="statistics-min-overview">
          <div
            className="statistics-min-card"
            style={{
              height: "100%",
              backgroundImage: "url(home/statistics/mask-group-mobile.svg)",
            }}
          >
            <h2>Statistics</h2>
            <p>
              Dive into the stats that showcase the strength and scale of the
              RezorSwap ecosystem. Check out our latest figures and see for
              yourself how transparency and performance define our platform.
            </p>
            <div className="buttons">
              <div className="explore-button">
                <Link to="/trade">
                  <div>Explore</div>
                </Link>
              </div>
              <button className="view-button" onClick={handleStatistics}>
                View
              </button>
            </div>
            {/* <StatisticsCard /> */}
            {viewStatistics && (
              <div className="statistics-card-container">
                <StatisticsCard
                  Title="Price"
                  Value={`$ ${coinData?.price.toFixed(4)}`}
                />
                <StatisticsCard
                  Title="Market cap"
                  Value={` $ ${coinData?.circulationMarketCap.toFixed(2)}`}
                />
                <StatisticsCard
                  Title="Total Supply"
                  Value={`${(coinData?.totalSupply / 1_000_000_000).toFixed(
                    2
                  )}B`}
                />
                <StatisticsCard
                  Title="Circulating Supply"
                  Value={`${(
                    coinData?.circulatingSupply / 1_000_000_000
                  ).toFixed(2)}B`}
                />
              </div>
            )}
          </div>
          <div
            className="statistics-min-card"
            style={{
              // height: "100%",
              backgroundImage: "url(home/statistics/mask-group-mobile.svg)",
            }}
          >
            <h2>Trading Volume</h2>
            <div className="buttons">
              <button className="explore-button">Buy STC</button>
              <button className="view-button" onClick={handleViewChart}>
                View Chart
              </button>
            </div>
            {viewChart && (
              <div className="activity-chart-container">
                <div className="chart-header">
                  <p className="title">Activity</p>
                  <div className="drop-down-nav-item">
                    <div
                      onClick={handleVolumeDropDown}
                      className="chart-dropdown"
                    >
                      <span className="dropdown-default-option">
                      Volume {activity}
                      </span>
                      <DropDownArrow />
                    </div>
                    {tradingVolume && (
                      <div className="drop-down">
                        <p>
                          <div
                            className="value"
                            onClick={() => handleVolume("1M")}
                          >
                            1M
                          </div>
                        </p>
                        <p>
                          <div
                            className="value"
                            onClick={() => handleVolume("7D")}
                          >
                            7D
                          </div>
                        </p>
                        <p>
                          <div
                            className="value"
                            onClick={() => handleVolume("1D")}
                          >
                            1D
                          </div>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                {/* <ActivityChart /> */}
                {/* <CandlestickChart /> */}
                {/* <StatisticsChart /> */}
                <div style={{ height: "300px" }}>
                  <StatisticsChart activity={activity} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Statistics;
