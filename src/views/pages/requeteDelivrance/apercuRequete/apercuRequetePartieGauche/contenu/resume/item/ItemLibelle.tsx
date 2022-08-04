import React from "react";
import { getLibelle } from "../../../../../../../common/util/Utils";

export const titreDetail = "Détails de requête";

interface ItemLibelleProps {
  libelle: string;
  data: any;
}

export const ItemLibelle: React.FC<ItemLibelleProps> = (props) => {
  return (
    <div className="panel">
      <span>{getLibelle(props.libelle)}</span>
      <span>{props.data}</span>
    </div>
  );
};
