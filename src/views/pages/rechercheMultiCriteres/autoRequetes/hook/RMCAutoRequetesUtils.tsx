import ReportIcon from "@material-ui/icons/Report";
import React from "react";
import { IRequeteTableau } from "../../../../../model/requete/v2/IRequeteTableau";
import { IRMCRequestRequete } from "../../../../../model/rmc/requete/IRMCRequestRequete";
import { valeurOuUndefined } from "../../../../common/util/Utils";
import { getLibelle } from "../../../../common/widget/Text";

export interface ICriteresRMCAuto {
  criteres: IRMCRequestRequete[];
}

export function determinerCriteresRMCAuto(
  idRequete: string,
  data: IRequeteTableau[]
): ICriteresRMCAuto {
  const criteresRMCAuto = {} as ICriteresRMCAuto;
  const requete = data?.find(r => r.idRequete === idRequete);
  criteresRMCAuto.criteres = criteresRMCAutoMapper(requete?.titulaires);
  return criteresRMCAuto;
}

function criteresRMCAutoMapper(titulaires?: any): IRMCRequestRequete[] {
  const titulairesRMCAuto: IRMCRequestRequete[] = [];
  if (titulaires) {
    titulaires.forEach((t: any) => {
      const critere = {} as IRMCRequestRequete;
      critere.nomTitulaire = valeurOuUndefined(t?.nom);
      critere.prenomTitulaire = valeurOuUndefined(t?.prenoms?.[0]);
      critere.jourNaissance = valeurOuUndefined(t?.jourNaissance);
      critere.moisNaissance = valeurOuUndefined(t?.moisNaissance);
      critere.anneeNaissance = valeurOuUndefined(t?.anneeNaissance);
      titulairesRMCAuto.push(critere);
    });
  }
  return titulairesRMCAuto;
}

export function getMessageZeroRequete(): JSX.Element {
  return (
    <>
      <ReportIcon />
      <div>{getLibelle("Aucune requête n'a été trouvée")}</div>
    </>
  );
}

export function goToLinkRMCAuto(link: string): string {
  let range = "";
  if (link.indexOf("range") > 0) {
    let params = [];
    params = link.split("rmcauto?")[1].split("&");
    range = params[0].split("=")[1];
  }
  return range;
}
