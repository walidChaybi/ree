import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import { ETypeFamille } from "@model/etatcivil/enum/TypeFamille";
import { ETypeRepertoire } from "@model/etatcivil/enum/TypeRepertoire";
import { ICriteresRMCActesInscriptions } from "@model/rmc/acteInscription/envoi/IRMCRequestActesInscriptions";
import { IRMCActeInscription } from "@model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import { RMCRepertoire } from "@model/rmc/acteInscription/rechercheForm/IRMCRepertoire";
import DateUtils from "@util/DateUtils";
import { nettoyerAttributsDto } from "../../../../dto/commun/dtoUtils";
import { getCriteresTitulaire } from "./mapping/RMCMappingUtil";

export interface ICriteresRechercheActeInscription {
  valeurs: IRMCActeInscription;
  range?: string;
  // Ajout de l'identifiant de la fiche qui a demandé la rmc (lors d'une navigation qui nécessite le rappel de la rmc pour obtenir les actes suivants ou précédents)
  ficheIdentifiant?: string;
  onErreur?: () => void;
  onFinTraitement?: () => void;
}

/** Critères de recherche: mapping avant appel d'api */
export const mappingCriteres = (criteres: IRMCActeInscription): ICriteresRMCActesInscriptions =>
  nettoyerAttributsDto({
    // Filtre Titulaire
    ...getCriteresTitulaire(criteres),
    // Filtre Date de création
    dateCreationDebut: DateUtils.getDateDebutFromDateCompose(criteres.datesDebutFinAnnee?.dateDebut),
    dateCreationFin: DateUtils.getDateFinFromDateCompose(criteres.datesDebutFinAnnee?.dateFin),

    // Filtre Registre & Répertoire Civil
    natureActe: criteres.registreRepertoire?.registre?.natureActe as keyof typeof ENatureActe,
    familleRegistre: criteres.registreRepertoire?.registre?.familleRegistre as keyof typeof ETypeFamille,
    posteOuPocopa: criteres.registreRepertoire?.registre?.pocopa?.cle,
    numeroActe: criteres.registreRepertoire?.registre?.numeroActe?.numeroActeOuOrdre,
    anneeRegistre: criteres.registreRepertoire?.registre?.anneeRegistre,
    numeroBisTer: criteres.registreRepertoire?.registre?.numeroActe?.numeroBisTer,
    aPartirDeNumeroActe: criteres.registreRepertoire?.registre?.numeroActe?.etActesSuivants,
    support1: criteres.registreRepertoire?.registre?.registreSupport?.supportUn,
    support2: criteres.registreRepertoire?.registre?.registreSupport?.supportDeux,
    numeroInscription: criteres.registreRepertoire?.repertoire?.numeroInscription,
    typeRepertoire: criteres.registreRepertoire?.repertoire?.typeRepertoire as keyof typeof ETypeRepertoire,
    natureRcRca: RMCRepertoire.getNatureRcRca(criteres.registreRepertoire?.repertoire),
    etInscriptionsSuivantes: criteres.registreRepertoire?.repertoire?.etInscriptionsSuivantes,
    jourDateEvenement: criteres.registreRepertoire?.evenement?.dateEvenement?.jour,
    moisDateEvenement: criteres.registreRepertoire?.evenement?.dateEvenement?.mois,
    anneeDateEvenement: criteres.registreRepertoire?.evenement?.dateEvenement?.annee,
    paysEvenement: criteres.registreRepertoire?.evenement?.paysEvenement
  });

export const rmcInscriptionAutorisee = (criteres: ICriteresRMCActesInscriptions): boolean =>
  !(criteres.natureActe || criteres.familleRegistre || criteres.posteOuPocopa || criteres.numeroActe || criteres.anneeRegistre);

export const rmcActeAutorisee = (criteres: ICriteresRMCActesInscriptions): boolean =>
  !(criteres.typeRepertoire || criteres.natureRcRca || criteres.numeroInscription);
