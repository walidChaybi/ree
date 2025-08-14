import { TRequete } from "@model/requete/IRequete";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { ITitulaireRequete, TitulaireRequete } from "@model/requete/ITitulaireRequete";
import { ITitulaireRequeteTableau } from "@model/requete/ITitulaireRequeteTableau";
import {
  ICriteresRMCActesInscriptions,
  ICriteresRMCAutoActeInscription
} from "@model/rmc/acteInscription/envoi/IRMCRequestActesInscriptions";

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
