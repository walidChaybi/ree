import { IRetenueSdanf } from "@model/requete/IRetenueSdanf";
import { formatLigne, getLibelle } from "@util/Utils";
import React from "react";
import { IdentiteType } from "../../Types";
import { ItemLigne } from "../ItemLigne";
import { ItemLigneSdanf } from "../ItemLigneSdanf";

interface LigneFrancisationIdentificationProps {
  identite: IdentiteType;
  retenueSdanf?: IRetenueSdanf;
}

export const LigneFrancisationIdentification: React.FC<
  LigneFrancisationIdentificationProps
> = props => {
  return (
    <div className="itemLigneTitulaire">
      <ItemLigneSdanf
        texteTitulaire={props.identite.noms.francisation}
        texteSdanf={props.retenueSdanf?.nomDemandeFrancisation}
        label={getLibelle("Francisation : ")}
        separateurVisible={false}
      />

      <ItemLigne
        texte={formatLigne(props.identite.prenoms.francisation)}
        separateur={" ,"}
      />

      <ItemLigneSdanf
        texteTitulaire={props.identite.noms.identification}
        texteSdanf={props.retenueSdanf?.nomDemandeIdentification}
        label={getLibelle("Identification : ")}
        separateur={""}
      />
    </div>
  );
};
