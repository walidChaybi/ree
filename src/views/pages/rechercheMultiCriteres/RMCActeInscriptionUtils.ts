import { IResultatRMCActe } from "../../../model/rmc/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../model/rmc/IResultatRMCInscription";
import { IRMCActeInscription } from "../../../model/rmc/IRMCActeInscription";
import { IRMCRequest } from "../../../model/rmc/IRMCRequest";

export function mappingCriteres(criteres: IRMCActeInscription): IRMCRequest {
  let criteresMapper: IRMCRequest;
  criteresMapper = {
    // Filtre Titulaire
    nomTitulaire: criteres.titulaire.nom || null,
    prenomTitulaire: criteres.titulaire.prenom || null,
    jourNaissance: criteres.titulaire.dateNaissance.jour || null,
    moisNaissance: criteres.titulaire.dateNaissance.mois || null,
    anneeNaissance: criteres.titulaire.dateNaissance.annee || null,
    paysNaissance: criteres.titulaire.paysNaissance || null,
    // Filtre Date de création
    dateCreationDebut: null,
    dateCreationFin: null,
    annee: null,

    // Filtre Registre & Réppertoire Civile
    natureActe: null,
    familleRegistre: null,
    posteOuPocopa: null,
    numeroActe: null,
    numeroInscription: null,
    typeRepertoire: null,
    natureRc: null,
    natureRca: null,
    jourDateEvenement: null,
    moisDateEvenement: null,
    anneeDateEvenement: null,
    paysEvenement: null
  };
  return criteresMapper;
}

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
