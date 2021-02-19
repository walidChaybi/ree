import { IResultatRMCActe } from "../../../model/rmc/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../model/rmc/resultat/IResultatRMCInscription";
import { IRMCActeInscription } from "../../../model/rmc/rechercheForm/IRMCActeInscription";
import { IRMCRequest } from "../../../model/rmc/envoi/IRMCRequest";
import {
  getDateFinFromDateCompose,
  getDateDebutFromDateCompose
} from "../../common/util/DateUtils";
import { valeurOuUndefined } from "../../common/util/Utils";

/** Critères de recherche: mapping avant appel d'api */
export function mappingCriteres(criteres: IRMCActeInscription): IRMCRequest {
  let criteresMapper: IRMCRequest;
  criteresMapper = {
    // Filtre Titulaire
    nomTitulaire: valeurOuUndefined(criteres.titulaire.nom),
    prenomTitulaire: valeurOuUndefined(criteres.titulaire.prenom),
    jourNaissance: valeurOuUndefined(criteres.titulaire.dateNaissance.jour),
    moisNaissance: valeurOuUndefined(criteres.titulaire.dateNaissance.mois),
    anneeNaissance: valeurOuUndefined(criteres.titulaire.dateNaissance.annee),
    paysNaissance: valeurOuUndefined(criteres.titulaire.paysNaissance),
    // Filtre Date de création
    dateCreationDebut: getDateDebutFromDateCompose(
      criteres.datesDebutFinAnnee?.dateDebut
    ),
    dateCreationFin: getDateFinFromDateCompose(
      criteres.datesDebutFinAnnee?.dateFin
    ),
    annee: criteres.datesDebutFinAnnee?.annee,

    // Filtre Registre & Réppertoire Civile
    natureActe: undefined,
    familleRegistre: undefined,
    posteOuPocopa: undefined,
    numeroActe: undefined,
    numeroInscription: undefined,
    typeRepertoire: undefined,
    natureRc: undefined,
    natureRca: undefined,
    jourDateEvenement: undefined,
    moisDateEvenement: undefined,
    anneeDateEvenement: undefined,
    paysEvenement: undefined
  };
  return criteresMapper;
}

/** Actes: mapping après appel d'api */
export function mappingActes(data: any): IResultatRMCActe[] {
  const actesMapper: IResultatRMCActe[] = [];
  data.forEach((acte: any) => {
    const acteMapper: IResultatRMCActe = {
      id: acte.id,
      nom: acte.nom,
      autresNoms: acte.autresNoms,
      prenoms: acte.prenoms,
      dateNaissance: {
        jour: acte.jour,
        mois: acte.mois,
        annee: acte.annee
      },
      paysNaissance: acte.pays,
      natureActe: acte.nature,
      registre: acte.registre
    };
    actesMapper.push(acteMapper);
  });
  return actesMapper;
}

/** RC/RCA/PACS: mapping après appel d'api */
export function mappingInscriptions(data: any): IResultatRMCInscription[] {
  const inscriptionsMapper: IResultatRMCInscription[] = [];
  data.forEach((inscription: any) => {
    const inscriptionMapper: IResultatRMCInscription = {
      id: inscription.id,
      nom: inscription.nom,
      autresNoms: inscription.autresNoms,
      prenoms: inscription.prenoms,
      dateNaissance: {
        jour: inscription.jour,
        mois: inscription.mois,
        annee: inscription.annee
      },
      paysNaissance: inscription.pays,
      numeroInscription: inscription.numero,
      natureInscription: inscription.nature,
      typeInscription: inscription.typeInscription,
      statutFiche: inscription.statut
    };
    inscriptionsMapper.push(inscriptionMapper);
  });
  return inscriptionsMapper;
}
