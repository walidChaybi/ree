import { IRMCRequestRequete } from "@model/rmc/requete/IRMCRequestRequete";
import { IRMCRequete } from "@model/rmc/requete/IRMCRequete";
import {
  getDateDebutFromDateCompose,
  getDateFinFromDateCompose
} from "@util/DateUtils";
import { valeurOuUndefined } from "@util/Utils";

/** Critères de recherche requete: mapping avant appel d'api */
export function mappingCriteresRequete(
  criteres: IRMCRequete
): IRMCRequestRequete {
  let criteresMapper: IRMCRequestRequete;
  criteresMapper = {
    // Filtre Requete
    numeroRequete: valeurOuUndefined(criteres.requete?.numeroRequete),
    typeRequete: valeurOuUndefined(criteres.requete?.typeRequete),
    sousTypeRequete: valeurOuUndefined(criteres.requete?.sousTypeRequete),
    statutRequete: valeurOuUndefined(criteres.requete?.statutRequete),
    numeroTeledossier: valeurOuUndefined(criteres.requete?.numeroTeledossier),

    // Filtre Titulaire
    nomTitulaire: valeurOuUndefined(criteres.titulaire?.nom),
    prenomTitulaire: valeurOuUndefined(criteres.titulaire?.prenom),
    jourNaissance: valeurOuUndefined(criteres.titulaire?.dateNaissance?.jour),
    moisNaissance: valeurOuUndefined(criteres.titulaire?.dateNaissance?.mois),
    anneeNaissance: valeurOuUndefined(criteres.titulaire?.dateNaissance?.annee),
    paysNaissance: valeurOuUndefined(criteres.titulaire?.paysNaissance),

    // Filtre Date de création
    dateCreationDebut: getDateDebutFromDateCompose(
      criteres.datesDebutFin?.dateDebut
    ),
    dateCreationFin: getDateFinFromDateCompose(criteres.datesDebutFin?.dateFin),

    // Filtre Requerant
    nomRequerant: valeurOuUndefined(criteres.requerant?.nom),
    raisonSociale: valeurOuUndefined(criteres.requerant?.raisonSociale)
  };
  return criteresMapper;
}
