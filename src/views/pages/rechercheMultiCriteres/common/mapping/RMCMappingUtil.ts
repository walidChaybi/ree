import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { TypeActe } from "@model/etatcivil/enum/TypeActe";
import { TypeFamille } from "@model/etatcivil/enum/TypeFamille";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IRMCActeArchive } from "@model/rmc/acteArchive/rechercheForm/IRMCActeArchive";
import { IRMCActeInscription } from "@model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import { IResultatRMCActe } from "@model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IRMCAutoPersonneResultat } from "@model/rmc/personne/IRMCAutoPersonneResultat";
import { getDateStringFromDateCompose, IDateCompose } from "@util/DateUtils";
import {
  formatNom,
  formatNoms,
  formatPrenoms,
  getValeurOuVide,
  jointAvec,
  TROIS,
  valeurOuUndefined
} from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";

export function getCriteresTitulaire(
  criteres: IRMCActeInscription | IRMCActeArchive
) {
  return {
    nomTitulaire: valeurOuUndefined(criteres.titulaire?.nom),
    prenomTitulaire: valeurOuUndefined(criteres.titulaire?.prenom),
    jourNaissance: valeurOuUndefined(criteres.titulaire?.dateNaissance?.jour),
    moisNaissance: valeurOuUndefined(criteres.titulaire?.dateNaissance?.mois),
    anneeNaissance: valeurOuUndefined(criteres.titulaire?.dateNaissance?.annee),
    paysNaissance: valeurOuUndefined(criteres.titulaire?.paysNaissance)
  };
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
      registre: getValeurOuVide(acte.registre),
      familleRegistre: TypeFamille.getEnumFor(acte.familleRegistre),
      type: TypeActe.getEnumFor(acte.type).libelle
    };
    actesMapper.push(acteMapper);
  });
  return actesMapper;
}

export const mappingRequeteDelivranceToRMC = (
  detailRequeteState: IRequeteDelivrance
): IRMCActeArchive | IRMCActeInscription => {
  return {
    titulaire: {
      nom: detailRequeteState.titulaires?.[0].nomNaissance,
      prenom: detailRequeteState.titulaires?.[0].prenoms?.[0].prenom,
      dateNaissance: {
        annee: getValeurOuVide(
          detailRequeteState.titulaires?.[0].anneeNaissance?.toString()
        ),
        mois: detailRequeteState.titulaires?.[0].moisNaissance?.toString(),
        jour: detailRequeteState.titulaires?.[0].jourNaissance?.toString()
      },

      paysNaissance: detailRequeteState.titulaires?.[0].paysNaissance
    },
    evenement: {
      dateEvenement: {
        annee: getValeurOuVide(detailRequeteState.evenement?.annee?.toString()),
        mois: getValeurOuVide(detailRequeteState.evenement?.mois?.toString()),
        jour: getValeurOuVide(detailRequeteState.evenement?.jour?.toString())
      },
      paysEvenement: detailRequeteState.evenement?.pays
    }
  };
};

export function mappingPersonnesTableau(
  data: any[]
): IRMCAutoPersonneResultat[] {
  const tableauMapper: IRMCAutoPersonneResultat[] = [];
  data.forEach((personne: any) => {
    const personneMapper: IRMCAutoPersonneResultat = mapPersonne(personne);
    const actesLiesMapper: IRMCAutoPersonneResultat[] =
      personne.actesRepertoiresLies.map((arl: any) =>
        mapActeOuRepertoireLie(arl)
      );
    tableauMapper.push(...[personneMapper, ...actesLiesMapper]);
  });
  return tableauMapper;
}

function mapPersonne(data: any): IRMCAutoPersonneResultat {
  return {
    idPersonne: getValeurOuVide(data.idPersonne),
    nom: getValeurOuVide(data.nom),
    autresNoms: formatNoms(getValeurOuVide(data.autresNoms)),
    prenoms: formatPrenoms(getValeurOuVide(data.prenoms).slice(0, TROIS)),
    sexe: getValeurOuVide(data.sexe).charAt(0),
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
  } as IRMCAutoPersonneResultat;
}

function mapActeOuRepertoireLie(data: any): IRMCAutoPersonneResultat {
  return {
    idDocument: getValeurOuVide(data.id),
    nature: getValeurOuVide(data.nature),
    statut: getValeurOuVide(data.statut),
    reference: getValeurOuVide(data.reference),
    categorieRepertoire: getValeurOuVide(data.categorieRepertoire),
    statutOuType: jointAvec(
      [getValeurOuVide(data.statut), getValeurOuVide(data.typeInscription)],
      " / "
    )
  } as IRMCAutoPersonneResultat;
}
