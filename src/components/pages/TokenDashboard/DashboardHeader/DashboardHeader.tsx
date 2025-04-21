import React from "react";
import { CiStar } from "react-icons/ci";
import { IoShareSocialOutline } from "react-icons/io5";
import { TbStarFilled } from "react-icons/tb";
import "./DashboardHeader.scss";
import { useAppSelector } from "../../../../app/hooks";

interface CoinData {
  tokenName: string;
  tokenSymbol: string;
  totalSupply: number;
  circulatingSupply: number;
  price: number | null;
  circulationMarketCap: number;
  volume24h: number | null;
  logo:string
}

interface DashboardHeaderProps {
  coinData: CoinData | null;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ coinData }) => {
  const { theme } = useAppSelector((state) => state.theme);
  const [favourite, setFavourite] = React.useState(false);

  console.log(coinData, "@@@@@")
  const handleFavourite = () => {
    setFavourite(!favourite);
  };

  return (
    <div className={`dashboard-header-container ${theme === "light" ? "lightTheme" : "darkTheme"}`}>
      <div className="left-section">
        <div className="dashboard-logo-container">
          <img src={coinData?.logo} alt="PEPE" />
          <div className="logo-text">
            <div>{coinData?.tokenSymbol || ""}</div>
            <div className="subtext">{coinData?.tokenName || "N/A"}</div>
          </div>
        </div>
      </div>

      <div className="right-section">
      <div className={`price-container ${theme === "light" ? "lightText" : "darkText"}`}>
          ${coinData?.price?.toFixed(10) || " N/A"}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
