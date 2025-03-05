import React from "react";
import { FlipWords } from "./ui/flip-words";
import { Link, useParams } from "react-router-dom";

const Result = () => {
  const { type, wpm, accuracy } = useParams();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#f7f7f7] py-20 px-10 space-y-10">
      <div>
        <FlipWords
          words={["Your Results"]}
          duration={99999999}
          className={"text-6xl font-semibold text-[#3295DB] text-center"}
        />
        <div className="text-center text-4xl space-y-4 mt-8">
          <h2>
            WPM: <FlipWords words={[wpm]} duration={99999999} />
          </h2>
          <h2>
            Accuracy: <FlipWords words={[accuracy + "%"]} duration={99999999} />
          </h2>
        </div>
        <div className="mt-14 flex items-center justify-between">
          <Link
            to="/"
            className="px-6 py-3 bg-blue-100 rounded-md hover:bg-blue-300 cursor-pointer shadow-md hover:shadow-xl active:scale-95 active:bg-blue-400 transition-all duration-300 text-xl font-semibold text-blue-900"
          >
            🏠 Home
          </Link>
          <Link
            to={`/test/${type}`}
            className="px-6 py-3 bg-blue-100 rounded-md hover:bg-blue-300 cursor-pointer shadow-md hover:shadow-xl active:scale-95 active:bg-blue-400 transition-all duration-200 text-xl font-semibold text-blue-900"
          >
            🔃 Restart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Result;
