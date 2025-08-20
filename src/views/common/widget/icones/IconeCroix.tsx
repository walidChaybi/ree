import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import "./scss/Icones.scss";

interface IconeCroixProps {
  onClick?: (e: any) => void;
  title?: string;
}

export const IconeCroix: React.FC<IconeCroixProps> = ({ onClick, title }) => {
  return (
    <FaTimesCircle
      className="IconeCroix text-sm"
      onClick={onClick}
      title={title}
      aria-label={title}
    />
  );
};
