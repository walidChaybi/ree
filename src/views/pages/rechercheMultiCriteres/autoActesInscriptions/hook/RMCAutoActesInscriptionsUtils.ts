import { StatutRequete } from "../../../../../model/requete/v2/enum/StatutRequete";
import { TRequete } from "../../../../../model/requete/v2/IRequete";
import {
  IRequeteTableau,
  ITitulaireRequeteTableau
} from "../../../../../model/requete/v2/IRequeteTableau";
import { ITitulaireRequete } from "../../../../../model/requete/v2/ITitulaireRequete";
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
  requete: IRequeteTableau,
  urlCourante: string,
  dataRMCAutoActe: any[],
  dataRMCAutoInscription: any[]
) {
  let url = "";

  if (urlCourante === URL_REQUETES_SERVICE_V2) {
    url = getUrlWithParam(
      URL_REQUETES_SERVICE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
      requete.idRequete
    );
  } else if (urlCourante === URL_RECHERCHE_REQUETE) {
    url = getUrlWithParam(
      URL_RECHERCHE_REQUETE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
      requete.idRequete
    );
  } else if (urlCourante === URL_MES_REQUETES_V2) {
    url = getUrlWithParam(
      URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
      requete.idRequete
    );
  } else if (receUrl.estUrlApercuRequete(urlCourante)) {
    url = getUrlApercuTraitement(urlCourante, requete);
  } else if (
    receUrl.estUrlApercuTraitementRequete(urlCourante) &&
    requete.statut &&
    StatutRequete.getEnumFromLibelle(requete.statut) ===
      StatutRequete.PRISE_EN_CHARGE
  ) {
    url = getUrlApercuTraitement(urlCourante, requete);
  }
  return url;
}

function getUrlApercuTraitement(urlCourante: string, requete: IRequeteTableau) {
  const urlPrecedente = getUrlPrecedente(urlCourante);
  return getUrlWithParam(
    `${urlPrecedente}/${PATH_APERCU_REQ_PRISE}/:idRequete`,
    requete.idRequete
  );
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
  requete: TRequete | IRequeteTableau
): ICriteresRMCAuto {
  const criteresRMCAuto = {} as ICriteresRMCAuto;
  criteresRMCAuto.criteres = criteresRMCAutoMapper(requete?.titulaires);
  return criteresRMCAuto;
}

function criteresRMCAutoMapper(
  titulaires?: (ITitulaireRequete | ITitulaireRequeteTableau)[]
): IRMCRequestActesInscriptions[] {
  return (
    titulaires?.map(
      (titulaire: ITitulaireRequete | ITitulaireRequeteTableau) => {
        return {
          nomTitulaire: getNomTitulaire(titulaire),
          prenomTitulaire: getPrenomTitulaire(titulaire),
          jourNaissance: valeurOuUndefined(titulaire?.jourNaissance),
          moisNaissance: valeurOuUndefined(titulaire?.moisNaissance),
          anneeNaissance: valeurOuUndefined(titulaire?.anneeNaissance)
        } as IRMCRequestActesInscriptions;
      }
    ) || []
  );
}

function getNomTitulaire(
  titulaire: ITitulaireRequete | ITitulaireRequeteTableau
): string {
  let nomTitulaire;
  /* titulaire de type ITitulaireRequete */
  if ("id" in titulaire) {
    nomTitulaire = valeurOuUndefined(titulaire?.nomNaissance);
  } else {
    /* titulaire de type ITitulaireRequeteTableau*/
    nomTitulaire = valeurOuUndefined(titulaire?.nom);
  }
  return nomTitulaire;
}

function getPrenomTitulaire(
  titulaire: ITitulaireRequeteTableau | ITitulaireRequete
): string {
  let prenomTitulaire;
  /* titulaire de type ITitulaireRequete */
  if ("id" in titulaire) {
    prenomTitulaire = valeurOuUndefined(titulaire?.prenoms?.[0]?.prenom);
  } else {
    /* titulaire de type ITitulaireRequeteTableau*/
    prenomTitulaire = valeurOuUndefined(titulaire?.prenoms?.[0]);
  }
  return prenomTitulaire;
}
