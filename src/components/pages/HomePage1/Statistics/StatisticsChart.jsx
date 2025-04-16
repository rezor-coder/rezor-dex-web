import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import { useAppSelector } from "../../../../app/hooks";
import { useSelector } from "react-redux";

const ChartComponent = ({ activity }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const seriesRef = useRef(null);
  const [dataNotFound, setDataNotFound] = useState(false);
  // const selectedChain = useSelector(
  //   (state) => state?.user?.chainValues?.symbol
  // );
  const selectedChain = useSelector(
    (state) => {
      const symbol = state?.user?.chainValues?.symbol;
      return symbol === 'STC' ? 'SBC' : symbol;
    }
  );
  console.log(selectedChain, "selectedChain")

  const { theme } = useAppSelector((state) => state.theme);

  const initializeChart = () => {
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
          background: { color: "transparent" },
          border: "none",
        },
        priceScale: {
          scaleMargins: {
            top: 0.2,
            bottom: 0.2,
          },
          precision: 4,
          minMove: 0.0001,
        },
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
        },
        grid: {
          vertLines: {
            color: "rgba(68, 68, 68, 0.1)",
            style: 0,
          },
          horzLines: {
            color: "rgba(68, 68, 68, 0.1)",
            style: 0,
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
          precision: 4,
          minMove: 0.0001,
        },
      });

      seriesRef.current = candlestickSeries;

      // Volume series
      const volumeSeries = chartInstanceRef.current.addHistogramSeries({
        color: "#26a69a", // Default color for volume bars
        priceScaleId: "", // Attach it to the same price scale as the candlestick chart
        priceFormat: {
          type: "volume",
        },
        scaleMargins: {
          top: 0.8, // Makes room for the candlestick chart
          bottom: 0,
        },
      });

      if (data.length > 0) {
        candlestickSeries.setData(data);
        chartInstanceRef.current.timeScale().fitContent();
      }
      

    }
  };

  const fetchData = async () => {
    setLoading(true);
    setDataNotFound(false);
    try {

      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/v1/coin/stc/info`
      );
      const result = await response.json();
      console.log(result, "Result")
      if (result.status === 200 && !result.error) {
        let historicalPrices = [];
        switch (activity) {
          case '1D':
            historicalPrices = result?.data?.historicalPrice?.dayWiseData || [];
            break;
          case '7D':
            historicalPrices = result?.data?.historicalPrice?.weekWiseData || [];
            break;
          case '1M':
            historicalPrices = result?.data?.historicalPrice?.monthWiseData || [];
            break;
          default:
            historicalPrices = result?.data?.historicalPrice?.dayWiseData || [];

            console.log(historicalPrices,"historicalPrices" )
        }

        const transformedData = historicalPrices?.map((item) => ({
          time: Math.floor(item.timestamp / 1000),
          open: parseFloat(item.openPrice) || 0,
          high: parseFloat(item.highPrice) || 0,
          low: parseFloat(item.lowPrice) || 0,
          close: parseFloat(item.closePrice) || 0,
          volume: item.volume,
        }));

        transformedData.sort((a, b) => a.time - b.time);
        console.log(transformedData, "dshvfhejrfvhjr")

        setData(transformedData);
        if (transformedData.length === 0) {
          setDataNotFound(true);
        }
      } else {
        setDataNotFound(true);
      }
    } catch (error) {
      console.log("Fetch error:", error);
      setDataNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activity, theme]);

  useEffect(() => {
    if (!dataNotFound && data.length > 0) {
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
  }, [data, dataNotFound]);


  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "18px",
            color: theme ? 'white' : 'black',
          }}>
          <p className={`${theme === "light" ? "lighText" : "darkText"}`}> Loading...</p>
        </div>
      )}
      {!loading && dataNotFound && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "18px",
            color: theme ? 'white' : 'black',
          }}>
          <p className={`${theme === "light" ? "lighText" : "darkText"}`}> Data not founds</p>
        </div>
      )}
      <div ref={chartRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default ChartComponent;
