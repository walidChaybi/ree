import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./scss/Icones.scss";

interface IconeFichierProps {
  onClick?: (e: any) => void;
  title?: string;
  size?: SizeProp;
}

export const IconeFichier: React.FC<IconeFichierProps> = ({
  onClick,
  title,
  size
}) => {
  return (
    <FontAwesomeIcon
      icon={faFileCirclePlus}
      size={size ? size : "sm"}
      className="faFileCirclePlus"
      onClick={onClick}
      title={title}
    />
  );
};
