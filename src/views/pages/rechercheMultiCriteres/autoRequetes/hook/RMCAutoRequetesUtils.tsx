import ReportIcon from "@material-ui/icons/Report";
import React from "react";
import { TRequete } from "../../../../../model/requete/v2/IRequete";
import { IRMCRequestRequete } from "../../../../../model/rmc/requete/IRMCRequestRequete";
import { valeurOuUndefined } from "../../../../common/util/Utils";
import { getLibelle } from "../../../../common/widget/Text";

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
      prenomTitulaire: valeurOuUndefined(t?.prenoms?.[0]?.prenom),
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
