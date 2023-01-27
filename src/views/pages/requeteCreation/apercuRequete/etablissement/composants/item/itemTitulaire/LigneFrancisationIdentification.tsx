import { IRetenueSdanf } from "@model/requete/IRetenueSdanf";
import { getLibelle } from "@util/Utils";
import React from "react";
import { IdentiteType } from "../../Types";
import { ItemLigneSdanf } from "../ItemLigneSdanf";
import { LigneNomPrenomFrancisation } from "./LigneNomPrenomFrancisation";

interface LigneFrancisationIdentificationProps {
  identite: IdentiteType;
  retenueSdanf?: IRetenueSdanf;
}

export const LigneFrancisationIdentification: React.FC<
  LigneFrancisationIdentificationProps
> = props => {
  return (
    <div className="itemLigneTitulaire">
      <LigneNomPrenomFrancisation
        identite={props.identite}
        retenueSdanf={props.retenueSdanf}
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
