import React, { useState, useEffect } from "react";
import "../styles/animation.css";
import Image00003 from "../image/m12.jpeg";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [skip, setSkip] = useState(0);

  // Set a fixed limit
  const limit = 30;

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(
          `https://componentx-server.vercel.app/api/companies?limit=${limit}&skip=${skip}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCompanies(data);
        // console.log(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [limit, skip]);

  return (
    <>
      <div className="company mt-20">
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
        {error && <div>Error: {error}</div>}
        <ul className="flex justify-center items-center gap-4 max-w-[1200px] mx-auto my-0 flex-wrap">
          {companies.map((company) => (
            <li
              key={company._id}
              className="flex justify-center items-center gap-4 flex-col w-[250px] text-center border-[2px] p-3 rounded-md"
            >
              <img
                src={Image00003}
                alt="comapny logo"
                className="w-full h-auto"
              />
              {company.stockExchange && (
                <h1>Stock Exchange : {company.stockExchange}</h1>
              )}
              {company.name && <h3>Name : {company.name}</h3>}
              {company.symbol && <p>Symbol : {company.symbol}</p>}
              {company.currency && <p>Currency : {company.currency}</p>}
              {company.exchangeShortName && (
                <p>Exchange Short Name : {company.exchangeShortName}</p>
              )}
            </li>
          ))}
        </ul>
        {companies.length > 0 && (
          <div className="flex justify-center items-center gap-4 max-w-[1200px] mx-auto my-0 mt-5">
            <button
              onClick={() => setSkip(skip - limit)}
              disabled={skip === 0}
              className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Previous
            </button>
            <button
              onClick={() => setSkip(skip + limit)}
              className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CompanyList;
