import React, { useEffect, useState } from "react";
import "./TokenDashboard.scss";
import DashboardHeader from "./DashboardHeader/DashboardHeader";
import PoolCard from "./PoolCard/PoolCard";
import TradingViewWidget from "./TradingViewWidget/TradingViewWidget";
import { Link, useParams } from "react-router-dom";
import HistorySection from "./TradeHistoryDetails/TradeHistory";
import TradeHistorySection from "./TradeHistoryDetails/TradeHistory";
import { MdOutlineSearch } from "react-icons/md";
import CoinInfoSearch from "./CoinInfoDashboard/CoinInfoSearch";
import { useAppSelector } from "../../../app/hooks";
import { useSelector } from "react-redux";
import { NetworkTypes } from "../../../interfaces/common";
import Header from "../../common/Header/Header";

interface CoinData {
  tokenName: string;
  tokenSymbol: string;
  totalSupply: number;
  circulatingSupply: number;
  price: number | null;
  circulationMarketCap: number;
  volume24h: number | null;
  logo: string;
  marketCap: number | null
}

interface tokenParams extends Record<string, string | undefined> {
  symbol: string;
}

interface CoinData2 {
  volume24hr: number | null;
}
const TokenDashboard: React.FC = () => {
  const { symbol } = useParams<tokenParams>();
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [coinData2, setCoinData2] = useState<CoinData2 | null>(null);
  const { theme } = useAppSelector((state) => state.theme);
  // const selectedChain: NetworkTypes = useSelector(
  //   (state: any) => state?.user?.chainValues?.symbol
  // );
  const selectedChain: NetworkTypes = useSelector((state: any) => {
    const symbol = state?.user?.chainValues?.symbol;
    return symbol === "STC" ? "SBC" : symbol;
  });

  console.log(selectedChain, "chain");

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/v1/coin/info?chain=${selectedChain}&symbol=${symbol}`
        );
        const result = await response.json();
        if (result.status === 200) {
          setCoinData(result.data);
        } else {
          console.log("Failed to fetch data:", result.message);
          setCoinData(null);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
        setCoinData(null);
      }
    };

    fetchCoinData();
  }, [symbol, selectedChain]);

  useEffect(() => {
    const fetchCoinData2 = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/v1/coin/history?chain=SBC&symbol=${symbol}`
        );
        const result = await response.json();
        if (result.status === 200) {
          setCoinData2(result.data);
        } else {
          console.log("Failed to fetch data:", result.message);
          setCoinData2(null);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
        setCoinData2(null);
      }
    };

    fetchCoinData2();
  }, [symbol, selectedChain]);

  const [showToken, setShowToken] = useState(false);

  // console.log(showToken, "showToken");

  return (
    <div className="app-container">
      <div className={`searchinput ${theme === "light" ? "light" : "dark"}`}>
        <form className="form-search" onClick={() => setShowToken(true)}>
          <div
            className={`search-button ${
              theme === "light" ? "lightButton" : "darkButton"
            }`}
          >
            <MdOutlineSearch
              color={theme === "light" ? "#000" : "#818EA3"}
              fontSize={25}
              className="submit-icon"
            />
          </div>
          <input
            type="search"
            placeholder="Search pair by symbol or token"
            className={`caret-large-input ${
              theme === "light" ? "light" : "dark"
            }`}
            readOnly
          />
        </form>
        <CoinInfoSearch showToken={showToken} setShowToken={setShowToken} />
      </div>
      <div className="main-content ">
        <div className="dashboard-sidebar">
          <Link to="/swap" className="header-title">
            <p style={{ color: theme === "light" ? "white" : "dark" }}>
              RezorSwap
            </p>
          </Link>
          <PoolCard coinData={coinData} coinData2={coinData2} />
        </div>
        <div
          className={`main-section ${
            theme === "light" ? "lightSection" : "darkSection"
          }`}
        >
          <DashboardHeader coinData={coinData} />
          <div
            className={`chart-container ${
              theme === "light" ? "lightChart" : "darkChart"
            }`}
          >
            <TradingViewWidget
              showToken={showToken}
              setShowToken={setShowToken}
            />
          </div>
        </div>
      </div>

      {/* <TradeHistorySection/> */}
    </div>
  );
};

export default TokenDashboard;
