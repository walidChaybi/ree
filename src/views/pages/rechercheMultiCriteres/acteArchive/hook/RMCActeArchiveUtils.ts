import { getCriteresTitulaire } from "@hook/rmcActeInscription/mapping/RMCMappingUtil";
import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import { ETypeFamille } from "@model/etatcivil/enum/TypeFamille";
import { IRMCArchiveRequest } from "@model/rmc/acteArchive/envoi/IRMCArchiveRequest";
import { IRMCActeArchive } from "@model/rmc/acteArchive/rechercheForm/IRMCActeArchive";
import DateUtils from "@util/DateUtils";

/** Critères de recherche: mapping avant appel d'api */
export function mappingCriteresRMCArchive(criteres: IRMCActeArchive): IRMCArchiveRequest {
  return {
    // Filtre Titulaire
    ...getCriteresTitulaire(criteres),
    // Filtre Date de création
    dateCreationDebut: DateUtils.getDateDebutFromDateCompose(criteres.datesDebutFinAnnee?.dateDebut),
    dateCreationFin: DateUtils.getDateFinFromDateCompose(criteres.datesDebutFinAnnee?.dateFin),

    // Filtre Registre Civile
    natureActe: criteres.registreArchive?.registre?.natureActe as keyof typeof ENatureActe,
    familleRegistre: criteres.registreArchive?.registre?.familleRegistre as keyof typeof ETypeFamille,
    posteOuPocopa: criteres.registreArchive?.registre?.pocopa?.cle || undefined,
    numeroActe: criteres.registreArchive?.registre?.numeroActe?.numeroActeOuOrdre || undefined,
    anneeRegistre: criteres.registreArchive?.registre?.anneeRegistre || undefined,
    numeroBisTer: criteres.registreArchive?.registre?.numeroActe?.numeroBisTer || undefined,
    support1: criteres.registreArchive?.registre?.registreSupport?.supportUn || undefined,
    support2: criteres.registreArchive?.registre?.registreSupport?.supportDeux || undefined,
    jourDateEvenement: criteres.registreArchive?.evenement?.dateEvenement?.jour || undefined,
    moisDateEvenement: criteres.registreArchive?.evenement?.dateEvenement?.mois || undefined,
    anneeDateEvenement: criteres.registreArchive?.evenement?.dateEvenement?.annee || undefined,
    paysEvenement: criteres.registreArchive?.evenement?.paysEvenement || undefined
  };
}
