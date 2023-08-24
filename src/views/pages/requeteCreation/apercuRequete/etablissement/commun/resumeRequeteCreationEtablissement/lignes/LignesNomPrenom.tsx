import { IRetenueSdanf } from "@model/requete/IRetenueSdanf";
import { IdentiteType } from "@model/requete/IdentiteType";
import { formatLigne } from "@util/Utils";
import React from "react";
import { ItemLigneSdanf } from "../items/ItemLigneSdanf";
import { formatagePrenoms } from "../mappingIRequeteCreationVersResumeRequeteCreationProps";

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
            ? `${props.retenueSdanf?.nomNaissance}`
            : undefined
        }
        texteTitulaire={
          props.identite.noms.naissance
            ? `${props.identite.noms.naissance}`
            : undefined
        }
      />

      <ItemLigneSdanf
        texteTitulaire={formatLigne(props.identite.prenoms.naissance)}
        texteSdanf={formatLigne(
          formatagePrenoms(props.retenueSdanf?.prenomsRetenu)
        )}
        separateurVisible={false}
      />
    </div>
  );
};
