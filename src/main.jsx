import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Adjust the path as needed
import "./index.css";
import ClickSpark from "./components/Animations/ClickSpark/ClickSpark";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClickSpark>
      <App />
    </ClickSpark>
  </React.StrictMode>
);
