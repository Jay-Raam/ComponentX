import React, { useState, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/animation.css";

const MIN_DATE = new Date("1980-12-12"); // December 12, 1980

const FinancialDataFetcher = () => {
  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 14);

  const [startDate, setStartDate] = useState(
    oneWeekAgo > MIN_DATE ? oneWeekAgo : MIN_DATE
  );
  const [endDate, setEndDate] = useState(today);
  const [company, setCompany] = useState("AAPL");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Error state

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null); // Reset error state before fetching

    const startDateFormatted = startDate.toISOString().split("T")[0];
    const endDateFormatted = endDate.toISOString().split("T")[0];
    const apiKey = "uInoCwXgWgmXAHKt0ayq1Gi9KJ3YXmHo";
    const url = `https://financialmodelingprep.com/api/v3/historical-price-full/${company}?from=${startDateFormatted}&to=${endDateFormatted}&apikey=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData(result.historical || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [company, startDate, endDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    // Ensure startDate is always two weeks before endDate
    if (endDate < startDate) {
      setStartDate(new Date(endDate).setDate(endDate.getDate() - 14));
    }
  }, [endDate, startDate]);

  const handleStartDateChange = (date) => {
    if (date >= MIN_DATE && date <= endDate) {
      setStartDate(date);
    }
  };

  const handleEndDateChange = (date) => {
    if (date >= startDate) {
      setEndDate(date);
    }
  };

  const formatDate = (dateStr) => {
    // Parse the date string to a Date object
    const dateObj = new Date(dateStr);

    // Extract day, month, and year
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = dateObj.getFullYear();

    // Format to 'dd-MM-yyyy'
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <div className="flex flex-col items-center gap-5 mt-28">
        <h1 className="text-2xl font-bold mb-4">Historical Price Data</h1>
        <div className="w-full max-w-md flex flex-col items-center">
          <label className="mb-2 font-open">Company Symbol</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value.toUpperCase())}
            placeholder="Enter company symbol"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-[300px] md:w-[400px] p-2.5"
          />
        </div>
        <div className="w-full max-w-md flex flex-col items-center">
          <label className="mb-2 font-open">From</label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="dd-MM-yyyy"
            minDate={MIN_DATE}
            maxDate={endDate}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-[300px] md:w-[400px] p-2.5"
          />
        </div>
        <div className="w-full max-w-md flex flex-col items-center">
          <label className="mb-2 font-open">To</label>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            dateFormat="dd-MM-yyyy"
            minDate={startDate}
            maxDate={today}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-[300px] md:w-[400px] p-2.5"
          />
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="bg-blue-500 text-white p-2.5 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
        >
          {loading ? "Loading..." : "Fetch Data"}
        </button>
      </div>
      {error && (
        <div className="mt-4 text-red-500 font-semibold">Error: {error}</div>
      )}
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
      <div className="mt-4 flex justify-center items-center gap-4 max-w-[1200px] mx-auto my-0 flex-wrap">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className="flex justify-center items-center gap-4 border p-4 mb-4 rounded-lg hover:shadow-sm flex-col w-[300px]"
            >
              <h3 className="font-semibold">{formatDate(item.date)}</h3>
              <p>Open: {item.open}</p>
              <p>High: {item.high}</p>
              <p>Low: {item.low}</p>
              <p>Close: {item.close}</p>
              <p>Volume: {item.volume}</p>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </>
  );
};

export default FinancialDataFetcher;
