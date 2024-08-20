import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Profile() {
  // Extract email from the Redux store
  const email = useSelector((state) => state.user.email);

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch data if email is available
    if (email) {
      // Define an async function to fetch data
      const fetchProfileData = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `http://localhost:3001/api/users/by-email?email=${email}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setProfileData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchProfileData();
    } else {
      setLoading(false);
    }
  }, [email]);

  return (
    <div className="profile flex justify-center items-center flex-col gap-3 p-4 h-[100vh]">
      <h1 className="flex justify-center items-center mt-4 mb-6 text-2xl font-medium">
        User Profile
      </h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : profileData ? (
        <div className="flex flex-col items-center justify-center gap-3">
          <p className="mb-2 font-open flex flex-col items-center justify-center gap-3">
            <strong className="text-xl font-bebas">Email</strong>
            <span className="text-xl">{profileData.email}</span>
          </p>
          <p className="mb-2 font-open flex flex-col items-center justify-center gap-3">
            <strong className="font-bebas text-xl">Name</strong>
            <span className="text-xl">{profileData.name}</span>
          </p>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <p className="text-center text-gray-500">No profile data available</p>
      )}
    </div>
  );
}

export default Profile;
