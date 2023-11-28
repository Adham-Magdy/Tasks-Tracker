import React from "react";

interface ButtonProps {
  color: string;
  text: string;
  onClick: () => void;
}
const Button = ({ color, text, onClick }: any) => {
  return (
    <button
      onClick={onClick}
      className="btn"
      style={{ backgroundColor: color }}
    >
      {text}
    </button>
  );
};

export default Button;
