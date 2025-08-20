import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import "./scss/Icones.scss";

interface IconePoubelleProps {
  onClick?: (e: any) => void;
  title?: string;
}

export const IconePoubelle: React.FC<IconePoubelleProps> = ({ onClick, title }) => {
  return (
    <FaTrashAlt
      className="IconePoubelle text-sm"
      onClick={onClick}
      title={title}
      aria-label={title}
    />
  );
};
