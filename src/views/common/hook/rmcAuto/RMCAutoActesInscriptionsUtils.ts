import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TRequete } from "@model/requete/IRequete";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import {
  ITitulaireRequete,
  TitulaireRequete
} from "@model/requete/ITitulaireRequete";
import { ITitulaireRequeteTableau } from "@model/requete/ITitulaireRequeteTableau";
import {
  ICriteresRMCAutoActeInscription,
  IRMCRequestActesInscriptions
} from "@model/rmc/acteInscription/envoi/IRMCRequestActesInscriptions";
import {
  PATH_APERCU_REQ_PRISE,
  PATH_APERCU_REQ_TRAITEMENT,
  receUrl,
  URL_MES_REQUETES_DELIVRANCE,
  URL_RECHERCHE_REQUETE,
  URL_REQUETES_DELIVRANCE_SERVICE
} from "@router/ReceUrls";
import { getUrlPrecedente, getUrlWithParam } from "@util/route/UrlUtil";
import { getValeurOuUndefined } from "@util/Utils";

export function redirectionRMCAuto(
  requete: IRequeteTableauDelivrance,
  urlCourante: string
) {
  let url = "";
  if (estUrlEspaceDelivranceOuRMCRequete(urlCourante)) {
    url = getUrlWithParam(
      `${urlCourante}/${PATH_APERCU_REQ_PRISE}/:idRequete`,
      requete.idRequete
    );
  } else if (receUrl.estUrlSaisirCourrier(urlCourante)) {
    url = getUrlWithParam(
      `${getUrlPrecedente(urlCourante)}/${PATH_APERCU_REQ_PRISE}/:idRequete`,
      requete.idRequete
    );
  } else if (receUrl.estUrlApercuRequete(urlCourante)) {
    url = getUrlApercuTraitement(urlCourante, requete);
  } else if (
    receUrl.estUrlEdition(urlCourante) ||
    (receUrl.estUrlApercuTraitementRequete(urlCourante) &&
      requete.statut &&
      StatutRequete.getEnumFromLibelle(requete.statut) ===
        StatutRequete.PRISE_EN_CHARGE)
  ) {
    url = getUrlApercuTraitement(urlCourante, requete);
  }
  return url;
}

function getUrlApercuTraitement(
  urlCourante: string,
  requete: IRequeteTableauDelivrance
) {
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

  if (estUrlEspaceDelivranceOuRMCRequete(urlCourante)) {
    url = getUrlWithParam(
      `${urlCourante}/${PATH_APERCU_REQ_TRAITEMENT}/:idRequete`,
      idRequete
    );
  } else if (
    receUrl.estUrlApercuRequete(urlCourante) ||
    receUrl.estUrlSaisirCourrier(urlCourante)
  ) {
    url = receUrl.getUrlApercuTraitementAPartirDe({
      url: urlCourante,
      idRequete
    });
  }
  return url;
}

export function determinerCriteresRMCAuto(
  requete: TRequete | IRequeteTableauDelivrance
): ICriteresRMCAutoActeInscription {
  const criteresRMCAuto = {} as ICriteresRMCAutoActeInscription;
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
          jourNaissance: getValeurOuUndefined(titulaire?.jourNaissance),
          moisNaissance: getValeurOuUndefined(titulaire?.moisNaissance),
          anneeNaissance: getValeurOuUndefined(titulaire?.anneeNaissance),
          numeroOrdre: getValeurOuUndefined(titulaire.position)
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
    nomTitulaire = TitulaireRequete.getNom(titulaire);
  } else {
    /* titulaire de type ITitulaireRequeteTableau*/
    nomTitulaire = getValeurOuUndefined(titulaire?.nom);
  }
  return nomTitulaire;
}

function getPrenomTitulaire(
  titulaire: ITitulaireRequeteTableau | ITitulaireRequete
): string {
  let prenomTitulaire;
  /* titulaire de type ITitulaireRequete */
  if ("id" in titulaire) {
    prenomTitulaire = TitulaireRequete.getPrenom1(titulaire);
  } else {
    /* titulaire de type ITitulaireRequeteTableau*/
    prenomTitulaire = getValeurOuUndefined(titulaire?.prenoms?.[0]);
  }
  return prenomTitulaire;
}

function estUrlEspaceDelivranceOuRMCRequete(url: string) {
  return (
    url === URL_REQUETES_DELIVRANCE_SERVICE ||
    url === URL_RECHERCHE_REQUETE ||
    url === URL_MES_REQUETES_DELIVRANCE
  );
}
