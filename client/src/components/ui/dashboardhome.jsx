import React from "react";
import { isMobile } from "react-device-detect";
import StockChart from "./StockChart";
import Gainer from "./Gainer";

const Dashboardhome = () => {
  const companies = ["AAPL", "GOOGL", "MSFT"];
  return (
    <div className="flex flex-col w-full h-auto items-center justify-center mt-20">
      {isMobile ? (
        // Layout optimized for mobile or tablet
        <div className="w-full flex justify-center items-center font-bebas text-5xl">
          <h1 className="text-center">
            Not optimise for this charts in mobiles...
          </h1>
        </div>
      ) : (
        // Layout optimized for desktop/laptops
        <div className="w-full">
          <div className="w-full">
            <StockChart companies={companies} />
          </div>
          <div className="w-full">
            <Gainer />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboardhome;
