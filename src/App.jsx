import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import TypingTest from "./components/TypingTest";
import Home from "./components/Home";
import Result from "./components/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test/:type" element={<TypingTest />} />
        <Route path="/result/:type/:wpm/:accuracy" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
