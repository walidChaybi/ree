import ReportIcon from "@material-ui/icons/Report";
import React from "react";
import { TRequete } from "../../../../../model/requete/IRequete";
import { TitulaireRequete } from "../../../../../model/requete/ITitulaireRequete";
import { IRMCRequestRequete } from "../../../../../model/rmc/requete/IRMCRequestRequete";
import { getLibelle, valeurOuUndefined } from "../../../../common/util/Utils";

export interface ICriteresRMCAuto {
  criteres: IRMCRequestRequete[];
}

export function determinerCriteresRMCAuto(requete: TRequete): ICriteresRMCAuto {
  const criteresRMCAuto = {} as ICriteresRMCAuto;
  criteresRMCAuto.criteres = criteresRMCAutoMapper(requete?.titulaires);
  return criteresRMCAuto;
}

function criteresRMCAutoMapper(titulaires?: any): IRMCRequestRequete[] {
  return titulaires?.map((t: any) => {
    return {
      nomTitulaire: valeurOuUndefined(t?.nomNaissance),
      prenomTitulaire: valeurOuUndefined(TitulaireRequete.getPrenom1(t)),
      jourNaissance: valeurOuUndefined(t?.jourNaissance),
      moisNaissance: valeurOuUndefined(t?.moisNaissance),
      anneeNaissance: valeurOuUndefined(t?.anneeNaissance)
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
