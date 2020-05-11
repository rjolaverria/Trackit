import React from 'react';

const Loading = ({ size }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      version='1.0'
      width={`${size}px`}
      height={`${size}px`}
      viewBox='0 0 128 128'
    >
      <g>
        <path
          d='M32 119.43A64 64 0 1 1 119.43 96 64 64 0 0 1 32 119.43zM54.58 14.9a50 50 0 0 0-38.05 64.8l19.04-7.95 2.37 4.12 10.25-5.92L44.73 64l9.63-16.67H62V35.5h-4.75zM89 20.7a49.95 49.95 0 0 0-14.85-5.67L71.5 35.5h-4.75v11.83h6.88L83.25 64l-3.8 6.6 10.23 5.9 2.38-4.1 19.18 8A50 50 0 0 0 89 20.7zm12.33 76.58l-16.4-12.53 2.38-4.12-10.23-5.9-3.43 5.94H54.38l-3.82-6.6-10.24 5.9 2.37 4.13-16.54 12.62a50.04 50.04 0 0 0 75.16.56z'
          fill='#f04a4a'
          fillOpacity='0.6'
        />
        <animateTransform
          attributeName='transform'
          type='rotate'
          values='0 64 64;120 64 64;0 64 64'
          dur='1980ms'
          repeatCount='indefinite'
        ></animateTransform>
      </g>
    </svg>
  );
};

export default Loading;
