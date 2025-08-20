import React from "react";
import { FaMinusCircle } from "react-icons/fa";
import "./scss/Icones.scss";

interface IconeMoinsProps {
  onClick?: (e: any) => void;
  title?: string;
}

export const IconeMoins: React.FC<IconeMoinsProps> = ({ onClick, title }) => {
  return (
    <FaMinusCircle
      className="IconeMoins text-sm"
      onClick={onClick}
      title={title}
      aria-label={title}
    />
  );
};
