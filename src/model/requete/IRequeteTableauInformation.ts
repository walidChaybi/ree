import { IService } from "@model/agent/IService";
import { IUtilisateur } from "@model/agent/IUtilisateur";
import { getFormatDateFromTimestamp } from "@util/DateUtils";
import { getValeurOuUndefined, getValeurOuVide } from "@util/Utils";
import { IRequeteTableau } from "./IRequeteTableau";
import { mapAttribueA } from "./IRequeteTableauDelivrance";
import {
  ITitulaireRequeteTableau,
  mapTitulaires
} from "./ITitulaireRequeteTableau";
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
  numeroTeledossierOuSDANFOuFonctionnel?: string;
}

//////////////////////////////////////////
/** Requetes: mapping après appel d'api */
//////////////////////////////////////////

export function mappingRequetesTableauInformation(
  resultatsRecherche: any,
  mappingSupplementaire: boolean,
  utilisateurs: IUtilisateur[],
  services: IService[]
): IRequeteTableauInformation[] {
  return resultatsRecherche?.map((requete: any) => {
    return mappingUneRequeteTableauInformation(
      requete,
      mappingSupplementaire,
      utilisateurs,
      services
    );
  });
}

export function mappingUneRequeteTableauInformation(
  requete: any,
  mappingSupplementaire: boolean,
  utilisateurs: IUtilisateur[],
  services: IService[]
): IRequeteTableauInformation {
  return {
    idRequete: getValeurOuUndefined(requete?.id),
    type: TypeRequete.INFORMATION.libelle,
    numero: getValeurOuVide(requete?.numero),
    sousType: SousTypeInformation.getEnumFor(requete?.sousType).libelle,
    objet: getObjetRequeteInfoLibelle(getValeurOuVide(requete.objet)),
    dateCreation: getFormatDateFromTimestamp(requete?.dateCreation),
    statut: StatutRequete.getEnumFor(requete?.statut)?.libelle,
    nomCompletRequerant: getValeurOuVide(requete?.nomCompletRequerant),
    typeRequerant: getTypeRequerant(
      requete?.qualiteRequerant,
      requete?.typeMandataire
    ),
    titulaires: mapTitulaires(requete?.titulaires, mappingSupplementaire),
    nomsTitulaires: getNomsTitulaires(requete?.titulaires),
    idUtilisateur: getValeurOuUndefined(requete?.idUtilisateur),
    attribueA: mapAttribueA(requete, utilisateurs, services)
  } as IRequeteTableauInformation;
}

function getTypeRequerant(qualiteRequerant: string, typeMandataire: string) {
  if (typeMandataire != null) {
    return TypeMandataireReq.getEnumFor(getValeurOuVide(typeMandataire))
      .libelle;
  } else {
    return Qualite.getEnumFor(getValeurOuVide(qualiteRequerant)).libelle;
  }
}

function getNomsTitulaires(titulaires: ITitulaireRequeteTableau[]) {
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
}
