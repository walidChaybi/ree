import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import "./scss/Icones.scss";

interface IconeDangerProps {
  onClick?: (e: any) => void;
  title?: string;
}

export const IconeDanger: React.FC<IconeDangerProps> = ({ onClick, title }) => {
  return (
    <FaExclamationTriangle
      className="IconeDanger text-sm"
      onClick={onClick}
      title={title}
      aria-label={title}
    />
  );
};
