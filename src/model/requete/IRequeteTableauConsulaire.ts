import { IService } from "@model/agent/IService";
import { IUtilisateur } from "@model/agent/IUtilisateur";
import DateUtils from "@util/DateUtils";
import { IRequeteConsulaire } from "./IRequeteConsulaire";
import { IRequeteTableau } from "./IRequeteTableau";
import { mapTitulaires } from "./ITitulaireRequeteTableau";
import { ENatureActeTranscrit, NatureActeTranscription } from "./NatureActeTranscription";
import { SousTypeCreation } from "./enum/SousTypeCreation";
import { StatutRequete } from "./enum/StatutRequete";

export interface IRequeteTableauConsulaire extends IRequeteTableau {
  numeroDossier: string;
  dateDerniereAction: string;
  idUtilisateurRequerant?: string;
  idService?: string;
  nomCompletRequerant?: string;
  sousTypeCode: string;
  natureActe: string;
}

//////////////////////////////////////////
/** Requetes: mapping après appel d'api */
//////////////////////////////////////////

export const mappingRequetesTableauConsulaire = (
  resultatsRecherche: IRequeteConsulaire[],
  mappingSupplementaire: boolean,
  utilisateurs: IUtilisateur[],
  services: IService[]
): IRequeteTableauConsulaire[] => {
  return resultatsRecherche?.map(requete => {
    return mappingUneRequeteTableauConsulaire(requete, mappingSupplementaire, utilisateurs, services);
  });
};

export const mappingUneRequeteTableauConsulaire = (
  requete: any,
  mappingSupplementaire: boolean,
  utilisateurs: IUtilisateur[],
  services: IService[]
): IRequeteTableauConsulaire => {
  return {
    idRequete: requete?.id,
    numeroDossier: requete?.numeroDossier ?? "",
    idUtilisateur: requete.idUtilisateur,
    sousType: SousTypeCreation.getEnumFor(requete?.sousType)?.libelleCourt,
    sousTypeCode: requete?.sousType,
    natureActe: requete?.natureActe ? NatureActeTranscription.getLibelle(requete.natureActe as ENatureActeTranscrit, true) : "",
    titulaires: mapTitulaires(requete?.titulaires, mappingSupplementaire),
    nomCompletRequerant: requete?.nomCompletRequerant,
    dateCreation: DateUtils.getFormatDateFromTimestamp(requete?.dateCreation),
    dateDerniereAction: DateUtils.getFormatDateFromTimestamp(requete?.dateDerniereAction),
    statut: StatutRequete.getEnumFor(requete?.statut)?.libelle
  };
};
