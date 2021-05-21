import { IRequeteTableau } from "../../../../../model/requete/v2/IRequeteTableau";
import { IRMCRequestRequete } from "../../../../../model/rmc/requete/IRMCRequestRequete";
import { getUrlWithParam } from "../../../../common/util/route/routeUtil";
import { valeurOuUndefined } from "../../../../common/util/Utils";
import {
  URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_V2,
  URL_REQUETES_SERVICE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_REQUETES_SERVICE_V2
} from "../../../../router/ReceUrls";

export interface ICriteresRMCAuto {
  criteres: IRMCRequestRequete[];
}

export function redirectionRMCAuto(
  idRequete: string,
  urlWithParam: string,
  dataRMCAutoActe: any[],
  dataRMCAutoInscription: any[]
) {
  let url = "";

  if (urlWithParam === URL_MES_REQUETES_V2) {
    url = getUrlWithParam(
      URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
      idRequete
    );
  } else if (urlWithParam === URL_REQUETES_SERVICE_V2) {
    url = getUrlWithParam(
      URL_REQUETES_SERVICE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
      idRequete
    );
  }
  return url;
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
      critere.prenomTitulaire = valeurOuUndefined(t?.prenoms[0]);
      critere.jourNaissance = valeurOuUndefined(t?.jourNaissance);
      critere.moisNaissance = valeurOuUndefined(t?.moisNaissance);
      critere.anneeNaissance = valeurOuUndefined(t?.anneeNaissance);
      titulairesRMCAuto.push(critere);
    });
  }

  return titulairesRMCAuto;
}
