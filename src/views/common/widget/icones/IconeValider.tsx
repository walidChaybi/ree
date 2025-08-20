import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import "./scss/Icones.scss";

interface IconeValiderProps {
  onClick?: (e: any) => void;
  title?: string;
}

export const IconeValider: React.FC<IconeValiderProps> = ({ onClick, title }) => {
  return (
    <FaCheckCircle
      className="IconeValider text-sm"
      onClick={onClick}
      title={title}
      aria-label={title}
    />
  );
};
