import { IdentiteType } from "@model/requete/IdentiteType";
import { IRetenueSdanf } from "@model/requete/IRetenueSdanf";
import { getLibelle, ZERO } from "@util/Utils";
import React from "react";
import { auMoinsUnDesDeuxChampsEstRenseigne } from "../formatages";
import { ItemLigneSdanf } from "../items/ItemLigneSdanf";
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
        label={getLibelle(" Francisation :")}
      />

      <ItemLigneSdanf
        texteTitulaire={props.identite.noms.identification}
        texteSdanf={props.retenueSdanf?.nomDemandeIdentification}
        label={"Identification : "}
        separateurVisible={
          auMoinsUnDesDeuxChampsEstRenseigne(
            props.identite.noms.francisation,
            props.retenueSdanf?.nomDemandeFrancisation
          ) ||
          (props.identite.prenoms.francisation &&
            props.identite.prenoms.francisation?.length > ZERO)
        }
      />
    </div>
  );
};
