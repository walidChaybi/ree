import ReportIcon from "@material-ui/icons/Report";
import React from "react";
import { getNatureInscription } from "../../../../../api/nomenclature/NomenclatureEtatcivil";
import { NatureActe } from "../../../../../model/etatcivil/enum/NatureActe";
import { StatutFiche } from "../../../../../model/etatcivil/enum/StatutFiche";
import { InscriptionRcUtil } from "../../../../../model/etatcivil/enum/TypeInscriptionRc";
import { IRMCRequestActesInscriptions } from "../../../../../model/rmc/acteInscription/envoi/IRMCRequestActesInscriptions";
import { IRMCActeInscription } from "../../../../../model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import { RMCRepertoire } from "../../../../../model/rmc/acteInscription/rechercheForm/IRMCRepertoire";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
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

/** Critères de recherche: mapping avant appel d'api */
export function mappingCriteres(
  criteres: IRMCActeInscription
): IRMCRequestActesInscriptions {
  let criteresMapper: IRMCRequestActesInscriptions;
  criteresMapper = {
    // Filtre Titulaire
    nomTitulaire: valeurOuUndefined(criteres.titulaire?.nom),
    prenomTitulaire: valeurOuUndefined(criteres.titulaire?.prenom),
    jourNaissance: valeurOuUndefined(criteres.titulaire?.dateNaissance?.jour),
    moisNaissance: valeurOuUndefined(criteres.titulaire?.dateNaissance?.mois),
    anneeNaissance: valeurOuUndefined(criteres.titulaire?.dateNaissance?.annee),
    paysNaissance: valeurOuUndefined(criteres.titulaire?.paysNaissance),
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

/** Actes: mapping après appel d'api */
export function mappingActes(data: any): IResultatRMCActe[] {
  const actesMapper: IResultatRMCActe[] = [];
  data.forEach((acte: any) => {
    const acteMapper: IResultatRMCActe = {
      idActe: acte.id,
      nom: formatNom(acte.nom),
      autresNoms: formatNoms(acte.autresNoms),
      prenoms: formatPrenoms(acte.prenoms),
      dateNaissance: getDateStringFromDateCompose({
        jour: acte.jourNaissance,
        mois: acte.moisNaissance,
        annee: acte.anneeNaissance
      }),
      paysNaissance: getValeurOuVide(acte.paysNaissance),
      nature: NatureActe.getEnumFor(acte.nature).libelle,
      registre: getValeurOuVide(acte.registre),
      alertes: getValeurOuVide(acte.alertes)
    };
    actesMapper.push(acteMapper);
  });
  return actesMapper;
}

/** RC/RCA/PACS: mapping après appel d'api */
export async function mappingInscriptions(
  data: any
): Promise<IResultatRMCInscription[]> {
  const promises = data?.map(async (inscription: any) => {
    const nature: string = await getNatureInscription(
      inscription?.categorie,
      inscription?.nature
    );
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
      nature,
      typeInscription: InscriptionRcUtil.getLibelle(
        inscription?.typeInscription
      ),
      statutInscription: getValeurOuVide(
        StatutFiche.getEnumFor(inscription?.statut)?.libelle
      ),
      categorie: getValeurOuVide(inscription?.categorie)
    } as IResultatRMCInscription;
  });
  return Promise.all(promises);
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
