import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const StockChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Stock Price",
        data: [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 1,
      },
    ],
    extraData: {
      changes: [],
      changesPercentages: [],
    },
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=uInoCwXgWgmXAHKt0ayq1Gi9KJ3YXmHo"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Extract data
        const labels = data.map((item) => item.symbol);
        const prices = data.map((item) => item.price);
        const changesPercentages = data.map((item) => item.changesPercentage);
        const changes = data.map((item) => item.change);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Stock Price",
              data: prices,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 1,
            },
          ],
          extraData: {
            changesPercentages,
            changes,
          },
        });
        setError(null); // Clear error if data is fetched successfully
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching stock data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const index = tooltipItem.dataIndex;
            const extraData = chartData.extraData;
            return [
              `${tooltipItem.dataset.label}: $${tooltipItem.raw}`,
              `Change: $${extraData.changes[index]}`,
              `Change Percentage: ${extraData.changesPercentages[index]}`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(0,0,0,0.1)",
          borderColor: "rgba(255, 255, 255, 0.5)",
          borderWidth: 1,
        },
        ticks: {
          color: "#000",
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        grid: {
          color: "rgba(0,0,0,0.1)",
          borderColor: "rgba(255, 255, 255, 0.5)",
          borderWidth: 1,
        },
        ticks: {
          color: "#000",
        },
      },
    },
    elements: {
      line: {
        tension: 0.1,
      },
    },
    layout: {
      padding: 20,
    },
  };

  return (
    <div>
      <h2 className="font-bebas text-5xl mb-10 text-center">
        Stock Market Gainers
      </h2>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <Line data={chartData} options={options} className="w-full h-auto" />
      )}
    </div>
  );
};

export default StockChart;
