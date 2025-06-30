import { EStatutFiche } from "@model/etatcivil/enum/EStatutFiche";
import { ETypeInscriptionRcRca } from "@model/etatcivil/enum/ETypeInscriptionRcRca";
import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import { NatureRc } from "@model/etatcivil/enum/NatureRc";
import { NatureRca } from "@model/etatcivil/enum/NatureRca";
import { ETypeFamille } from "@model/etatcivil/enum/TypeFamille";
import { ETypeRepertoire, TypeRepertoire } from "@model/etatcivil/enum/TypeRepertoire";
import { ICriteresRMCActesInscriptions } from "@model/rmc/acteInscription/envoi/IRMCRequestActesInscriptions";
import { IRMCActeInscription } from "@model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import { RMCRepertoire } from "@model/rmc/acteInscription/rechercheForm/IRMCRepertoire";
import { IResultatRMCInscription } from "@model/rmc/acteInscription/resultat/IResultatRMCInscription";
import DateUtils from "@util/DateUtils";
import { formatNom, formatNoms, formatPrenoms, getValeurOuVide } from "@util/Utils";
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
export const mappingCriteres = (criteres: IRMCActeInscription): ICriteresRMCActesInscriptions => {
  return {
    // Filtre Titulaire
    ...getCriteresTitulaire(criteres),
    // Filtre Date de création
    dateCreationDebut: DateUtils.getDateDebutFromDateCompose(criteres.datesDebutFinAnnee?.dateDebut),
    dateCreationFin: DateUtils.getDateFinFromDateCompose(criteres.datesDebutFinAnnee?.dateFin),

    // Filtre Registre & Répertoire Civil
    natureActe: (criteres.registreRepertoire?.registre?.natureActe as keyof typeof ENatureActe) || undefined,
    familleRegistre: (criteres.registreRepertoire?.registre?.familleRegistre as keyof typeof ETypeFamille) || undefined,
    posteOuPocopa: criteres.registreRepertoire?.registre?.pocopa?.cle || undefined,
    numeroActe: criteres.registreRepertoire?.registre?.numeroActe?.numeroActeOuOrdre || undefined,
    anneeRegistre: criteres.registreRepertoire?.registre?.anneeRegistre || undefined,
    numeroBisTer: criteres.registreRepertoire?.registre?.numeroActe?.numeroBisTer || undefined,
    aPartirDeNumeroActe: criteres.registreRepertoire?.registre?.numeroActe?.aPartirDe || undefined,
    support1: criteres.registreRepertoire?.registre?.registreSupport?.supportUn || undefined,
    support2: criteres.registreRepertoire?.registre?.registreSupport?.supportDeux || undefined,
    numeroInscription: criteres.registreRepertoire?.repertoire?.numeroInscription || undefined,
    typeRepertoire: (criteres.registreRepertoire?.repertoire?.typeRepertoire as keyof typeof ETypeRepertoire) || undefined,
    natureRcRca: RMCRepertoire.getNatureRcRca(criteres.registreRepertoire?.repertoire),
    jourDateEvenement: criteres.registreRepertoire?.evenement?.dateEvenement?.jour || undefined,
    moisDateEvenement: criteres.registreRepertoire?.evenement?.dateEvenement?.mois || undefined,
    anneeDateEvenement: criteres.registreRepertoire?.evenement?.dateEvenement?.annee || undefined,
    paysEvenement: criteres.registreRepertoire?.evenement?.paysEvenement || undefined
  };
};

/** RC/RCA/PACS: mapping après appel d'api */
export function mappingInscriptions(data: any): IResultatRMCInscription[] {
  return data?.map((inscription: any) => {
    return {
      idInscription: inscription?.id,
      idPersonne: inscription?.idPersonne,
      nom: formatNom(inscription?.nom),
      autresNoms: formatNoms(inscription?.autresNoms),
      prenoms: formatPrenoms(inscription?.prenoms),
      dateNaissance: DateUtils.getDateStringFromDateCompose({
        jour: inscription?.jourNaissance,
        mois: inscription?.moisNaissance,
        annee: inscription?.anneeNaissance
      }),
      paysNaissance: getValeurOuVide(inscription?.paysNaissance),
      numeroInscription: getValeurOuVide(inscription?.numero),
      nature: getNatureInscription(inscription?.categorie, inscription?.nature),
      typeInscription: ETypeInscriptionRcRca[inscription?.typeInscription as keyof typeof ETypeInscriptionRcRca],
      statutInscription: getValeurOuVide(EStatutFiche[inscription?.statut as keyof typeof EStatutFiche]),
      categorie: getValeurOuVide(inscription?.categorie),
      anneeInscription: getValeurOuVide(inscription?.anneeInscription),
      dateInscription: getValeurOuVide(inscription?.dateInscription)
    } as IResultatRMCInscription;
  });
}

export function rechercherRepertoireAutorise(criteres: ICriteresRMCActesInscriptions): boolean {
  return !(criteres.natureActe || criteres.familleRegistre || criteres.posteOuPocopa || criteres.numeroActe || criteres.anneeRegistre);
}

export const rmcActeAutorisee = (criteres: ICriteresRMCActesInscriptions): boolean =>
  !(criteres.typeRepertoire || criteres.natureRcRca || criteres.numeroInscription);

function getNatureInscription(categorie: string, nature: string): string {
  switch (categorie?.toUpperCase()) {
    case TypeRepertoire.RC.libelle:
      return NatureRc.depuisId(nature)?.libelle ?? "";
    case TypeRepertoire.RCA.libelle:
      return NatureRca.depuisId(nature)?.libelle ?? "";
    default:
      return "";
  }
}
