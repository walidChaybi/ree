import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import "./scss/Icones.scss";

interface IconePlusProps {
  onClick?: (e: any) => void;
  title?: string;
  className?: string;
}

export const IconePlus: React.FC<IconePlusProps> = ({ onClick, title, className }) => {
  return (
    <FaPlusCircle
      className={`IconePlus ${className}`}
      onClick={onClick}
      title={title}
      aria-label={title}
    />
  );
};
