import { IRetenueSdanf } from "@model/requete/IRetenueSdanf";
import { formatLigne, getLibelle } from "@util/Utils";
import React from "react";
import { formatagePrenoms } from "../../../mappingIRequeteCreationVersResumeRequeteCreationProps";
import { IdentiteType } from "../../Types";
import { ItemLigneSdanf } from "../ItemLigneSdanf";

interface LigneNomPrenomsProps {
  identite: IdentiteType;
  retenueSdanf?: IRetenueSdanf;
}

export const LignesNomPrenoms: React.FC<LigneNomPrenomsProps> = props => {
  return (
    <div>
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

      <ItemLigneSdanf
        texteTitulaire={formatLigne(props.identite.prenoms.naissance)}
        texteSdanf={formatLigne(
          formatagePrenoms(props.retenueSdanf?.prenomsRetenu)
        )}
      />
    </div>
  );
};
