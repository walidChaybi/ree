import { NatureRc } from "@model/etatcivil/enum/NatureRc";
import { NatureRca } from "@model/etatcivil/enum/NatureRca";
import { StatutFiche } from "@model/etatcivil/enum/StatutFiche";
import { InscriptionRcUtil } from "@model/etatcivil/enum/TypeInscriptionRc";
import { TypeRepertoire } from "@model/etatcivil/enum/TypeRepertoire";
import { IRMCRequestActesInscriptions } from "@model/rmc/acteInscription/envoi/IRMCRequestActesInscriptions";
import { IRMCActeInscription } from "@model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import { RMCRepertoire } from "@model/rmc/acteInscription/rechercheForm/IRMCRepertoire";
import { IResultatRMCInscription } from "@model/rmc/acteInscription/resultat/IResultatRMCInscription";
import ReportIcon from "@mui/icons-material/Report";
import {
  getDateDebutFromDateCompose,
  getDateFinFromDateCompose,
  getDateStringFromDateCompose
} from "@util/DateUtils";
import {
  formatNom,
  formatNoms,
  formatPrenoms,
  getValeurOuUndefined,
  getValeurOuVide
} from "@util/Utils";
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
export function mappingCriteres(
  criteres: IRMCActeInscription
): IRMCRequestActesInscriptions {
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

    // Filtre Registre & Réppertoire Civile
    natureActe: getValeurOuUndefined(
      criteres.registreRepertoire?.registre?.natureActe
    ),
    familleRegistre: getValeurOuUndefined(
      criteres.registreRepertoire?.registre?.familleRegistre
    ),
    posteOuPocopa: getValeurOuUndefined(
      criteres.registreRepertoire?.registre?.pocopa?.value
    ),
    numeroActe: getValeurOuUndefined(
      criteres.registreRepertoire?.registre?.numeroActe
    ),
    anneeRegistre: getValeurOuUndefined(
      criteres.registreRepertoire?.registre?.anneeRegistre
    ),
    numeroInscription: getValeurOuUndefined(
      criteres.registreRepertoire?.repertoire?.numeroInscription
    ),
    typeRepertoire: getValeurOuUndefined(
      criteres.registreRepertoire?.repertoire?.typeRepertoire
    ),
    natureRcRca: RMCRepertoire.getNatureRcRca(
      criteres.registreRepertoire?.repertoire
    ),
    jourDateEvenement: getValeurOuUndefined(
      criteres.registreRepertoire?.evenement?.dateEvenement?.jour
    ),
    moisDateEvenement: getValeurOuUndefined(
      criteres.registreRepertoire?.evenement?.dateEvenement?.mois
    ),
    anneeDateEvenement: getValeurOuUndefined(
      criteres.registreRepertoire?.evenement?.dateEvenement?.annee
    ),
    paysEvenement: getValeurOuUndefined(
      criteres.registreRepertoire?.evenement?.paysEvenement
    )
  };
}

/** RC/RCA/PACS: mapping après appel d'api */
export function mappingInscriptions(data: any): IResultatRMCInscription[] {
  return data?.map((inscription: any) => {
    return {
      idInscription: inscription?.id,
      idPersonne: inscription?.idPersonne,
      nom: formatNom(inscription?.nom),
      autresNoms: formatNoms(inscription?.autresNoms),
      prenoms: formatPrenoms(inscription?.prenoms),
      dateNaissance: getDateStringFromDateCompose({
        jour: inscription?.jourNaissance,
        mois: inscription?.moisNaissance,
        annee: inscription?.anneeNaissance
      }),
      paysNaissance: getValeurOuVide(inscription?.paysNaissance),
      numeroInscription: getValeurOuVide(inscription?.numero),
      nature: getNatureInscription(inscription?.categorie, inscription?.nature),
      typeInscription: InscriptionRcUtil.getLibelle(
        inscription?.typeInscription
      ),
      statutInscription: getValeurOuVide(
        StatutFiche.getEnumFor(inscription?.statut)?.libelle
      ),
      categorie: getValeurOuVide(inscription?.categorie),
      anneeInscription: getValeurOuVide(inscription?.anneeInscription),
      dateInscription: getValeurOuVide(inscription?.dateInscription)
    } as IResultatRMCInscription;
  });
}

export function rechercherRepertoireAutorise(
  criteres: IRMCRequestActesInscriptions
): boolean {
  return !(
    criteres.natureActe ||
    criteres.familleRegistre ||
    criteres.posteOuPocopa ||
    criteres.numeroActe ||
    criteres.anneeRegistre
  );
}

export function rechercherActeAutorise(
  criteres: IRMCRequestActesInscriptions
): boolean {
  return !(
    criteres.typeRepertoire ||
    criteres.natureRcRca ||
    criteres.numeroInscription
  );
}

export function getMessageZeroActe(): JSX.Element {
  return (
    <>
      <ReportIcon />
      <div>Aucun acte n'a été trouvé</div>
    </>
  );
}

export function getMessageZeroInscription(): JSX.Element {
  return (
    <>
      <ReportIcon />
      <div>Aucune inscription n'a été trouvée</div>
    </>
  );
}

export function getNatureInscription(
  categorie: string,
  nature: string
): string {
  let natureInscription = "";
  if (categorie) {
    const categorieToUpper = categorie?.toUpperCase();
    switch (categorieToUpper) {
      case TypeRepertoire.RC.libelle:
        natureInscription = NatureRc.getEnumFor(nature)?.libelle;
        break;
      case TypeRepertoire.RCA.libelle:
        natureInscription = NatureRca.getEnumFor(nature)?.libelle;
        break;
      default:
        break;
    }
  }
  return natureInscription;
}
