import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const TradingVolumeChart = () => {
  const [timeframe, setTimeframe] = useState("This Year");

  const getSeriesData = () => {
    switch (timeframe) {
      case "This Month":
        return [200, 500, 700, 1200, 900, 1100, 1500];
      case "Last Year":
        return [1000, 1500, 1200, 2700, 1600, 1700, 2100];
      default:
        return [300, 600, 1100, 2700, 1400, 1300, 1952];
    }
  };

  const [series, setSeries] = useState([{ name: "Trading Volume", data: getSeriesData() }]);

  useEffect(() => {
    setSeries([{ name: "Trading Volume", data: getSeriesData() }]);
  }, [timeframe]);

  const options = {
    chart: { type: "area", height: 300, toolbar: { show: false } },
    stroke: {
      curve: "smooth",
      width: 2,
      colors: ["#00C896"], // Line color
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.3,
        opacityFrom: 0.5,
        opacityTo: 0.5,
        stops: [0, 100],
        colorStops: [
          { offset: 0, color: "#00C896", opacity: 0.2 },
          { offset: 100, color: "#ffffff", opacity: 0 },
        ],
      },
    },
    markers: {
      size: 0, // 🚀 Removes normal dots
      hover: { size: 6, colors: ["#00C896"] }, // 🎯 Shows dot on hover
    },
    tooltip: {
      enabled: true, // ✅ Shows data labels on hover
      theme: "light",
      style: { fontSize: "12px", fontWeight: "bold" },
    },
    dataLabels: { enabled: false }, // ❌ Hides blue number labels (1100, 2700, etc.)
    xaxis: {
      categories: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"],
      labels: { style: { colors: "#999", fontSize: "12px" } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { show: false },
    grid: { show: false },
  };

  return (
    <div className="trading_chart_card">
      <h2 className="fw-bold primary-font mt-3 volume_trading_h2 px-3 text-start px-sm-5 pt-4 pt-lg-5">Trading Volume</h2>
      <div className="d-flex justify-content-between align-items-center mt-5 px-3 px-sm-5">
      <p className="mb-0 primary-font activity_p">Activity</p>
        <select className="form-select w-auto chart_selection" value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
          <option className="primary_font">This Year</option>
          <option className="primary_font">This Month</option>
          <option className="primary_font">Last Year</option>
        </select>
      </div>
     
      <Chart options={options} series={series} type="area" height={250} className="px-lg-4 px-sm-4" />
    </div>
  );
};

export default TradingVolumeChart;
