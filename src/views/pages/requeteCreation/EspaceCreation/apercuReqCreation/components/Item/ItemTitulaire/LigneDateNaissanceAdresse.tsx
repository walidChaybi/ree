import { IRetenueSdanf } from "@model/requete/IRetenueSdanf";
import React from "react";
import { formatageDateNaissanceRetenueSdanf } from "../../Formatages";
import { DateCoordonneesType } from "../../Types";
import { ItemLigneSdanf } from "../ItemLigneSdanf";

interface LigneDateNaissanceAdresseProps {
  naissance: DateCoordonneesType;
  retenueSdanf?: IRetenueSdanf;
}

export const LigneDateNaissanceAdresse: React.FC<
  LigneDateNaissanceAdresseProps
> = props => {
  const dataNaissanceTitulaireRetenueSdanf = formatageDateNaissanceRetenueSdanf(
    props.retenueSdanf?.jourNaissance?.toString(),
    props.retenueSdanf?.moisNaissance?.toString(),
    props.retenueSdanf?.anneeNaissance?.toString()
  );

  const dateNaissanceTitulaire = formatageDateNaissanceRetenueSdanf(
    props.naissance.jour?.toString(),
    props.naissance.mois?.toString(),
    props.naissance.annee?.toString()
  );

  return (
    <div className="itemLigneTitulaire">
      <ItemLigneSdanf
        texteSdanf={dataNaissanceTitulaireRetenueSdanf}
        texteTitulaire={dateNaissanceTitulaire}
        separateur={", "}
      />

      <ItemLigneSdanf
        texteSdanf={props.retenueSdanf?.villeNaissance}
        texteTitulaire={props.naissance.ville}
      />

      <ItemLigneSdanf
        texteSdanf={props.retenueSdanf?.arrondissementNaissance}
        texteTitulaire={props.naissance.arrondissement}
      />

      <ItemLigneSdanf
        texteSdanf={props.retenueSdanf?.regionNaissance}
        texteTitulaire={props.naissance.region}
      />

      <ItemLigneSdanf
        texteSdanf={`(${props.retenueSdanf?.paysNaissance})`}
        texteTitulaire={`(${props.naissance.pays})`}
      />
    </div>
  );
};
