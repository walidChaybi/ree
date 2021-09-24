import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./scss/Icones.scss";

interface IconeMoinsProps {
  onClick?: (e: any) => void;
  title?: string;
}

export const IconeMoins: React.FC<IconeMoinsProps> = ({ onClick, title }) => {
  return (
    <FontAwesomeIcon
      icon={faMinusCircle}
      size="sm"
      className="IconeMoins"
      onClick={onClick}
      title={title}
    />
  );
};
