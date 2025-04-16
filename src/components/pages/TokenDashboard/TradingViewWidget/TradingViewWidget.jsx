import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import { useAppSelector } from "../../../../app/hooks";
import { useParams } from "react-router-dom";
import "../TokenDashboard.scss";
import { useSelector } from "react-redux";
import { NetworkTypes } from "../../../../interfaces/common";
import { tokenPrecision } from "./TokenPrecision";

const ChartComponent = ({ showToken, setShowToken }) => {
  //console.log(showToken, setShowToken, "Hekkkkooooo")
  const { theme } = useAppSelector((state) => state.theme);
  const { symbol } = useParams();
  // const selectedChain: NetworkTypes = useSelector(
  //   (state: any) => state?.user?.chainValues?.symbol
  // );

  const selectedChain = useSelector((state) => {
    const symbol = state?.user?.chainValues?.symbol;
    return symbol === "STC" ? "SBC" : symbol;
  });

  //console.log(selectedChain, "000000000")

  const [dayWiseData, setDayWiseData] = useState([]);
  const [weekWiseData, setWeekWiseData] = useState([]);
  const [monthWiseData, setMonthWiseData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const seriesRef = useRef(null);
  const [activeButton, setActiveButton] = useState("1days");
  const [noData, setNoData] = useState(false);

  // console.log(data, "666666")

  const getTokenPrecision = (chain, token) => {
    // console.log(chain, token, "chain, token")
    return tokenPrecision[chain]?.[token] || tokenPrecision.default;
  };

  const initializeChart = () => {
    //const { precision, minMove } = tokenPrecision[symbol] || tokenPrecision.default;

    const { precision, minMove } = getTokenPrecision(selectedChain, symbol);

    if (
      chartRef.current &&
      chartRef.current.clientWidth > 0 &&
      chartRef.current.clientHeight > 0
    ) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.remove();
        chartInstanceRef.current = null;
      }

      chartInstanceRef.current = createChart(chartRef.current, {
        width: chartRef.current.clientWidth,
        height: chartRef.current.clientHeight,
        layout: {
          textColor: theme === "light" ? "black" : "white",
          background: {
            type: "solid",
            color: theme === "light" ? "white" : "dark",
          },
        },
        priceScale: {
          scaleMargins: {
            top: 0.3,
            bottom: 0.3,
          },
          autoScale: true,
          precision: precision,
          minMove: minMove,
        },
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
        },
        grid: {
          vertLines: {
            color: theme === "light" ? "#e0e0e0" : "#444444",
            // visible: false,
          },
          horzLines: {
            color: theme === "light" ? "#e0e0e0" : "#444444",
          },
        },
      });

      const candlestickSeries = chartInstanceRef.current.addCandlestickSeries({
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });

      candlestickSeries.applyOptions({
        priceFormat: {
          type: "price",
          precision: precision,
          minMove: minMove,
        },
      });

      seriesRef.current = candlestickSeries;
      //     if (data.length > 0) {
      //       candlestickSeries.setData(data);
      //       chartInstanceRef.current.timeScale().fitContent();
      //     }
      //   }
      // };

      // if (dayWiseData.length > 0 && activeButton === '1days') {
      //   const recentData = dayWiseData.slice(-50);
      //   candlestickSeries.setData(recentData);
      //   chartInstanceRef.current.timeScale().fitContent();

      //   let fullDataLoaded = false;

      //   chartInstanceRef.current.timeScale().subscribeVisibleTimeRangeChange((newVisibleRange) => {
      //     if (!fullDataLoaded) {
      //       const visibleLogicalRange = chartInstanceRef.current.timeScale().getVisibleLogicalRange();
      //       const fullDataLength = dayWiseData.length;

      //       // Check if the user has zoomed out or scrolled past the default range
      //       if (visibleLogicalRange && (visibleLogicalRange.to > recentData.length)) {
      //         // Load the full dayWiseData once scrolling/zooming past the initial range
      //         candlestickSeries.setData(dayWiseData);
      //         fullDataLoaded = true;  // Ensure we only load the full data once
      //       }
      //     }
      //   });
      // }
      if (dayWiseData.length > 0 && activeButton === "1days") {
        // Load the most recent 50 candlesticks initially
        const recentData = dayWiseData.slice(-50);
        candlestickSeries.setData(recentData);

        let fullDataLoaded = false;

        // Listen for visible range changes (e.g., when the user scrolls or zooms)
        chartInstanceRef.current
          .timeScale()
          .subscribeVisibleTimeRangeChange(() => {
            if (!fullDataLoaded) {
              const visibleLogicalRange = chartInstanceRef.current
                .timeScale()
                .getVisibleLogicalRange();
              const visibleCandlesCount =
                visibleLogicalRange?.to - visibleLogicalRange?.from;

              if (visibleLogicalRange && visibleCandlesCount) {
                const currentVisibleTo = visibleLogicalRange.to;

                // Trigger full data loading when the current visible range extends beyond the initial data
                if (currentVisibleTo >= recentData.length - 1) {
                  candlestickSeries.setData(dayWiseData); // Load the full data
                  fullDataLoaded = true; // Ensure full data is loaded only once
                }
              }
            }
          });

        // Set an initial visible range to display the recent 50 candles
        chartInstanceRef.current.timeScale().setVisibleLogicalRange({
          from: recentData.length - 50,
          to: recentData.length - 1,
        });

        // Add space to the right of the graph
        chartInstanceRef.current.timeScale().applyOptions({
          rightOffset: 5, // Adjust this value to increase or decrease the space
        });
      } else if (weekWiseData.length > 0 && activeButton === "7days") {
        candlestickSeries.setData(weekWiseData);
        chartInstanceRef.current.timeScale().fitContent();
      } else if (monthWiseData.length > 0 && activeButton === "1months") {
        candlestickSeries.setData(monthWiseData);
        chartInstanceRef.current.timeScale().fitContent();
      }
    }
  };

  // const transformData = (rawData) => {
  //   // console.log(rawData, "rawDataaaaaa")
  //   return rawData.map(item => ({
  // time: Math.floor(item.timestamp / 1000),
  // open: parseFloat(item.openPrice) || 0,
  // high: parseFloat(item.highPrice) || 0,
  // low: parseFloat(item.lowPrice) || 0,
  // close: parseFloat(item.closePrice) || 0,
  // volume: item.volume,
  //   }))
  //     .sort((a, b) => a.time - b.time);
  // };

  const transformData = (rawData) => {
    return rawData
      .map((item) => {
        const timestamp =
          item.timestamp > 99999999999
            ? Math.floor(item.timestamp / 1000)
            : item.timestamp;

        return {
          time: timestamp,
          open: parseFloat(item.openPrice) || 0,
          high: parseFloat(item.highPrice) || 0,
          low: parseFloat(item.lowPrice) || 0,
          close: parseFloat(item.closePrice) || 0,
          volume: item.volume,
        };
      })
      .sort((a, b) => a.time - b.time);
  };

  const fetchData = async () => {
    setLoading(true);
    setNoData(false);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/v1/coin/history?chain=${selectedChain}&symbol=${symbol}`
      );
      const result = await response.json();
      console.log("API Result:", result);

      if (result.status === 200 && !result.error) {
        const DataDayWise = result?.data?.dayWiseData || [];
        const DataWeekWise = result?.data?.weekWiseData || [];
        const DataMonthWise = result?.data?.monthWiseData || [];

        if (
          DataDayWise.length === 0 &&
          DataWeekWise.length === 0 &&
          DataMonthWise.length === 0
        ) {
          setNoData(true);
        } else {
          if (DataDayWise.length > 0) {
            // console.log('Day Wise Data:', DataDayWise);
            setDayWiseData(transformData(DataDayWise));
          }
          if (DataWeekWise.length > 0) {
            // console.log('Week Wise Data:', DataWeekWise);
            setWeekWiseData(transformData(DataWeekWise));
          }
          if (DataMonthWise.length > 0) {
            //  console.log('Month Wise Data:', DataMonthWise);
            setMonthWiseData(transformData(DataMonthWise));
          }
          setData(transformData(DataDayWise));
          setActiveButton("1days");
        }
      } else {
        // console.log('Error fetching data:', result.message);
        setNoData(true);
      }
    } catch (error) {
      // console.log('Fetch error:', error);
      setNoData(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [symbol, selectedChain]);

  useEffect(() => {
    if (!loading && data.length > 0) {
      initializeChart();

      const handleResize = () => {
        initializeChart();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        if (chartInstanceRef.current) {
          chartInstanceRef.current.remove();
          chartInstanceRef.current = null;
        }
      };
    }
  }, [loading, data, theme]);

  const handleButtonClick = (buttonKey) => {
    setActiveButton(buttonKey);
    switch (buttonKey) {
      case "1days":
        setData(dayWiseData);
        break;
      case "7days":
        setData(weekWiseData);
        break;
      case "1months":
        setData(monthWiseData);
        break;
      default:
        setData(dayWiseData);
    }
  };

  return (
    <div style={{ width: "100%", height: "95%", position: "relative" }}>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "18px",
            color: theme ? "white" : "black",
          }}
        >
          <p className={`${theme === "light" ? "lighText" : "darkText"}`}>
            {" "}
            Loading...
          </p>
        </div>
      )}
      {noData && !loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "18px",
            color: theme ? "white" : "black",
          }}
        >
          <p className={`${theme === "light" ? "lighText" : "darkText"}`}>
            {" "}
            Data not found
          </p>
        </div>
      )}
      {!noData && !loading && (
        <>
          <div
            className={`button-container ${
              theme === "light" ? "light-theme" : "dark-theme"
            }`}
            style={{ marginBottom: "10px", float: "right" }}
          >
            <button
              className={`theme-button ${
                theme === "light" ? "lightTheme" : "darkTheme"
              } ${activeButton === "1days" ? "active" : ""}`}
              onClick={() => handleButtonClick("1days")}
            >
              1D
            </button>
            <button
              className={`theme-button ${
                theme === "light" ? "lightTheme" : "darkTheme"
              } ${activeButton === "7days" ? "active" : ""}`}
              onClick={() => handleButtonClick("7days")}
            >
              7D
            </button>
            <button
              className={`theme-button ${
                theme === "light" ? "lightTheme" : "darkTheme"
              } ${activeButton === "1months" ? "active" : ""}`}
              onClick={() => handleButtonClick("1months")}
            >
              1M
            </button>
          </div>

          <div ref={chartRef} style={{ width: "100%", height: "93%" }} />
        </>
      )}
    </div>
  );
};

export default ChartComponent;
