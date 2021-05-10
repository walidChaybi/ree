import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./scss/Icones.scss";

interface IconePoubelleProps {
  onClick: (e: any) => void;
  title?: string;
}

export const IconePoubelle: React.FC<IconePoubelleProps> = ({
  onClick,
  title
}) => {
  return (
    <FontAwesomeIcon
      icon={faTrashAlt}
      size="sm"
      className="IconePoubelle"
      onClick={onClick}
      title={title}
    />
  );
};
