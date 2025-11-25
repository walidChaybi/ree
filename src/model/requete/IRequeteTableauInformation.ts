/* v8 ignore start */

import { IService } from "@model/agent/IService";
import { Utilisateur } from "@model/agent/Utilisateur";
import DateUtils from "@util/DateUtils";
import { IRequeteTableau } from "./IRequeteTableau";
import { mapAttribueA } from "./IRequeteTableauDelivrance";
import { ITitulaireRequeteTableau, mapTitulaires } from "./ITitulaireRequeteTableau";
import { getObjetRequeteInfoLibelle } from "./enum/ObjetRequeteInfo";
import { Qualite } from "./enum/Qualite";
import { SousTypeInformation } from "./enum/SousTypeInformation";
import { StatutRequete } from "./enum/StatutRequete";
import { TypeMandataireReq } from "./enum/TypeMandataireReq";
import { TypeRequete } from "./enum/TypeRequete";

export interface IRequeteTableauInformation extends IRequeteTableau {
  objet?: string;
  typeRequerant?: string;
  nomsTitulaires?: string;
  attribueA?: string;
  numeroTeledossier?: string;
}

//////////////////////////////////////////
/** Requetes: mapping après appel d'api */
//////////////////////////////////////////

export const mappingRequetesTableauInformation = (
  resultatsRecherche: any,
  mappingSupplementaire: boolean,
  utilisateurs: Utilisateur[],
  services: IService[]
): IRequeteTableauInformation[] => {
  return resultatsRecherche?.map((requete: any) => {
    return mappingUneRequeteTableauInformation(requete, mappingSupplementaire, utilisateurs, services);
  });
};

const mappingUneRequeteTableauInformation = (
  requete: any,
  mappingSupplementaire: boolean,
  utilisateurs: Utilisateur[],
  services: IService[]
): IRequeteTableauInformation => {
  return {
    idRequete: requete?.id || undefined,
    type: TypeRequete.INFORMATION.libelle,
    numero: requete?.numero ?? "",
    sousType: SousTypeInformation.getEnumFor(requete?.sousType).libelle,
    objet: getObjetRequeteInfoLibelle(requete.objet ?? ""),
    dateCreation: DateUtils.getFormatDateFromTimestamp(requete?.dateCreation),
    statut: StatutRequete.getEnumFor(requete?.statut)?.libelle,
    nomCompletRequerant: requete?.nomCompletRequerant ?? "",
    typeRequerant: getTypeRequerant(requete?.qualiteRequerant, requete?.typeMandataire),
    titulaires: mapTitulaires(requete?.titulaires, mappingSupplementaire),
    nomsTitulaires: getNomsTitulaires(requete?.titulaires),
    idUtilisateur: requete?.idUtilisateur || undefined,
    attribueA: mapAttribueA(requete, utilisateurs, services)
  } as IRequeteTableauInformation;
};

const getTypeRequerant = (qualiteRequerant: string, typeMandataire: string) => {
  if (typeMandataire != null) {
    return TypeMandataireReq.getEnumFor(typeMandataire ?? "").libelle;
  } else {
    return Qualite.getEnumFor(qualiteRequerant ?? "").libelle;
  }
};

const getNomsTitulaires = (titulaires: ITitulaireRequeteTableau[]) => {
  let res = "";
  let premiere = true;
  if (titulaires) {
    for (const titulaire of titulaires) {
      if (premiere) {
        premiere = false;
      } else {
        res += " ";
      }
      res += `${titulaire.nom} ${titulaire.prenoms?.[0]}`;
    }
  }
  return res;
};
/* v8 ignore stop */
