import { IRetenueSdanf } from "@model/requete/IRetenueSdanf";
import { IdentiteType } from "@model/requete/IdentiteType";
import { formatLigne } from "@util/Utils";
import React from "react";
import { auMoinsUnDesDeuxChampsEstRenseigne } from "../formatages";
import { ItemLigne } from "../items/ItemLigne";
import { ItemLigneSdanf } from "../items/ItemLigneSdanf";
interface LigneNomPrenomFrancisationProps {
  identite: IdentiteType;
  retenueSdanf?: IRetenueSdanf;
  label?: string;
}

export const LigneNomPrenomFrancisation: React.FC<
  LigneNomPrenomFrancisationProps
> = props => {
  return auMoinsUnDesDeuxChampsEstRenseigne(
    props.identite.noms.francisation,
    props.retenueSdanf?.nomDemandeFrancisation
  ) || props.identite.prenoms.francisation?.length ? (
    <div className="itemLigneFrancisation">
      <span>{props.label}</span>
      <ItemLigneSdanf
        texteTitulaire={props.identite.noms.francisation}
        texteSdanf={props.retenueSdanf?.nomDemandeFrancisation}
        separateurVisible={false}
      />

      <ItemLigne
        texte={formatLigne(props.identite.prenoms.francisation)}
        separateur={" "}
        separateurFin={false}
        separateurDebut={auMoinsUnDesDeuxChampsEstRenseigne(
          props.identite.noms.francisation,
          props.retenueSdanf?.nomDemandeFrancisation
        )}
      />
    </div>
  ) : (
    <></>
  );
};
