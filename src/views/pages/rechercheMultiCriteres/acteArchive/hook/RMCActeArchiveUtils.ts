import { getCriteresTitulaire } from "@hook/rmcActeInscription/mapping/RMCMappingUtil";
import { IRMCArchiveRequest } from "@model/rmc/acteArchive/envoi/IRMCArchiveRequest";
import { IRMCActeArchive } from "@model/rmc/acteArchive/rechercheForm/IRMCActeArchive";
import {
  getDateDebutFromDateCompose,
  getDateFinFromDateCompose
} from "@util/DateUtils";
import { getValeurOuUndefined } from "@util/Utils";

/** Critères de recherche: mapping avant appel d'api */
export function mappingCriteres(criteres: IRMCActeArchive): IRMCArchiveRequest {
  return {
    // Filtre Titulaire
    ...getCriteresTitulaire(criteres),
    // Filtre Date de création
    dateCreationDebut: getDateDebutFromDateCompose(
      criteres.datesDebutFinAnnee?.dateDebut
    ),
    dateCreationFin: getDateFinFromDateCompose(
      criteres.datesDebutFinAnnee?.dateFin
    ),

    // Filtre Registre Civile
    natureActe: getValeurOuUndefined(
      criteres.registreArchive?.registre?.natureActe
    ),
    familleRegistre: getValeurOuUndefined(
      criteres.registreArchive?.registre?.familleRegistre
    ),
    posteOuPocopa: getValeurOuUndefined(
      criteres.registreArchive?.registre?.pocopa?.cle
    ),
    numeroActe: getValeurOuUndefined(
      criteres.registreArchive?.registre?.numeroActe?.numeroActeOuOrdre
    ),
    anneeRegistre: getValeurOuUndefined(
      criteres.registreArchive?.registre?.anneeRegistre
    ),
    numeroBisTer: getValeurOuUndefined(
      criteres.registreArchive?.registre?.numeroActe?.numeroBisTer
    ),
    support1: getValeurOuUndefined(
      criteres.registreArchive?.registre?.registreSupport?.supportUn
    ),
    support2: getValeurOuUndefined(
      criteres.registreArchive?.registre?.registreSupport?.supportDeux
    ),
    jourDateEvenement: getValeurOuUndefined(
      criteres.registreArchive?.evenement?.dateEvenement?.jour
    ),
    moisDateEvenement: getValeurOuUndefined(
      criteres.registreArchive?.evenement?.dateEvenement?.mois
    ),
    anneeDateEvenement: getValeurOuUndefined(
      criteres.registreArchive?.evenement?.dateEvenement?.annee
    ),
    paysEvenement: getValeurOuUndefined(
      criteres.registreArchive?.evenement?.paysEvenement
    )
  };
}
