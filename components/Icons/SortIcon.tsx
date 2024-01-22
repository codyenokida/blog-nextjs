import React from "react";

export default function SortIcon({ className }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox="0 0 256 256"
      className={className}
    >
      <g
        style={{
          stroke: "none",
          strokeWidth: 0,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeMiterlimit: 10,
          fill: "none",
          fillRule: "nonzero",
          opacity: 1,
        }}
      >
        <path
          d="M88 21.078H33.078a2 2 0 0 1 0-4H88a2 2 0 0 1 0 4zM74.707 38.359H33.078a2 2 0 0 1 0-4h41.629a2 2 0 0 1 0 4zM61.413 55.641H33.078a2 2 0 0 1 0-4h28.335a2 2 0 0 1 0 4zM48.12 72.922H33.078a2 2 0 0 1 0-4H48.12a2 2 0 0 1 0 4zM10.835 72.922a2 2 0 0 1-2-2V19.078a2 2 0 0 1 4 0v51.844a2 2 0 0 1-2 2z"
          style={{
            stroke: "none",
            strokeWidth: 1,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeMiterlimit: 10,
            fillRule: "nonzero",
            opacity: 1,
          }}
          transform="matrix(2.81 0 0 2.81 1.407 1.407)"
        />
        <path
          d="M10.835 72.922a1.99 1.99 0 0 1-1.414-.586L.586 63.501a2 2 0 1 1 2.828-2.828l7.421 7.421 7.421-7.421a2 2 0 1 1 2.828 2.828l-8.835 8.835a1.99 1.99 0 0 1-1.414.586z"
          className="sort"
          style={{
            stroke: "none",
            strokeWidth: 1,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeMiterlimit: 10,
            fillRule: "nonzero",
            opacity: 1,
          }}
          transform="matrix(2.81 0 0 2.81 1.407 1.407)"
        />
      </g>
    </svg>
  );
}
