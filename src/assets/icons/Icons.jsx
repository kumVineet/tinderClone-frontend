import React from 'react';

const PassKeyIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" width="64" height="64" fill="white">
    <path d="M50.5,0 C60,20 45,30 45,45 C45,50 50,55 55,60 C60,65 65,70 65,80 C65,90 60,100 50,100 C40,100 30,90 30,75 C30,60 45,45 30,25 C15,40 5,60 5,80 C5,102 23,120 50,120 C77,120 95,102 95,80 C95,45 70,25 50.5,0 Z" />
  </svg>
);

const UserIcon = (props) => (
  <svg
    className="h-[1em] opacity-50"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="white"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </g>
  </svg>
);

export const EyeIcon = (props) => (
  <svg
    className={`w-5 h-5 ${props.className || ''}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

export const EyeOffIcon = (props) => (
  <svg
    className={`w-5 h-5 ${props.className || ''}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a10.05 10.05 0 012.44-3.87m2.6-2.13A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.978 9.978 0 01-4.21 5.147M15 12a3 3 0 00-3-3"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
  </svg>
);

export { PassKeyIcon, UserIcon };
