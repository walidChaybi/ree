import { IRequeteTableau } from "../../../../../model/requete/v2/IRequeteTableau";
import { IRMCRequestActesInscriptions } from "../../../../../model/rmc/acteInscription/envoi/IRMCRequestActesInscriptions";
import {
  getUrlPrecedente,
  getUrlWithParam
} from "../../../../common/util/route/routeUtil";
import { valeurOuUndefined } from "../../../../common/util/Utils";
import {
  PATH_APERCU_REQ_PRISE,
  receUrl,
  URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_ID,
  URL_MES_REQUETES_V2,
  URL_RECHERCHE_REQUETE,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_TRAITEMENT_ID,
  URL_REQUETES_SERVICE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_REQUETES_SERVICE_APERCU_REQUETE_TRAITEMENT_ID,
  URL_REQUETES_SERVICE_V2
} from "../../../../router/ReceUrls";

export interface ICriteresRMCAuto {
  criteres: IRMCRequestActesInscriptions[];
}

export function redirectionRMCAuto(
  idRequete: string,
  urlCourante: string,
  dataRMCAutoActe: any[],
  dataRMCAutoInscription: any[]
) {
  let url = "";

  if (urlCourante === URL_REQUETES_SERVICE_V2) {
    url = getUrlWithParam(
      URL_REQUETES_SERVICE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
      idRequete
    );
  } else if (urlCourante === URL_RECHERCHE_REQUETE) {
    url = getUrlWithParam(
      URL_RECHERCHE_REQUETE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
      idRequete
    );
  } else if (urlCourante === URL_MES_REQUETES_V2) {
    url = getUrlWithParam(
      URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
      idRequete
    );
  } else if (receUrl.estUrlApercuRequete(urlCourante)) {
    const urlPrecedente = getUrlPrecedente(urlCourante);
    url = getUrlWithParam(
      `${urlPrecedente}/${PATH_APERCU_REQ_PRISE}/:idRequete`,
      idRequete
    );
  }
  return url;
}

export function redirectionRMCAutoApercuTraitement(
  idRequete: string,
  urlCourante: string
) {
  let url = "";
  if (urlCourante === URL_MES_REQUETES_V2) {
    url = getUrlWithParam(
      URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_ID,
      idRequete
    );
  } else if (urlCourante === URL_REQUETES_SERVICE_V2) {
    url = getUrlWithParam(
      URL_REQUETES_SERVICE_APERCU_REQUETE_TRAITEMENT_ID,
      idRequete
    );
  } else if (urlCourante === URL_RECHERCHE_REQUETE) {
    url = getUrlWithParam(
      URL_RECHERCHE_REQUETE_APERCU_REQUETE_TRAITEMENT_ID,
      idRequete
    );
  } else if (receUrl.estUrlApercuRequete(urlCourante)) {
    url = receUrl.getUrlApercuTraitementAPartirDe(urlCourante);
  }
  return url;
}

export function determinerCriteresRMCAuto(
  requete: IRequeteTableau,
  data: IRequeteTableau[]
): ICriteresRMCAuto {
  const criteresRMCAuto = {} as ICriteresRMCAuto;

  criteresRMCAuto.criteres = criteresRMCAutoMapper(requete?.titulaires);

  return criteresRMCAuto;
}

function criteresRMCAutoMapper(
  titulaires?: any
): IRMCRequestActesInscriptions[] {
  const titulairesRMCAuto: IRMCRequestActesInscriptions[] = [];
  if (titulaires) {
    titulaires.forEach((t: any) => {
      const critere = {} as IRMCRequestActesInscriptions;
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
