import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TRequete } from "@model/requete/IRequete";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { ITitulaireRequete, TitulaireRequete } from "@model/requete/ITitulaireRequete";
import { ITitulaireRequeteTableau } from "@model/requete/ITitulaireRequeteTableau";
import {
  ICriteresRMCActesInscriptions,
  ICriteresRMCAutoActeInscription
} from "@model/rmc/acteInscription/envoi/IRMCRequestActesInscriptions";
import {
  PATH_APERCU_REQ_PRISE,
  receUrl,
  URL_MES_REQUETES_DELIVRANCE,
  URL_RECHERCHE_REQUETE,
  URL_REQUETES_DELIVRANCE_SERVICE
} from "@router/ReceUrls";
import { getUrlPrecedente } from "@util/route/UrlUtil";

export const redirectionVersRequetePriseEnCharge = (requete: IRequeteTableauDelivrance, urlCourante: string): string => {
  switch (true) {
    case estUrlEspaceDelivranceOuRMCRequete(urlCourante):
      return `${urlCourante}/${PATH_APERCU_REQ_PRISE}/${requete.idRequete}`;

    case receUrl.estUrlSaisirCourrier(urlCourante):
    case receUrl.estUrlApercuRequete(urlCourante):
    case receUrl.estUrlEdition(urlCourante):
    case receUrl.estUrlApercuTraitementRequete(urlCourante) &&
      StatutRequete.getEnumFromLibelle(requete.statut) === StatutRequete.PRISE_EN_CHARGE:
      return `${getUrlPrecedente(urlCourante)}/${PATH_APERCU_REQ_PRISE}/${requete.idRequete}`;

    default:
      return "";
  }
};

const estUrlEspaceDelivranceOuRMCRequete = (url: string): boolean =>
  [URL_REQUETES_DELIVRANCE_SERVICE, URL_RECHERCHE_REQUETE, URL_MES_REQUETES_DELIVRANCE].includes(url);

export const getCriteresRMCAuto = (requete: TRequete | IRequeteTableauDelivrance): ICriteresRMCAutoActeInscription => ({
  criteres: criteresRMCAutoMapper(requete?.titulaires)
});

const criteresRMCAutoMapper = (titulaires?: ITitulaireRequete[] | ITitulaireRequeteTableau[]): ICriteresRMCActesInscriptions[] =>
  titulaires?.map<ICriteresRMCActesInscriptions>(
    (titulaire: ITitulaireRequete | ITitulaireRequeteTableau): ICriteresRMCActesInscriptions => ({
      nomTitulaire: getNomTitulaire(titulaire),
      prenomTitulaire: getPrenomTitulaire(titulaire),
      jourNaissance: titulaire.jourNaissance?.toString(),
      moisNaissance: titulaire.moisNaissance?.toString(),
      anneeNaissance: titulaire.anneeNaissance?.toString(),
      numeroOrdre: titulaire.position?.toString()
    })
  ) ?? [];

const getNomTitulaire = (titulaire: ITitulaireRequete | ITitulaireRequeteTableau): string =>
  "id" in titulaire ? TitulaireRequete.getNom(titulaire) : titulaire.nom;

const getPrenomTitulaire = (titulaire: ITitulaireRequete | ITitulaireRequeteTableau): string | undefined =>
  "id" in titulaire ? TitulaireRequete.getPrenom1(titulaire) : titulaire.prenoms?.[0];
