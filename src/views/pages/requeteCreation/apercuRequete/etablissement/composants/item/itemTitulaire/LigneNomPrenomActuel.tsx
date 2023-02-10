import { IdentiteType } from "@model/requete/IdentiteType";
import { IRetenueSdanf } from "@model/requete/IRetenueSdanf";
import { formatLigne, getLibelle } from "@util/Utils";
import React from "react";
import { formatagePrenoms } from "../../../mappingIRequeteCreationVersResumeRequeteCreationProps";
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
      <ItemLigneSdanf
        separateur={""}
        texteSdanf={
          props.retenueSdanf?.nomNaissance
            ? `${props.retenueSdanf?.nomNaissance}${getLibelle(" : ")}`
            : undefined
        }
        texteTitulaire={
          props.identite.noms.naissance
            ? `${props.identite.noms.naissance}${getLibelle(" : ")}`
            : undefined
        }
      />

      {afficherNomUsage && (
        <ItemLigneSdanf
          texteSdanf={
            props.retenueSdanf?.nomUsage
              ? `(${getLibelle("Usage :")}${props.retenueSdanf?.nomUsage})`
              : undefined
          }
          texteTitulaire={
            props.identite.noms.usage
              ? `(${getLibelle("Usage :")}${props.identite.noms.usage})`
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

      <ItemLigne texte={props.identite.genre?.libelle} />
    </div>
  );
};
