import React from 'react';

const EnvelopeIcon = ({ width, height, style, color }) => (
  <svg
    width={width}
    height={height}
    fill={color}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    x="0px"
    y="0px"
    viewBox="0 0 32 40"
    enableBackground="new 0 0 32 32"
    xml="preserve"
  >
    <g>
      <g>
        <path
          fill="#000000"
          d="M30.5,26h-29c-0.4,0-0.8-0.3-0.8-0.8V6.7C0.8,6.3,1.1,6,1.5,6h29c0.4,0,0.8,0.3,0.8,0.8v18.5    C31.3,25.7,30.9,26,30.5,26z M2.3,24.5h27.5v-17H2.3V24.5z"
        />
      </g>
      <g>
        <rect
          x="18.1"
          y="19.7"
          transform="matrix(0.7379 0.6749 -0.6749 0.7379 20.4289 -11.6776)"
          fill="#000000"
          width="14.2"
          height="1.5"
        />
      </g>
      <g>
        <rect
          x="6"
          y="13.3"
          transform="matrix(0.675 0.7378 -0.7378 0.675 17.2912 1.6694)"
          fill="#000000"
          width="1.5"
          height="14.2"
        />
      </g>
      <g>
        <path
          fill="#000000"
          d="M16,19.8c-0.2,0-0.3-0.1-0.5-0.2L1.1,7.3C0.8,7.1,0.7,6.8,0.8,6.5C0.9,6.2,1.2,6,1.5,6h28.9    c0.3,0,0.6,0.2,0.7,0.5c0.1,0.3,0,0.6-0.2,0.8L16.5,19.6C16.3,19.8,16.2,19.8,16,19.8z M3.6,7.5L16,18.1L28.4,7.5L3.6,7.5z"
        />
      </g>
    </g>
  </svg>
);
export default EnvelopeIcon;
