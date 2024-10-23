import { IRMCRequestRequete } from "@model/rmc/requete/IRMCRequestRequete";
import { IRMCRequete } from "@model/rmc/requete/IRMCRequete";
import DateUtils from "@util/DateUtils";
import { getValeurOuUndefined } from "@util/Utils";

/** Critères de recherche requete: mapping avant appel d'api */
export function mappingCriteresRequete(
  criteres: IRMCRequete
): IRMCRequestRequete {
  let criteresMapper: IRMCRequestRequete;
  criteresMapper = {
    // Filtre Requete
    numeroRequete: getValeurOuUndefined(criteres.requete?.numeroRequete),
    typeRequete: getValeurOuUndefined(criteres.requete?.typeRequete),
    sousTypeRequete: getValeurOuUndefined(criteres.requete?.sousTypeRequete),
    statutRequete: getValeurOuUndefined(criteres.requete?.statutRequete),
    numeroTeledossier: getValeurOuUndefined(criteres.requete?.numeroTeledossier),
    numeroDossierNational: getValeurOuUndefined(criteres.requete?.numeroDossierNational),

    // Filtre Titulaire
    nomTitulaire: getValeurOuUndefined(criteres.titulaire?.nom),
    prenomTitulaire: getValeurOuUndefined(criteres.titulaire?.prenom),
    jourNaissance: getValeurOuUndefined(criteres.titulaire?.dateNaissance?.jour),
    moisNaissance: getValeurOuUndefined(criteres.titulaire?.dateNaissance?.mois),
    anneeNaissance: getValeurOuUndefined(criteres.titulaire?.dateNaissance?.annee),
    paysNaissance: getValeurOuUndefined(criteres.titulaire?.paysNaissance),

    // Filtre Date de création
    dateCreationDebut: DateUtils.getDateDebutFromDateCompose(criteres.datesDebutFinAnnee?.dateDebut),
    dateCreationFin: DateUtils.getDateFinFromDateCompose(criteres.datesDebutFinAnnee?.dateFin),

    // Filtre Requerant
    nomRequerant: getValeurOuUndefined(criteres.requerant?.nom),
    raisonSociale: getValeurOuUndefined(criteres.requerant?.raisonSociale)
  };
  return criteresMapper;
}
