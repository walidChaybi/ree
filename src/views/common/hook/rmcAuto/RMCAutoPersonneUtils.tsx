import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { StatutActe } from "@model/etatcivil/enum/StatutActe";
import { StatutPacesUtil } from "@model/etatcivil/enum/StatutPacs";
import { InscriptionRcUtil } from "@model/etatcivil/enum/TypeInscriptionRc";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { IRMCAutoPersonneRequest } from "@model/rmc/personne/IRMCAutoPersonneRequest";
import { getDateStringFromDateCompose, IDateCompose } from "@util/DateUtils";
import { getValeurOuUndefined, getValeurOuVide, UN } from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { NB_LIGNES_PAR_APPEL_PERSONNE } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import {
  IActesOuInscriptionsRMCPersonne,
  IPersonneRMCPersonne,
  IRMCPersonneResultat
} from "./IRMCPersonneResultat";
import { IRMCAutoPersonneParams } from "./RMCAutoPersonneApiHook";

export function mapTitulaireVersRMCAutoPersonneParams(
  titulaire: ITitulaireRequeteCreation
): IRMCAutoPersonneParams {
  return {
    valeurs: {
      nomTitulaire: getValeurOuUndefined(titulaire?.nomNaissance),
      prenomTitulaire: getValeurOuUndefined(
        titulaire?.prenoms?.filter(prenom => prenom.numeroOrdre === UN).pop()
          ?.prenom
      ),
      jourNaissance: getValeurOuUndefined(titulaire?.jourNaissance),
      moisNaissance: getValeurOuUndefined(titulaire?.moisNaissance),
      anneeNaissance: getValeurOuUndefined(titulaire?.anneeNaissance)
    },
    range: `0-${NB_LIGNES_PAR_APPEL_PERSONNE}`
  };
}

export function concatValeursRMCAutoPersonneRequest(
  request?: IRMCAutoPersonneRequest
): string {
  return `${getValeurOuVide(request?.nomTitulaire)}-
  ${getValeurOuVide(request?.prenomTitulaire)}-
  ${getValeurOuVide(request?.jourNaissance)}-
  ${getValeurOuVide(request?.moisNaissance)}-
  ${getValeurOuVide(request?.anneeNaissance)}`;
}

export function mappingRMCPersonneResultat(
  data: any[]
): IRMCPersonneResultat[] {
  const resultat: IRMCPersonneResultat[] = [];
  data.forEach((valeur: any) => {
    const personne: IPersonneRMCPersonne = mapPersonne(valeur);
    const actesOuInscriptionsLies: IActesOuInscriptionsRMCPersonne[] =
      valeur.actesRepertoiresLies.map((arl: any) =>
        mapActeOuRepertoireLie(arl)
      );
    resultat.push({
      personne,
      actesOuInscriptionsLies
    });
  });
  return resultat;
}

function mapPersonne(data: any): IPersonneRMCPersonne {
  return {
    idPersonne: getValeurOuVide(data.idPersonne),
    nom: getValeurOuVide(data.nom),
    autresNoms: getValeurOuVide(data.autresNoms),
    prenoms: getValeurOuVide(data.prenoms),
    sexe: Sexe.getEnumFor(getValeurOuVide(data.sexe)),
    dateNaissance: getDateStringFromDateCompose({
      annee: getValeurOuVide(data.anneeNaissance),
      mois: getValeurOuVide(data.moisNaissance),
      jour: getValeurOuVide(data.jourNaissance)
    } as IDateCompose),
    lieuNaissance: LieuxUtils.getLieu(
      data.villeNaissance,
      undefined,
      data.paysNaissance
    )
  };
}

function mapActeOuRepertoireLie(data: any): IActesOuInscriptionsRMCPersonne {
  let statutOuType: string;
  let nature: string;
  switch (data.categorieRepertoire) {
    case "RC":
    case "RCA":
      nature = getValeurOuVide(data.nature);
      statutOuType = InscriptionRcUtil.getLibelle(
        getValeurOuVide(data.typeInscription)
      );
      break;
    case "PACS":
      nature = "";
      statutOuType = StatutPacesUtil.getLibelle(getValeurOuVide(data.statut));
      break;
    case null: // Acte
      nature = NatureActe.getEnumFor(getValeurOuVide(data.nature)).libelle;
      statutOuType = StatutActe.getEnumFor(
        getValeurOuVide(data.statut)
      ).libelle;
      break;
    default:
      nature = "";
      statutOuType = "";
  }

  return {
    idActeOuInscription: getValeurOuVide(data.id),
    nature,
    statut: getValeurOuVide(data.statut),
    reference: getValeurOuVide(data.reference),
    categorieRepertoire: getValeurOuVide(data.categorieRepertoire),
    statutOuType
  };
}
