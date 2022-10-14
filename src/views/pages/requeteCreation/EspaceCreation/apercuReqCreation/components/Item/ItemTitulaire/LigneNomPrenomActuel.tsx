import { IRetenueSdanf } from "@model/requete/IRetenueSdanf";
import { getLibelle } from "@util/Utils";
import React from "react";
import { formatagePrenoms } from "../../../mappingIRequeteCreationVersResumeRequeteCreationProps";
import { formatLigne } from "../../Formatages";
import { IdentiteType } from "../../Types";
import { ItemLigne } from "../ItemLigne";
import { ItemLigneSdanf } from "../ItemLigneSdanf";

interface LigneNomPrenomActuelProps {
  identite: IdentiteType;
  retenueSdanf?: IRetenueSdanf;
  afficherNomActuel?: boolean;
  afficherNomUsage?: boolean;
}

export const LigneNomPrenomActuel: React.FC<LigneNomPrenomActuelProps> = ({
  afficherNomActuel = true,
  afficherNomUsage = true,
  ...props
}) => {
  return (
    <div className="itemLigneTitulaire">
      <ItemLigne texte={`${props.identite.noms.naissance} : `} />

      {afficherNomUsage && (
        <ItemLigneSdanf
          texteSdanf={
            props.retenueSdanf?.nomNaissance
              ? `(${getLibelle("Usage :")}${props.retenueSdanf?.nomNaissance})`
              : undefined
          }
          texteTitulaire={
            props.identite.noms.naissance
              ? `(${getLibelle("Usage :")}${props.identite.noms.naissance})`
              : undefined
          }
        />
      )}

      {afficherNomActuel && (
        <ItemLigneSdanf
          texteSdanf={
            props.retenueSdanf?.nomActuel
              ? `(${getLibelle("Actuel : ")}${props.retenueSdanf?.nomActuel})`
              : undefined
          }
          texteTitulaire={
            props.identite.noms.actuel
              ? `(${getLibelle("Actuel : ")}${props.identite.noms.actuel})`
              : undefined
          }
        />
      )}

      <ItemLigneSdanf
        texteTitulaire={formatLigne(props.identite.prenoms.naissance)}
        texteSdanf={formatLigne(
          formatagePrenoms(props.retenueSdanf?.prenomsRetenu)
        )}
      />

      <ItemLigne texte={props.identite.genre} />
    </div>
  );
};
