import { TRequete } from "@model/requete/IRequete";
import { TitulaireRequete } from "@model/requete/ITitulaireRequete";
import {
  ICriteresRMCAutoRequete,
  IRMCRequestRequete
} from "@model/rmc/requete/IRMCRequestRequete";
import ReportIcon from "@mui/icons-material/Report";
import { getLibelle, getValeurOuUndefined } from "@util/Utils";
import React from "react";

export function determinerCriteresRMCAuto(
  requete: TRequete
): ICriteresRMCAutoRequete {
  const criteresRMCAuto = {} as ICriteresRMCAutoRequete;
  criteresRMCAuto.criteres = criteresRMCAutoMapper(requete?.titulaires);
  return criteresRMCAuto;
}

function criteresRMCAutoMapper(titulaires?: any): IRMCRequestRequete[] {
  return titulaires?.map((t: any) => {
    return {
      nomTitulaire: getValeurOuUndefined(t?.nomNaissance),
      prenomTitulaire: getValeurOuUndefined(TitulaireRequete.getPrenom1(t)),
      jourNaissance: getValeurOuUndefined(t?.jourNaissance),
      moisNaissance: getValeurOuUndefined(t?.moisNaissance),
      anneeNaissance: getValeurOuUndefined(t?.anneeNaissance)
    } as IRMCRequestRequete;
  });
}

export function getMessageZeroRequete(): JSX.Element {
  return (
    <>
      <ReportIcon />
      <div>{getLibelle("Aucune requête n'a été trouvée")}</div>
    </>
  );
}
