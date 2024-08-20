import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
} from "chart.js";
import "chartjs-adapter-date-fns";
import "../styles/animation.css";

// Register the required components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement
);

const StockChart = ({ companies }) => {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Clear any previous errors

      try {
        const apiKey = "uInoCwXgWgmXAHKt0ayq1Gi9KJ3YXmHo"; // Replace with your API key
        const datasets = [];

        // Define colors for specific companies
        const companyColors = {
          GOOGL: { high: "red", low: "green" },
          MSFT: { high: "blue", low: "green" },
        };

        // Fetch data for each company
        for (const company of companies) {
          const response = await fetch(
            `https://financialmodelingprep.com/api/v3/historical-price-full/${company}?apikey=${apiKey}`
          );

          if (!response.ok) {
            throw new Error(`Failed to fetch data for ${company}`);
          }

          const data = await response.json();

          if (data.historical && data.historical.length > 0) {
            const highColor = companyColors[company]?.high || "#000";
            const lowColor = companyColors[company]?.low || "#28a745";

            const highData = {
              label: `${company} High Price`,
              data: data.historical.map((item) => ({
                x: item.date,
                y: item.high,
              })),
              borderColor: highColor,
              borderWidth: 2,
              pointBackgroundColor: "transparent",
              pointRadius: 0,
              fill: false,
            };

            const lowData = {
              label: `${company} Low Price`,
              data: data.historical.map((item) => ({
                x: item.date,
                y: item.low,
              })),
              borderColor: lowColor,
              borderWidth: 2,
              pointBackgroundColor: "transparent",
              pointRadius: 0,
              fill: false,
            };

            datasets.push(highData, lowData);
          } else {
            throw new Error(`No historical data available for ${company}`);
          }
        }

        setChartData({ datasets });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [companies]);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        height: "auto",
      }}
    >
      <h2
        style={{ marginBottom: "40px" }}
        className="font-bebas text-5xl text-center"
      >
        Stock Prices for {companies.join(", ")}
      </h2>
      {loading && (
        <div className="banter-loader">
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
        </div>
      )}
      {error && <div className="text-red-500">Error: {error}</div>}
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
              labels: {
                color: "#333",
                font: {
                  size: 14,
                },
              },
            },
            tooltip: {
              backgroundColor: "#fff",
              titleColor: "#333",
              bodyColor: "#333",
              borderColor: "#fff",
              borderWidth: 1,
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.dataset.label}: $${tooltipItem.raw.y}`;
                },
              },
            },
          },
          scales: {
            x: {
              type: "time",
              time: {
                unit: "day",
                tooltipFormat: "PPP", // Date format for tooltips
              },
              title: {
                display: true,
                text: "Date",
                color: "#333",
              },
              grid: {
                display: false, // Hide grid lines
              },
            },
            y: {
              title: {
                display: true,
                text: "Price",
                color: "#333",
              },
              grid: {
                display: false, // Hide grid lines
              },
              ticks: {
                color: "#333", // Dark text for y-axis ticks
              },
            },
          },
        }}
        className="w-full h-auto"
      />
    </div>
  );
};

export default StockChart;
