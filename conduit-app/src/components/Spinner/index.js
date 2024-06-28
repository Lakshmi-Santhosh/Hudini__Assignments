import React from "react";

export default function Spinner() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      width="200"
      height="200"
      style={{ shapeRendering: "auto", display: "block", background: "rgb(255, 255, 255)" }}
    >
      <circle
        strokeDasharray="56.548667764616276 20.84955592153876"
        r="12"
        strokeWidth="2"
        stroke="#5cb85c"
        fill="none"
        cy="50"
        cx="50"
      >
        <animateTransform
          keyTimes="0;1"
          values="0 50 50;360 50 50"
          dur="1s"
          repeatCount="indefinite"
          type="rotate"
          attributeName="transform"
        ></animateTransform>
      </circle>
    </svg>
  );
}
