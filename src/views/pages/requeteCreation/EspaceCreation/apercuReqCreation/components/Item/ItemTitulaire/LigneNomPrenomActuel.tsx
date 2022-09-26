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
}

export const LigneNomPrenomActuel: React.FC<LigneNomPrenomActuelProps> = ({
  afficherNomActuel = true,
  ...props
}) => {
  return (
    <div className="itemLigneTitulaire">
      <ItemLigneSdanf
        texteSdanf={`(${getLibelle("Usage :")}${
          props.retenueSdanf?.nomNaissance
        })`}
        texteTitulaire={props.identite.noms.naissance}
      />

      {afficherNomActuel && (
        <ItemLigneSdanf
          texteSdanf={`(${getLibelle("Actuel : ")}${
            props.retenueSdanf?.nomActuel
          })`}
          texteTitulaire={`(${getLibelle("Actuel : ")}${
            props.identite.noms.actuel
          })`}
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
