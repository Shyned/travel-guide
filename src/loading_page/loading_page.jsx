import React from "react";
import { CSSProperties } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import "./loading_page.css";

function loading_page() {
  return (
    <div id="Loading_page">
      <ClimbingBoxLoader color="#36d7b7" size={50} speedMultiplier={1} />
    </div>
  );
}

export default loading_page;
