import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import "./scss/Icones.scss";

interface IconeCroixProps {
  onClick: (e: any) => void;
  title?: string;
}

export const IconeCroix: React.FC<IconeCroixProps> = ({ onClick, title }) => {
  return (
    <FontAwesomeIcon
      icon={faTimesCircle}
      size="xs"
      className="IconeCroix"
      onClick={onClick}
      title={title}
    />
  );
};
