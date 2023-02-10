import { IRetenueSdanf } from "@model/requete/IRetenueSdanf";
import React from "react";
import { DateCoordonneesType } from "../../../../../../../../model/requete/DateCoordonneesType";
import { formatageDateNaissanceRetenueSdanf } from "../../Formatages";
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
        separateurVisible={false}
      />

      <ItemLigneSdanf
        texteSdanf={props.retenueSdanf?.villeNaissance}
        texteTitulaire={props.naissance.ville}
        separateur=", "
      />

      <ItemLigneSdanf
        texteSdanf={props.retenueSdanf?.arrondissementNaissance}
        texteTitulaire={props.naissance.arrondissement}
        separateur=", "
      />

      <ItemLigneSdanf
        texteSdanf={props.retenueSdanf?.regionNaissance}
        texteTitulaire={props.naissance.region}
        separateur=", "
      />

      <ItemLigneSdanf
        separateurVisible={false}
        texteSdanf={
          props.retenueSdanf?.paysNaissance
            ? `(${props.retenueSdanf?.paysNaissance})`
            : undefined
        }
        texteTitulaire={
          props.naissance.pays ? `(${props.naissance.pays})` : undefined
        }
      />
    </div>
  );
};
