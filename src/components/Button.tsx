"use client";

import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  position: "left" | "right";
}

const Button: React.FC<ButtonProps> = ({ onClick, children, position }) => {
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center bg-[#7a2e0e] text-white rounded-full shadow-lg transition ${position === "left" ? "left-8" : "right-8"}`}
    >
      {children}
    </button>
  );
};

export default Button;
