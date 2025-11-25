import { EStatutActe } from "@model/etatcivil/enum/EStatutActe";
import { EStatutPacs } from "@model/etatcivil/enum/EStatutPacs";
import { ETypeFiche } from "@model/etatcivil/enum/ETypeFiche";
import { ETypeInscriptionRc } from "@model/etatcivil/enum/ETypeInscriptionRc";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { IRMCAutoTitulaireDto } from "@model/rmc/acteInscription/rechercheForm/IRMCAutoTitulaireDto";
import DateUtils, { IDateCompose } from "@util/DateUtils";
import { jointAvec } from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { IActeInscriptionRMCPersonne, IPersonneRMCPersonne, IRMCPersonneResultat } from "./IRMCPersonneResultat";

export const concatValeursRMCAutoPersonneRequest = (criteresTitulaire?: IRMCAutoTitulaireDto): string =>
  jointAvec(
    [
      criteresTitulaire?.nom ?? "",
      criteresTitulaire?.prenom ?? "",
      criteresTitulaire?.dateNaissance?.jour ?? "",
      criteresTitulaire?.dateNaissance?.mois ?? "",
      criteresTitulaire?.dateNaissance?.annee ?? ""
    ],
    "-"
  );

export const mappingRMCPersonneResultat = (resultatRMCPersonne: any[]): IRMCPersonneResultat[] => {
  const resultat: IRMCPersonneResultat[] = [];
  resultatRMCPersonne.forEach((resultatCourant: any) => {
    const personne: IPersonneRMCPersonne = mapPersonne(resultatCourant);
    const actesInscriptions: IActeInscriptionRMCPersonne[] = resultatCourant.actesRepertoiresLies.map((acteRepertoireLie: any) =>
      mapActeInscription(acteRepertoireLie)
    );
    resultat.push({
      personne,
      actesInscriptions
    });
  });
  return resultat;
};

const mapPersonne = (personne: any): IPersonneRMCPersonne => {
  return {
    idPersonne: personne.idPersonne ?? "",
    nom: personne.nom ?? "",
    autresNoms: personne.autresNoms ?? "",
    prenoms: personne.prenoms ?? "",
    sexe: Sexe.getEnumFor(personne.sexe ?? ""),
    dateNaissance: DateUtils.getDateStringFromDateCompose({
      annee: personne.anneeNaissance ?? "",
      mois: personne.moisNaissance ?? "",
      jour: personne.jourNaissance ?? ""
    } as IDateCompose),
    lieuNaissance: LieuxUtils.getLieu(personne.villeNaissance, undefined, personne.paysNaissance)
  };
};

const mapActeInscription = (acteInscriptionLie: any): IActeInscriptionRMCPersonne => {
  const typeFiche = acteInscriptionLie.categorieRepertoire
    ? ETypeFiche[(acteInscriptionLie.categorieRepertoire as string).toLocaleUpperCase() as keyof typeof ETypeFiche]
    : ETypeFiche.ACTE;
  let statutOuType: string;
  let nature: string;
  switch (typeFiche) {
    case ETypeFiche.RC:
    case ETypeFiche.RCA:
      nature = acteInscriptionLie.nature ?? "";
      statutOuType = ETypeInscriptionRc[acteInscriptionLie.typeInscription as keyof typeof ETypeInscriptionRc];
      break;
    case ETypeFiche.PACS:
      nature = "";
      statutOuType = Object.keys(EStatutPacs).includes(acteInscriptionLie.statut)
        ? EStatutPacs[acteInscriptionLie.statut as keyof typeof EStatutPacs]
        : "";
      break;
    case ETypeFiche.ACTE:
      nature = NatureActe.getEnumFor(acteInscriptionLie.nature ?? "").libelle;
      statutOuType = EStatutActe[acteInscriptionLie.statut as keyof typeof EStatutActe] ?? "";
      break;
  }

  return {
    idActeInscription: acteInscriptionLie.id ?? "",
    nature,
    statut: acteInscriptionLie.statut ?? "",
    reference: acteInscriptionLie.reference ?? "",
    typeFiche,
    statutOuType
  };
};
