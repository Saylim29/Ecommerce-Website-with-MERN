import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 px-4 md:px-0 flex items-center justify-center min-h-[60vh]">

      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-700 via-blue-400 to-indigo-500 opacity-95"></div>
      <div className="absolute top-10 left-10 w-40 h-40 bg-blue-300 rounded-full opacity-30 blur-2xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-400 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-2xl"></div>
      
      <div className="relative z-10 max-w-2xl mx-auto text-center card shadow-2xl bg-white/80 backdrop-blur-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-400 drop-shadow-lg">
          Welcome to PrimeGadgets
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-700 font-medium">
          Best deals on{" "}
          <span className="text-blue-600 font-bold">latest electronics</span> &amp;
          gadgets. <br />
          Shop smart, shop fast!
        </p>
        <Link to="/#products">
          <button className="btn btn-primary mt-8 px-8 py-3 text-lg rounded-full shadow-lg hover:scale-105 hover:bg-blue-700 transition-all duration-200">
             Shop Now
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
