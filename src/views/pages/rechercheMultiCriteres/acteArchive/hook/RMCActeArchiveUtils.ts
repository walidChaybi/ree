import {
  formatNom,
  formatNoms,
  formatPrenoms,
  getValeurOuVide,
  valeurOuUndefined
} from "../../../../common/util/Utils";
import {
  getDateStringFromDateCompose,
  getDateFinFromDateCompose,
  getDateDebutFromDateCompose
} from "../../../../common/util/DateUtils";
import { NatureActe } from "../../../../../model/etatcivil/enum/NatureActe";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IRMCActeArchive } from "../../../../../model/rmc/acteArchive/rechercheForm/IRMCActeArchive";
import { IRMCArchiveRequest } from "../../../../../model/rmc/acteArchive/envoi/IRMCArchiveRequest";

/** Critères de recherche: mapping avant appel d'api */
export function mappingCriteres(criteres: IRMCActeArchive): IRMCArchiveRequest {
  let criteresMapper: IRMCArchiveRequest;
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

    // Filtre Registre Civile
    natureActe: valeurOuUndefined(
      criteres.registreArchive?.registre?.natureActe
    ),
    familleRegistre: valeurOuUndefined(
      criteres.registreArchive?.registre?.familleRegistre
    ),
    posteOuPocopa: valeurOuUndefined(
      criteres.registreArchive?.registre?.pocopa
    ),
    numeroActe: valeurOuUndefined(
      criteres.registreArchive?.registre?.numeroActe
    ),
    jourDateEvenement: valeurOuUndefined(
      criteres.registreArchive?.evenement?.dateEvenement?.jour
    ),
    moisDateEvenement: valeurOuUndefined(
      criteres.registreArchive?.evenement?.dateEvenement?.mois
    ),
    anneeDateEvenement: valeurOuUndefined(
      criteres.registreArchive?.evenement?.dateEvenement?.annee
    ),
    paysEvenement: valeurOuUndefined(
      criteres.registreArchive?.evenement?.paysEvenement
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
      registre: getValeurOuVide(acte.registre)
    };
    actesMapper.push(acteMapper);
  });
  return actesMapper;
}
