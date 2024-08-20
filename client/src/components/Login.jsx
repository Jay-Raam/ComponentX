import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "./ui/AuthContext";
import { setUser } from "./userSlice";
import Image00002 from "./image/m11.jpeg";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submission, setSubmission] = useState(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Network response was not ok");
      }

      const result = await response.json();
      dispatch(setUser(email));
      setSubmission(true);
      login();
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error logging in:", err);
      setError(
        "Error logging in. Please check your credentials and try again."
      );
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login">
      <h1 className="flex justify-center items-center mt-4 mb-6 text-2xl font-bold">
        Login
      </h1>

      <div className="flex justify-center items-center flex-col lg:flex-row gap-4 pb-5 md:pb-0 max-w-[1200px] mx-auto my-0">
        <div className="image w-full lg:w-2/4 flex justify-center items-center">
          <img
            src={Image00002}
            alt="register logo"
            className="w-[300px] md:w-[438px] h-auto"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 justify-center items-center  w-full lg:w-2/4"
        >
          <div className="relative mb-6 w-full max-w-xs">
            <label htmlFor="email-input" className="sr-only">
              Email
            </label>
            <input
              type="email"
              id="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-50 border border-gray-300 pl-3 text-gray-900 text-sm rounded-lg w-full p-2.5 "
              placeholder="name@flowbite.com"
            />
          </div>

          <div className="relative mb-6 w-full max-w-xs">
            <label htmlFor="password-input" className="sr-only">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-gray-50 border border-gray-300 pl-3 text-gray-900 text-sm rounded-lg w-full p-2.5"
              placeholder="••••••••"
            />
            <div
              className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              <svg
                className={`w-5 h-5 ${
                  showPassword ? "text-black" : "text-black"
                } `}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                {showPassword ? (
                  <path
                    fillRule="evenodd"
                    d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                    clipRule="evenodd"
                  />
                ) : (
                  <>
                    <path d="m4 15.6 3.055-3.056A4.913 4.913 0 0 1 7 12.012a5.006 5.006 0 0 1 5-5c.178.009.356.027.532.054l1.744-1.744A8.973 8.973 0 0 0 12 5.012c-5.388 0-10 5.336-10 7A6.49 6.49 0 0 0 4 15.6Z" />
                    <path d="m14.7 10.726 4.995-5.007A.998.998 0 0 0 18.99 4a1 1 0 0 0-.71.305l-4.995 5.007a2.98 2.98 0 0 0-.588-.21l-.035-.01a2.981 2.981 0 0 0-3.584 3.583c0 .012.008.022.01.033.05.204.12.402.211.59l-4.995 4.983a1 1 0 1 0 1.414 1.414l4.995-4.983c.189.091.386.162.59.211.011 0 .021.007.033.01a2.982 2.982 0 0 0 3.584-3.584c0-.012-.008-.023-.011-.035a3.05 3.05 0 0 0-.21-.588Z" />
                    <path d="m19.821 8.605-2.857 2.857a4.952 4.952 0 0 1-5.514 5.514l-1.785 1.785c.767.166 1.55.25 2.335.251 6.453 0 10-5.258 10-7 0-1.166-1.637-2.874-2.179-3.407Z" />
                  </>
                )}
              </svg>
            </div>
          </div>

          <button
            type="submit"
            className="text-white w-[200px] bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}
          <p className="text-center mt-2">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
          <p className="text-center mt-2">
            Back to <Link to="/">Home</Link>
          </p>
        </form>
      </div>

      {submission && (
        <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-4 fixed top-0 w-full h-[100vh] text-black flex flex-col justify-center items-center space-y-4">
          <p className="text-xl font-semibold font-bebas">Login Successful!</p>
          <Link
            to="/dashboard"
            className="text-black font-bebas text-4xl font-medium"
          >
            Go to Dashboard
          </Link>
          <button
            onClick={() => setSubmission(false)}
            className="bg-black text-white px-4 py-2 font-medium rounded-lg"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
