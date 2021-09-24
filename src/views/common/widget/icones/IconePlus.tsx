import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./scss/Icones.scss";

interface IconePlusProps {
  onClick?: (e: any) => void;
  title?: string;
}

export const IconePlus: React.FC<IconePlusProps> = ({ onClick, title }) => {
  return (
    <FontAwesomeIcon
      icon={faPlusCircle}
      size="sm"
      className="IconePlus"
      onClick={onClick}
      title={title}
    />
  );
};
