import { getCriteresTitulaire } from "@hook/rmcActeInscription/mapping/RMCMappingUtil";
import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import { ETypeFamille } from "@model/etatcivil/enum/TypeFamille";
import { IRMCArchiveRequest } from "@model/rmc/acteArchive/envoi/IRMCArchiveRequest";
import { IRMCActeArchive } from "@model/rmc/acteArchive/rechercheForm/IRMCActeArchive";
import DateUtils from "@util/DateUtils";
import { nettoyerAttributsDto } from "../../../../../dto/commun/dtoUtils";

/** Critères de recherche: mapping avant appel d'api */
export const mappingCriteresRMCArchive = (criteres: IRMCActeArchive): IRMCArchiveRequest =>
  nettoyerAttributsDto({
    // Filtre Titulaire
    ...getCriteresTitulaire(criteres),
    // Filtre Date de création
    dateCreationDebut: DateUtils.getDateDebutFromDateCompose(criteres.datesDebutFinAnnee?.dateDebut),
    dateCreationFin: DateUtils.getDateFinFromDateCompose(criteres.datesDebutFinAnnee?.dateFin),

    // Filtre Registre Civile
    natureActe: criteres.registreArchive?.registre?.natureActe as keyof typeof ENatureActe,
    familleRegistre: criteres.registreArchive?.registre?.familleRegistre as keyof typeof ETypeFamille,
    posteOuPocopa:
      typeof criteres.registreArchive?.registre?.pocopa === "string"
        ? criteres.registreArchive?.registre?.pocopa
        : criteres.registreArchive?.registre?.pocopa?.cle,
    numeroActe: criteres.registreArchive?.registre?.numeroActe?.numeroActeOuOrdre,
    anneeRegistre: criteres.registreArchive?.registre?.anneeRegistre,
    numeroBisTer: criteres.registreArchive?.registre?.numeroActe?.numeroBisTer,
    support1: criteres.registreArchive?.registre?.registreSupport?.supportUn,
    support2: criteres.registreArchive?.registre?.registreSupport?.supportDeux,
    jourDateEvenement: criteres.registreArchive?.evenement?.dateEvenement?.jour,
    moisDateEvenement: criteres.registreArchive?.evenement?.dateEvenement?.mois,
    anneeDateEvenement: criteres.registreArchive?.evenement?.dateEvenement?.annee,
    paysEvenement: criteres.registreArchive?.evenement?.paysEvenement
  });
