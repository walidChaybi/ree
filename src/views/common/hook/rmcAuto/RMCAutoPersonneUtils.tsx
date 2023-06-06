import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { StatutActe } from "@model/etatcivil/enum/StatutActe";
import { StatutPacesUtil } from "@model/etatcivil/enum/StatutPacs";
import { FicheUtil, TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { InscriptionRcUtil } from "@model/etatcivil/enum/TypeInscriptionRc";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { IRMCAutoPersonneRequest } from "@model/rmc/personne/IRMCAutoPersonneRequest";
import { IDateCompose, getDateStringFromDateCompose } from "@util/DateUtils";
import {
  UN,
  getValeurOuUndefined,
  getValeurOuVide,
  jointAvec
} from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { NB_LIGNES_PAR_APPEL_PERSONNE } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import {
  IActeInscriptionRMCPersonne,
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
      jourNaissance: getValeurOuUndefined(titulaire?.jourNaissance?.toString()),
      moisNaissance: getValeurOuUndefined(titulaire?.moisNaissance?.toString()),
      anneeNaissance: getValeurOuUndefined(
        titulaire?.anneeNaissance?.toString()
      )
    },
    range: `0-${NB_LIGNES_PAR_APPEL_PERSONNE}`
  };
}

export function concatValeursRMCAutoPersonneRequest(
  request?: IRMCAutoPersonneRequest
): string {
  return request
    ? jointAvec(
        [
          getValeurOuVide(request?.nomTitulaire),
          getValeurOuVide(request?.prenomTitulaire),
          getValeurOuVide(request?.jourNaissance),
          getValeurOuVide(request?.moisNaissance),
          getValeurOuVide(request?.anneeNaissance)
        ],
        "-"
      )
    : "";
}

export function mappingRMCPersonneResultat(
  resultatRMCPersonne: any[]
): IRMCPersonneResultat[] {
  const resultat: IRMCPersonneResultat[] = [];
  resultatRMCPersonne.forEach((resultatCourant: any) => {
    const personne: IPersonneRMCPersonne = mapPersonne(resultatCourant);
    const actesInscriptions: IActeInscriptionRMCPersonne[] =
      resultatCourant.actesRepertoiresLies.map((acteRepertoireLie: any) =>
        mapActeInscription(acteRepertoireLie)
      );
    resultat.push({
      personne,
      actesInscriptions
    });
  });
  return resultat;
}

function mapPersonne(personne: any): IPersonneRMCPersonne {
  return {
    idPersonne: getValeurOuVide(personne.idPersonne),
    nom: getValeurOuVide(personne.nom),
    autresNoms: getValeurOuVide(personne.autresNoms),
    prenoms: getValeurOuVide(personne.prenoms),
    sexe: Sexe.getEnumFor(getValeurOuVide(personne.sexe)),
    dateNaissance: getDateStringFromDateCompose({
      annee: getValeurOuVide(personne.anneeNaissance),
      mois: getValeurOuVide(personne.moisNaissance),
      jour: getValeurOuVide(personne.jourNaissance)
    } as IDateCompose),
    lieuNaissance: LieuxUtils.getLieu(
      personne.villeNaissance,
      undefined,
      personne.paysNaissance
    )
  };
}

function mapActeInscription(
  acteInscriptionLie: any
): IActeInscriptionRMCPersonne {
  const typeFiche = acteInscriptionLie.categorieRepertoire
    ? FicheUtil.getTypeFicheFromString(
        getValeurOuVide(acteInscriptionLie.categorieRepertoire)
      )
    : TypeFiche.ACTE;
  let statutOuType: string;
  let nature: string;
  switch (typeFiche) {
    case TypeFiche.RC:
    case TypeFiche.RCA:
      nature = getValeurOuVide(acteInscriptionLie.nature);
      statutOuType = InscriptionRcUtil.getLibelle(
        getValeurOuVide(acteInscriptionLie.typeInscription)
      );
      break;
    case TypeFiche.PACS:
      nature = "";
      statutOuType = StatutPacesUtil.getLibelle(
        getValeurOuVide(acteInscriptionLie.statut)
      );
      break;
    case TypeFiche.ACTE:
      nature = NatureActe.getEnumFor(
        getValeurOuVide(acteInscriptionLie.nature)
      ).libelle;
      statutOuType = StatutActe.getEnumFor(
        getValeurOuVide(acteInscriptionLie.statut)
      ).libelle;
      break;
  }

  return {
    idActeInscription: getValeurOuVide(acteInscriptionLie.id),
    nature,
    statut: getValeurOuVide(acteInscriptionLie.statut),
    reference: getValeurOuVide(acteInscriptionLie.reference),
    typeFiche,
    statutOuType
  };
}
