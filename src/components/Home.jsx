import React from "react";
import { HoverEffect } from "./ui/card-hover-effect";

const timedTests = [
  {
    title: "1:00 Test",
    description: "1 Minute Typing Test",
    link: "/test/1-minute",
  },
  {
    title: "3:00 Test",
    description: "3 Minute Typing Test",
    link: "/test/3-minute",
  },
  {
    title: "5:00 Test",
    description: "5 Minute Typing Test",
    link: "/test/5-minute",
  },
];

const Home = () => {
  return (
    <div className="h-screen w-full flex justify-center bg-[url(/background-1.jpg)] bg-cover bg-center relative">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>

      {/* Content */}
      <div className="bg-transparent flex flex-col gap-4 p-24 mt-24 rounded-xl relative">
        <h1 className="text-6xl font-bold text-[#05375a] text-center">
          Typing Tests
        </h1>
        <HoverEffect items={timedTests} />
      </div>
    </div>
  );
};

export default Home;
