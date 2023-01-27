import { IRetenueSdanf } from "@model/requete/IRetenueSdanf";
import { formatLigne, getLibelle } from "@util/Utils";
import React from "react";
import { IdentiteType } from "../../Types";
import { ItemLigne } from "../ItemLigne";
import { ItemLigneSdanf } from "../ItemLigneSdanf";

interface LigneNomPrenomFrancisationProps {
  identite: IdentiteType;
  retenueSdanf?: IRetenueSdanf;
}

export const LigneNomPrenomFrancisation: React.FC<
  LigneNomPrenomFrancisationProps
> = props => {
  return (
    <div className="itemLigneFrancisation">
      <span>{getLibelle("Francisation : ")}</span>
      <ItemLigneSdanf
        texteTitulaire={props.identite.noms.francisation}
        texteSdanf={props.retenueSdanf?.nomDemandeFrancisation}
        separateurVisible={false}
      />

      <ItemLigne
        texte={formatLigne(props.identite.prenoms.francisation)}
        separateur={";"}
      />
    </div>
  );
};
