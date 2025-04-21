import React, { useEffect, useRef, useState } from "react";
import {
  createChart,
  IChartApi,
  ISeriesApi,
  CandlestickData as LWCandlestickData,
} from "lightweight-charts";

interface HistoricalPrice {
  openPrice: number;
  closePrice: number;
  highPrice: number;
  lowPrice: number;
  volume: number;
  timestamp: number;
}

interface CandlestickData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

const CandlestickChart: React.FC = () => {
  const data = {
    symbol: "STC",
    historicalPrices: [
      {
        openPrice: 0.00175339460455605,
        closePrice: 0.001722005275278784,
        highPrice: 0.001839546992121289,
        lowPrice: 0.001713547907026498,
        volume: 211271523.7200001,
        timestamp: 1721815200000,
      },
      {
        openPrice: 0.001730248693411231,
        closePrice: 0.001732322221723049,
        highPrice: 0.001732644282880461,
        lowPrice: 0.001465161194709264,
        volume: 356281926.0799997,
        timestamp: 1721865600000,
      },
      {
        openPrice: 0.001732275227944981,
        closePrice: 0.001674463470868117,
        highPrice: 0.001761276555665029,
        lowPrice: 0.001520038810983139,
        volume: 254539933.97999993,
        timestamp: 1721952000000,
      },
      {
        openPrice: 0.001674964079809642,
        closePrice: 0.001687283737769097,
        highPrice: 0.001698207321350419,
        lowPrice: 0.001607305200190375,
        volume: 274553223.2700001,
        timestamp: 1722038400000,
      },
      {
        openPrice: 0.001689174740547535,
        closePrice: 0.001658939067847375,
        highPrice: 0.001704457972609522,
        lowPrice: 0.001551662461003188,
        volume: 213610218.23000002,
        timestamp: 1722124800000,
      },
      {
        openPrice: 0.001657385570179286,
        closePrice: 0.001757565622800135,
        highPrice: 0.001846408082511663,
        lowPrice: 0.001638158837506012,
        volume: 254954216.87999997,
        timestamp: 1722211200000,
      },
      {
        openPrice: 0.001754807341950646,
        closePrice: 0.001710557318320051,
        highPrice: 0.001847377380849611,
        lowPrice: 0.001687723933199286,
        volume: 245251467.55999997,
        timestamp: 1722297600000,
      },
      {
        openPrice: 0.001711859502899615,
        closePrice: 0.001719356129855532,
        highPrice: 0.002024742328442217,
        lowPrice: 0.00141883503147968,
        volume: 269269207.71,
        timestamp: 1722384000000,
      },
      {
        openPrice: 0.001718845627767761,
        closePrice: 0.001754820230767354,
        highPrice: 0.001911001183875075,
        lowPrice: 0.001458804593842294,
        volume: 309265492.63999975,
        timestamp: 1722470400000,
      },
      {
        openPrice: 0.001653214843418102,
        closePrice: 0.001683747349505898,
        highPrice: 0.001860496126242408,
        lowPrice: 0.001484510020969102,
        volume: 428873916.8699999,
        timestamp: 1722556800000,
      },
      {
        openPrice: 0.001686840777045583,
        closePrice: 0.001536648782709947,
        highPrice: 0.001740817219500206,
        lowPrice: 0.001510303882677777,
        volume: 446718332.6700002,
        timestamp: 1722643200000,
      },
      {
        openPrice: 0.001555115185264785,
        closePrice: 0.001490480749574756,
        highPrice: 0.00167174045548547,
        lowPrice: 0.001441628384443941,
        volume: 302733623.0399998,
        timestamp: 1722729600000,
      },
      {
        openPrice: 0.001442887446761258,
        closePrice: 0.001289871394711127,
        highPrice: 0.001489856048143188,
        lowPrice: 0.001119500044586942,
        volume: 309118918.48999983,
        timestamp: 1722816000000,
      },
      {
        openPrice: 0.001288995756877515,
        closePrice: 0.001398932666868894,
        highPrice: 0.001606919236029929,
        lowPrice: 0.00121286828820155,
        volume: 404306009.3199998,
        timestamp: 1722902400000,
      },
      {
        openPrice: 0.001401657046121999,
        closePrice: 0.001264390664673449,
        highPrice: 0.00141692417521318,
        lowPrice: 0.001254451650766125,
        volume: 465365022.99000007,
        timestamp: 1722988800000,
      },
      {
        openPrice: 0.001289510956764496,
        closePrice: 0.001473258158704976,
        highPrice: 0.001566691423042702,
        lowPrice: 0.001253405591616487,
        volume: 468250146.7799998,
        timestamp: 1723075200000,
      },
      {
        openPrice: 0.001481047478975476,
        closePrice: 0.001375188854758401,
        highPrice: 0.001494447061517315,
        lowPrice: 0.001257637889304919,
        volume: 313657231.4100001,
        timestamp: 1723161600000,
      },
      {
        openPrice: 0.001369828171499911,
        closePrice: 0.001368554513403688,
        highPrice: 0.001377392245555172,
        lowPrice: 0.001227845918007976,
        volume: 243750295.83,
        timestamp: 1723248000000,
      },
      {
        openPrice: 0.001368697751349443,
        closePrice: 0.001241748738597157,
        highPrice: 0.001387448305052882,
        lowPrice: 0.001209725921509032,
        volume: 337055296.6499999,
        timestamp: 1723334400000,
      },
      {
        openPrice: 0.001242409023678424,
        closePrice: 0.001224232999062877,
        highPrice: 0.001372613683651031,
        lowPrice: 0.001169591102827901,
        volume: 305178964.68999994,
        timestamp: 1723420800000,
      },
      {
        openPrice: 0.001267589656675034,
        closePrice: 0.001186233586185692,
        highPrice: 0.001267893078515633,
        lowPrice: 0.001139369731927872,
        volume: 359793729.5100001,
        timestamp: 1723507200000,
      },
      {
        openPrice: 0.001186202599380259,
        closePrice: 0.001108666949527544,
        highPrice: 0.00118630428380685,
        lowPrice: 0.00108012990413337,
        volume: 308316095.38999987,
        timestamp: 1723593600000,
      },
      {
        openPrice: 0.001109122665871967,
        closePrice: 0.001140132519497894,
        highPrice: 0.001193750373253694,
        lowPrice: 0.001063938171223471,
        volume: 292437363.21,
        timestamp: 1723680000000,
      },
      {
        openPrice: 0.001133501332017003,
        closePrice: 0.001127705956576208,
        highPrice: 0.001133576774192256,
        lowPrice: 0.001054158534505899,
        volume: 352945105.7699999,
        timestamp: 1723766400000,
      },
      {
        openPrice: 0.001128749555131099,
        closePrice: 0.001133193268370359,
        highPrice: 0.001157189076640943,
        lowPrice: 0.001067144967592942,
        volume: 364239249.58999985,
        timestamp: 1723852800000,
      },
      {
        openPrice: 0.001133451578108867,
        closePrice: 0.001171676019724776,
        highPrice: 0.001201333504420254,
        lowPrice: 0.001112270426712115,
        volume: 360616375.01999974,
        timestamp: 1723939200000,
      },
      {
        openPrice: 0.001171550683092667,
        closePrice: 0.001118084770052035,
        highPrice: 0.001212932462989953,
        lowPrice: 0.0010653036263715,
        volume: 386526839.1,
        timestamp: 1724025600000,
      },
      {
        openPrice: 0.001118485965505594,
        closePrice: 0.001109672981056488,
        highPrice: 0.00115074808770443,
        lowPrice: 0.001003832893191809,
        volume: 381694298.87999994,
        timestamp: 1724112000000,
      },
      {
        openPrice: 0.00111097353062819,
        closePrice: 0.001051338334656942,
        highPrice: 0.001119779326524887,
        lowPrice: 0.001020218733143319,
        volume: 349596765.5491271,
        timestamp: 1724198400000,
      },
      {
        openPrice: 0.001060307846931102,
        closePrice: 0.001046452865129367,
        highPrice: 0.001115449202168698,
        lowPrice: 0.001014783237387971,
        volume: 339870350.56000024,
        timestamp: 1724284800000,
      },
      {
        openPrice: 0.001051054219026552,
        closePrice: 0.00103946819494079,
        highPrice: 0.001071116578723111,
        lowPrice: 0.00102309004952455,
        volume: 158054363.63999993,
        timestamp: 1724371200000,
      },
    ],
  };
  const lightTheme = {
    layout: {
      background: { color: "#ffffff" },
      textColor: "#000000",
    },
    grid: {
      vertLines: {
        color: "#e0e0e0",
      },
      horzLines: {
        color: "#e0e0e0",
      },
    },
    candlestickSeries: {
      upColor: "#4caf50",
      downColor: "#e91e63",
      borderUpColor: "#4caf50",
      borderDownColor: "#e91e63",
      wickUpColor: "#4caf50",
      wickDownColor: "#e91e63",
    },
  };

  const darkTheme = {
    layout: {
      background: { color: "#090D1F" },
      textColor: "#d9d9d9",
    },
    grid: {
      vertLines: {
        color: "#444444",
      },
      horzLines: {
        color: "#444444",
      },
    },
    candlestickSeries: {
      upColor: "#4caf50",
      downColor: "#e91e63",
      borderUpColor: "#4caf50",
      borderDownColor: "#e91e63",
      wickUpColor: "#4caf50",
      wickDownColor: "#e91e63",
    },
  };

  // Convert the data to the format expected by lightweight-charts
  const candlestickData: CandlestickData[] = data.historicalPrices.map(
    (item: HistoricalPrice) => ({
      time: item.timestamp / 1000, // Convert milliseconds to seconds
      open: item.openPrice,
      high: item.highPrice,
      low: item.lowPrice,
      close: item.closePrice,
    })
  );
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (chartContainerRef.current) {
      // Create the chart
      chartRef.current = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 400,
        ...(!isDarkMode ? lightTheme : darkTheme), // Apply the selected theme
      });

      // Add a candlestick series with 5-digit precision
      seriesRef.current = chartRef.current.addCandlestickSeries({
        ...(!isDarkMode
          ? lightTheme.candlestickSeries
          : darkTheme.candlestickSeries),
        priceFormat: {
          type: "price",
          precision: 5,
          minMove: 0.00001,
        },
      });
      // Add the data to the series
      seriesRef.current.setData(candlestickData as LWCandlestickData[]);
    }

    // Handle chart resizing
    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [isDarkMode]); // Re-run this effect when the theme changes

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "12px",
        boxShadow: "0px 14px 54px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      {/* <button onClick={toggleTheme}>
        Toggle to {isDarkMode ? "Light" : "Dark"} Mode
      </button> */}
      <div
        ref={chartContainerRef}
        style={{
          width: "100%",
          height: "400px",
          borderRadius: "12px",
          boxShadow: "0px 14px 54px 0px rgba(0, 0, 0, 0.25)",
        }}
      />
    </div>
  );
};

export default CandlestickChart;
