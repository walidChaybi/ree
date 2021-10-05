import ReportIcon from "@material-ui/icons/Report";
import React from "react";
import { NatureRc } from "../../../../../model/etatcivil/enum/NatureRc";
import { NatureRca } from "../../../../../model/etatcivil/enum/NatureRca";
import { StatutFiche } from "../../../../../model/etatcivil/enum/StatutFiche";
import { InscriptionRcUtil } from "../../../../../model/etatcivil/enum/TypeInscriptionRc";
import { TypeRepertoire } from "../../../../../model/etatcivil/enum/TypeRepertoire";
import { IRMCRequestActesInscriptions } from "../../../../../model/rmc/acteInscription/envoi/IRMCRequestActesInscriptions";
import { IRMCActeInscription } from "../../../../../model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import { RMCRepertoire } from "../../../../../model/rmc/acteInscription/rechercheForm/IRMCRepertoire";
import { IResultatRMCInscription } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import {
  getDateDebutFromDateCompose,
  getDateFinFromDateCompose,
  getDateStringFromDateCompose
} from "../../../../common/util/DateUtils";
import {
  formatNom,
  formatNoms,
  formatPrenoms,
  getValeurOuVide,
  valeurOuUndefined
} from "../../../../common/util/Utils";
import { getCriteresTitulaire } from "../../common/mapping/RMCMappingUtil";

/** Critères de recherche: mapping avant appel d'api */
export function mappingCriteres(
  criteres: IRMCActeInscription
): IRMCRequestActesInscriptions {
  let criteresMapper: IRMCRequestActesInscriptions;
  criteresMapper = {
    // Filtre Titulaire
    ...getCriteresTitulaire(criteres),
    // Filtre Date de création
    dateCreationDebut: getDateDebutFromDateCompose(
      criteres.datesDebutFinAnnee?.dateDebut
    ),
    dateCreationFin: getDateFinFromDateCompose(
      criteres.datesDebutFinAnnee?.dateFin
    ),
    annee: valeurOuUndefined(criteres.datesDebutFinAnnee?.annee),

    // Filtre Registre & Réppertoire Civile
    natureActe: valeurOuUndefined(
      criteres.registreRepertoire?.registre?.natureActe
    ),
    familleRegistre: valeurOuUndefined(
      criteres.registreRepertoire?.registre?.familleRegistre
    ),
    posteOuPocopa: valeurOuUndefined(
      criteres.registreRepertoire?.registre?.pocopa?.value
    ),
    numeroActe: valeurOuUndefined(
      criteres.registreRepertoire?.registre?.numeroActe
    ),
    numeroInscription: valeurOuUndefined(
      criteres.registreRepertoire?.repertoire?.numeroInscription
    ),
    typeRepertoire: valeurOuUndefined(
      criteres.registreRepertoire?.repertoire?.typeRepertoire
    ),
    natureRcRca: RMCRepertoire.getNatureRcRca(
      criteres.registreRepertoire?.repertoire
    ),
    jourDateEvenement: valeurOuUndefined(
      criteres.registreRepertoire?.evenement?.dateEvenement?.jour
    ),
    moisDateEvenement: valeurOuUndefined(
      criteres.registreRepertoire?.evenement?.dateEvenement?.mois
    ),
    anneeDateEvenement: valeurOuUndefined(
      criteres.registreRepertoire?.evenement?.dateEvenement?.annee
    ),
    paysEvenement: valeurOuUndefined(
      criteres.registreRepertoire?.evenement?.paysEvenement
    )
  };
  return criteresMapper;
}

/** RC/RCA/PACS: mapping après appel d'api */
export function mappingInscriptions(data: any): IResultatRMCInscription[] {
  return data?.map((inscription: any) => {
    return {
      idInscription: inscription?.id,
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
    criteres.numeroActe
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
