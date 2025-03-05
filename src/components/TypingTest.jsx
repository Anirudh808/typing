import React, { useEffect, useReducer, useRef, useState } from "react";
import Timer from "./Timer";
import { useNavigate, useParams } from "react-router-dom";
import { fiveMinuteTest, oneMinuteTest, threeMinuteTest } from "../lib/data";

// Normalize character to handle special cases like curly apostrophes
const normalizeChar = (char) => (char === "’" ? "'" : char);

// Initial state for reducer
const initialState = {
  curIndex: 0,
  typedChars: [],
  correctChars: 0,
  wrongChars: 0,
  hasStarted: false,
};

// Reducer function to handle typing logic
function reducer(state, action) {
  switch (action.type) {
    case "TYPE_CHAR": {
      const { key, expectedChar } = action.payload;
      const isCorrect = normalizeChar(key) === normalizeChar(expectedChar);

      return {
        ...state,
        typedChars: [...state.typedChars, { char: key, isCorrect }],
        curIndex: state.curIndex + 1,
        correctChars: state.correctChars + (isCorrect ? 1 : 0),
        wrongChars: state.wrongChars + (!isCorrect ? 1 : 0),
        hasStarted: true,
      };
    }

    case "BACKSPACE":
      if (state.curIndex === 0) return state;

      return {
        ...state,
        typedChars: state.typedChars.slice(0, -1),
        curIndex: state.curIndex - 1,
      };

    default:
      return state;
  }
}

let initialTime = 0;

function TypingTest() {
  const params = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [timeLeft, setTimeLeft] = useState(params.type);
  const navigate = useNavigate();
  const [textData, setTextData] = useState("");

  const textContainerRef = useRef(null);

  useEffect(() => {
    if (params.type.includes("minute")) {
      const minute = params.type.split("-")[0];
      const randomNumber = Math.floor(Math.random() * 3);
      initialTime = Number(minute) * 60;
      if (minute === "1") setTextData(oneMinuteTest[randomNumber]);
      if (minute === "3") setTextData(threeMinuteTest[randomNumber]);
      if (minute === "5") setTextData(fiveMinuteTest[randomNumber]);
      console.log(Number(minute));
      setTimeLeft(60 * Number(minute));
    }
  }, [params.type]);

  useEffect(() => {
    if (textContainerRef.current) {
      const activeElement =
        textContainerRef.current.querySelector(".active-char");
      if (activeElement) {
        const container = textContainerRef.current;
        const { top, bottom } = activeElement.getBoundingClientRect();
        const { top: containerTop, bottom: containerBottom } =
          container.getBoundingClientRect();

        // Scroll only if the active character is out of view
        if (top < containerTop || bottom > containerBottom) {
          activeElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }
  }, [state.curIndex]); // Runs only when the cursor moves forward

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (timeLeft === 0) return;

      if (event.key.length === 1 && state.curIndex < textData.length) {
        dispatch({
          type: "TYPE_CHAR",
          payload: { key: event.key, expectedChar: textData[state.curIndex] },
        });
      } else if (event.key === "Backspace") {
        dispatch({ type: "BACKSPACE" });
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [state.curIndex, textData, timeLeft]);

  // Calculate WPM based on 5 characters = 1 word
  const wordsTyped = Math.floor(state.correctChars / 5);
  const WPM = Math.ceil((wordsTyped / initialTime) * 60);

  // Accuracy Calculation
  const accuracy =
    state.correctChars + state.wrongChars > 0
      ? (
          (state.correctChars / (state.correctChars + state.wrongChars)) *
          100
        ).toFixed(2)
      : 100;

  useEffect(() => {
    if (timeLeft === 0) {
      navigate(`/result/${params.type}/${WPM}/${accuracy}`);
    }
  }, [WPM, accuracy, navigate, params.type, timeLeft]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#f7f7f7] py-20 px-10 space-y-10">
      <h1 className="text-6xl font-semibold text-[#3295DB] text-center">
        Welcome to Typist
      </h1>
      <Timer
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        hasStarted={state.hasStarted}
      />
      <div
        ref={textContainerRef}
        className="h-4/5 w-5/6 bg-white rounded-2xl p-10 overflow-y-auto text-4xl leading-loose text-gray-500 font-mono shadow-lg"
      >
        {textData.split("").map((char, i) => (
          <span
            key={i}
            className={`px-1 py-1 mx-0.5 rounded 
            ${
              i < state.curIndex
                ? state.typedChars[i]?.isCorrect
                  ? "bg-green-100 text-green-500"
                  : "bg-red-200 text-red-600"
                : ""
            } 
            ${
              i === state.curIndex
                ? "border-b-4 border-purple-400 animate-blink text-purple-400 active-char"
                : ""
            }
          `}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}

export default TypingTest;
