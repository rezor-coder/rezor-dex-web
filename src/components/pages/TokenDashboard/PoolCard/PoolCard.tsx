
import React from "react";
import "./PoolCard.scss";
import { useAppSelector } from "../../../../app/hooks";

interface CoinData {
  tokenName: string | null;
  tokenSymbol: string | null;
  totalSupply: number | null;
  circulatingSupply: number | null;
  price: number | null;
  circulationMarketCap: number | null;
  volume24h: number | null;
  marketCap: number | null
}

interface CoinData2 {
  volume24hr: number | null;
}

interface PoolCardProps {
  coinData: CoinData | null;
  coinData2: CoinData2 | null;
}

const PoolCard: React.FC<PoolCardProps> = ({ coinData, coinData2 }) => {
  const { theme } = useAppSelector((state) => state.theme);

  // console.log("coinData volume24h:", coinData?.volume24h);
  // console.log("coinData2 volume24hr:", coinData2?.volume24hr);


  const formatVolume = (volume: number): string => {
    if (volume >= 1e12) {
      return (volume / 1e12).toFixed(2) + 'T';
    } else if (volume >= 1e9) {
      return (volume / 1e9).toFixed(2) + "B";
    } else if (volume >= 1e6) {
      return (volume / 1e6).toFixed(2) + "M";
    } else if (volume >= 1e3) {
      return (volume / 1e3).toFixed(2) + "K";
    } else {
      return volume.toFixed(4);
    }
  };



  // console.log(formatVolume(5000000000000), "896686877575657");

  function formatLargeNumber(value: number): string {
    if (value >= 1e12) {
      return (value / 1e12).toFixed(2) + 'T';
    } else if (value >= 1e9) {
      return (value / 1e9).toFixed(2) + 'B';
    } else if (value >= 1e6) {
      return (value / 1e6).toFixed(2) + 'M';
    } else if (value >= 1e3) {
      return (value / 1e3).toFixed(2) + 'K';
    } else {
      return value.toString();
    }
  }





  const containerClass = theme === "light" ? "lightCol" : "darkCol";
  const statClass = theme === "light" ? "lightStat" : "darkStat";

  return (
    <div className={`pool-card-container ${containerClass}`}>
      <div className="content-wrapper">
        <div className="stats-grid">
          <div className={`stat-card ${statClass}`}>
            <div className="label">TOKEN NAME</div>
            <div className="value">{coinData?.tokenName || "N/A"}</div>
          </div>
          <div className={`stat-card ${statClass}`}>
            <div className="label">TOTAL SYMBOL</div>
            <div className="value">{coinData?.tokenSymbol || "N/A"}</div>
          </div>
          <div className={`stat-card ${statClass}`}>
            <div className="label">PRICE</div>
            <div className="flex-value">
              <span>
                {coinData?.price !== null && coinData?.price !== undefined
                  ? `$${coinData.price.toFixed(10)}`
                  : "N/A"}
              </span>
            </div>
          </div>
          <div className={`stat-card ${statClass}`}>
            <div className="label">CIRC. SUPPLY</div>
            <div className="value">
              {coinData?.circulatingSupply
                ? formatLargeNumber(coinData.circulatingSupply)
                : "N/A"}
            </div>
          </div>
          <div className={`stat-card ${statClass}`}>
            <div className="label">MARKET CAP</div>
            <div className="value">
              {coinData?.marketCap
                ? `$${formatLargeNumber(coinData.marketCap)}`
                : "N/A"}
            </div>
          </div>

          {/* <div className={`stat-card ${statClass}`}>
            <div className="label">24H VOLUME</div> 
            <div className="value">
              {coinData?.volume24h !== null && coinData?.volume24h !== undefined
                ? coinData.volume24h === 0
                  ? formatVolume(coinData2.volume24hr)
                  : formatVolume(coinData.volume24h)
                : "N/A"}
            </div>
          </div> */}
          <div className={`stat-card ${statClass}`}>
            <div className="label">24H VOLUME</div>
            <div className="value">
              ${coinData?.volume24h !== null && coinData?.volume24h !== undefined
                ? coinData.volume24h === 0
                  ? coinData2?.volume24hr !== null && coinData2?.volume24hr !== undefined
                    ? formatVolume(coinData2.volume24hr)
                    : "N/A"
                  : formatVolume(coinData.volume24h)
                : "N/A"}
            </div>
          </div>



          <div className={`stat-card ${statClass}`}>
            <div className="label">TOTAL SUPPLY</div>
            <div className="value">
              {coinData?.totalSupply
                ? formatLargeNumber(coinData.totalSupply)
                : "N/A"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolCard;