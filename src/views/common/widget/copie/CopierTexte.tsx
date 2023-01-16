import { Tooltip } from "@mui/material";
import { getLibelle } from "@util/Utils";
import React, { useState } from "react";
import "./scss/CopierTexte.scss";

export interface CopierTexteProps {
  numero?: string;
  label?: string;
  separateur?: boolean;
}

const DUREE_AFFICHAGE_MESSAGE_EN_MILISEC = 1000;

export const CopierTexte: React.FC<CopierTexteProps> = ({
  separateur = true,
  ...props
}) => {
  const [messageCopier, setMessageCopier] = useState(false);

  const handleClick = (e: any) => {
    setMessageCopier(true);
    if (props.numero) {
      navigator.clipboard.writeText(props.numero);
    }
    e.stopPropagation();
    setTimeout(() => {
      setMessageCopier(false);
    }, DUREE_AFFICHAGE_MESSAGE_EN_MILISEC);
  };

  return (
    <div className="CopierTexte" title={props.numero}>
      <Tooltip
        className="copieMessage"
        open={messageCopier}
        title={getLibelle("Copier dans le presse papier")}
      >
        <span onClick={e => handleClick(e)}>
          {props.numero && separateur && ",  "}
          {props.label} {props.numero && `"n° " ${props.numero}`}
        </span>
      </Tooltip>
    </div>
  );
};
