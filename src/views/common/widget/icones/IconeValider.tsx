import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./scss/Icones.scss";

interface IconeValiderProps {
  onClick?: (e: any) => void;
  title?: string;
}

export const IconeValider: React.FC<IconeValiderProps> = ({
  onClick,
  title
}) => {
  return (
    <FontAwesomeIcon
      icon={faCheckCircle}
      size="sm"
      className="IconeValider"
      onClick={onClick}
      title={title}
    />
  );
};
