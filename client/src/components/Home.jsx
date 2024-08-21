import React, { useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { MdOutlineMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import Image002 from "./image/m2.webp";
import Image003 from "./image/m4.jpeg";
import Image004 from "./image/m6.webp";
import Image005 from "./image/m7.jpeg";
import Image006 from "./image/m8.jpeg";
import ContactForm from "./ui/contact";
import Image007 from "./image/m9.jpeg";
import { LuLink } from "react-icons/lu";
import "./styles/styles.css";
import Copyright from "./ui/CopyRight";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="navbar">
        <nav className="nav flex justify-between items-center w-full p-5 fixed top-0 bg-white z-50">
          <div className="logo">
            <h1 className="font-logo text-[50px]">
              Component<span className="font-logotwo text-[50px]">X</span>
            </h1>
          </div>
          <MdOutlineMenu
            onClick={handleMenuToggle}
            className="cursor-pointer text-2xl md:mr-10"
          />
        </nav>
        <div className={`menu-container ${isMenuOpen ? "open" : ""}`}>
          <div className="links flex justify-center items-center flex-col gap-6 p-5">
            <span
              onClick={handleMenuToggle}
              className="cursor-pointer text-2xl text-white absolute top-20 right-10"
            >
              <RiCloseLargeLine />
            </span>
            <span
              onClick={() => {
                handleMenuToggle();
                scrollToSection("about");
              }}
              className="cursor-pointer text-5xl"
            >
              About
            </span>
            <Link to="/register">
              <span className="cursor-pointer text-5xl">Register</span>
            </Link>
            <Link to="/login">
              <span className="cursor-pointer text-5xl">Login</span>
            </Link>
            <Link to="/dashboard">
              <span className="cursor-pointer text-5xl">Dashboard</span>
            </Link>
            <span
              onClick={() => {
                handleMenuToggle();
                scrollToSection("contact");
              }}
              className="cursor-pointer text-5xl"
            >
              Contact
            </span>
          </div>
        </div>
      </div>

      <div className="hero flex gap-3 justify-center items-center h-[100vh] flex-col">
        <h1 className="font-bebas font-bold text-6xl">
          <span className="wave-letter">C</span>
          <span className="wave-letter">o</span>
          <span className="wave-letter">m</span>
          <span className="wave-letter">p</span>
          <span className="wave-letter">o</span>
          <span className="wave-letter">n</span>
          <span className="wave-letter">e</span>
          <span className="wave-letter">n</span>
          <span className="wave-letter">t</span>
          <span className="wave-letter">X</span>
        </h1>
        <p className="font-open text-[12px]">
          Information stock market insights and company detail
        </p>
      </div>

      <div
        className="about-us pb-7 flex flex-col justify-center items-center gap-7 lg:gap-0"
        id="about"
      >
        <div className="mission flex justify-center items-center gap-7 flex-col lg:flex-row max-w-[1200px] mx-auto my-0">
          <img src={Image002} alt="stock market" />
          <div className="text flex justify-center items-center gap-4 flex-col">
            <h1 className="font-bebas text-4xl uppercase">our mission</h1>
            <p className="font-open text-[14px] text-center">
              where we’re dedicated to providing you with the tools and insights
              you need to navigate the complexities of the stock market with
              confidence. Our mission is to empower investors of all levels with
              accurate, real-time information and cutting-edge analytical tools.
            </p>
          </div>
        </div>
        <div className="vission flex justify-center items-center gap-7 flex-col-reverse lg:flex-row max-w-[1200px] mx-auto my-0">
          <div className="text flex justify-center items-center gap-4 flex-col">
            <h1 className="font-bebas text-4xl uppercase">our vision</h1>
            <p className="font-open text-[14px] text-center">
              our vision is to revolutionize the way investors interact with the
              stock market. We aspire to be the leading platform for financial
              data and insights, empowering individuals and institutions to make
              smarter investment decisions through unparalleled accuracy,
              innovation, and user-centric design.
            </p>
          </div>
          <img src={Image003} alt="stock market" />
        </div>
      </div>

      <div className="reason flex justify-center mt-8 items-center gap-6 flex-col max-w-[1200px] mx-auto my-0 mb-6 h-auto sm:h-[100vh]">
        <div className="flex justify-center items-center gap-3 flex-col max-w-[800px] mx-auto my-0">
          <h1 className="text-center font-bebas text-3xl">
            Why Choose ComponentX?
          </h1>
          <p className="text-center font-open">
            Our platform offers live stock quotes, interactive charts, all
            designed to keep you informed and ahead of the curve. Whether you're
            a seasoned investor or just starting out, our advanced analytics and
            personalized dashboards provide the insights you need to make
            smarter investment decisions. Join our community and take advantage
            of enhance your trading strategy and achieve your financial goals.
          </p>
        </div>
        <div className="list flex justify-center items-center gap-3 flex-col md:flex-row">
          <div className="left flex justify-center items-center gap-3 flex-col">
            <ul className="flex justify-center items-center gap-3 flex-col">
              <li className="text-center">
                <strong>Real-Time Data</strong>: Stay ahead with live updates
                and accurate market information.
              </li>
              <li className="text-center">
                <strong>Customizable Experience</strong>: Personalize your
                trading environment to fit your needs.
              </li>
            </ul>
          </div>
          <div className="right flex justify-center items-center gap-3 flex-col">
            <ul className="flex justify-center items-center gap-3 flex-col">
              <li className="text-center">
                <strong>Educational Content</strong>: Expand your knowledge with
                our site.
              </li>
              <li className="text-center">
                <strong>User-Friendly Interface</strong>: Navigate effortlessly
                with our intuitive and sleek design.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="feature pb-5">
        <h1 className="font-bebas text-3xl text-center mt-10 mb-5">
          Some suggestions
        </h1>
        <div className="image flex justify-center items-center gap-3 max-w-[1200px] mx-auto my-0 flex-wrap">
          <div className="relative w-[300px] md:w-[560px]">
            <img
              src={Image004}
              alt="stock market data"
              className="w-full h-auto transition-opacity duration-300 ease-in-out hover:opacity-30"
            />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://en.wikipedia.org/wiki/The_Intelligent_Investor"
              className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out text-white text-xl"
            >
              <LuLink />
            </a>
          </div>
          <div className="relative w-[300px] md:w-[560px]">
            <img
              src={Image005}
              alt="stock market data"
              className="w-full h-auto transition-opacity duration-300 ease-in-out hover:opacity-30"
            />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://en.wikipedia.org/wiki/A_Random_Walk_Down_Wall_Street"
              className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out text-white text-xl"
            >
              <LuLink />
            </a>
          </div>
          <div className="relative w-[300px] md:w-[560px]">
            <img
              src={Image006}
              alt="stock market data"
              className="w-full h-auto transition-opacity duration-300 ease-in-out hover:opacity-30"
            />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://en.wikipedia.org/wiki/Security_Analysis_(book)"
              className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out text-white text-xl"
            >
              <LuLink />
            </a>
          </div>
          <div className="relative w-[300px] md:w-[560px]">
            <img
              src={Image007}
              alt="stock market data"
              className="w-full h-auto transition-opacity duration-300 ease-in-out hover:opacity-30"
            />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://books.google.co.in/books?id=AKwWNQjLQQ4C&printsec=frontcover&redir_esc=y#v=onepage&q&f=false"
              className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out text-white text-xl"
            >
              <LuLink />
            </a>
          </div>
        </div>
      </div>

      <section
        id="contact"
        className="contact flex justify-center mt-8 items-center gap-6 flex-col max-w-[1200px] mx-auto my-0"
      >
        <h2 className="font-bebas text-center text-3xl">Contact Us</h2>
        <p className="font-open text-center">
          If you have any questions, suggestions, or feedback, we'd love to hear
          from you. Reach out to us using the contact form below.
        </p>
        <ContactForm />
      </section>

      <Copyright />
    </>
  );
};

export default Home;
