import { getFormatDateFromTimestamp } from "../../views/common/util/DateUtils";
import {
  getValeurOuVide,
  valeurOuUndefined
} from "../../views/common/util/Utils";
import { ObjetRequete } from "./enum/ObjetRequete";
import { Qualite } from "./enum/Qualite";
import { SousTypeInformation } from "./enum/SousTypeInformation";
import { StatutRequete } from "./enum/StatutRequete";
import { TypeMandataireReq } from "./enum/TypeMandataireReq";
import { IRequeteTableau } from "./IRequeteTableau";
import { mapAttribueA } from "./IRequeteTableauDelivrance";
import {
  ITitulaireRequeteTableau,
  mapTitulaires
} from "./ITitulaireRequeteTableau";

export interface IRequeteTableauInformation extends IRequeteTableau {
  objet?: string;
  typeRequerant?: string;
  nomsTitulaires?: string;
  attribueA?: string;
}

//////////////////////////////////////////
/** Requetes: mapping après appel d'api */
//////////////////////////////////////////

export function mappingRequetesTableauInformation(
  resultatsRecherche: any,
  mappingSupplementaire: boolean
): IRequeteTableauInformation[] {
  return resultatsRecherche?.map((requete: any) => {
    return mappingUneRequeteTableauInformation(requete, mappingSupplementaire);
  });
}

export function mappingUneRequeteTableauInformation(
  requete: any,
  mappingSupplementaire: boolean
): IRequeteTableauInformation {
  return {
    idRequete: valeurOuUndefined(requete?.id),
    numero: getValeurOuVide(requete?.numero),
    sousType: SousTypeInformation.getEnumFor(requete?.sousType).libelle,
    objet: ObjetRequete.getEnumFor(getValeurOuVide(requete.objet)).libelle,
    dateCreation: getFormatDateFromTimestamp(requete?.dateCreation),
    statut: StatutRequete.getEnumFor(requete?.statut)?.libelle,
    nomCompletRequerant: getValeurOuVide(requete?.nomCompletRequerant),
    typeRequerant: getTypeRequerant(
      requete?.qualiteRequerant,
      requete?.typeMandataire
    ),
    titulaires: mapTitulaires(requete?.titulaires, mappingSupplementaire),
    nomsTitulaires: getNomsTitulaires(requete?.titulaires),
    idUtilisateur: valeurOuUndefined(requete?.idUtilisateur),
    attribueA: mapAttribueA(requete)
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
      res += `${titulaire.nom} ${titulaire.prenoms[0]}`;
    }
  }
  return res;
}
