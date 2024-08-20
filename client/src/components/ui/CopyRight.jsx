import React from "react";

const Copyright = () => {
  const company = "Jayasriraam";
  return (
    <footer className="bg-black text-white py-4 border-t border-gray-700 mt-5">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; 2023 {company}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Copyright;
