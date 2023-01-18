import { getLibelle } from "@util/Utils";
import React from "react";

interface BoutonAttribuerRequeteProps {
  onClick: () => void;
}

export const BoutonAttribuerRequete: React.FC<
  BoutonAttribuerRequeteProps
> = props => {
  return <button onClick={props.onClick}>{getLibelle("Attribuer à")}</button>;
};
