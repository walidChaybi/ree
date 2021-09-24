import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./scss/Icones.scss";

interface IconeDangerProps {
  onClick?: (e: any) => void;
  title?: string;
}

export const IconeDanger: React.FC<IconeDangerProps> = ({ onClick, title }) => {
  return (
    <FontAwesomeIcon
      icon={faExclamationTriangle}
      size="sm"
      className="IconeDanger"
      onClick={onClick}
      title={title}
    />
  );
};
