import { IRMCAutoPersonneResultat } from "@hook/rmcAuto/RMCAutoPersonneApiHook";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { StatutActe } from "@model/etatcivil/enum/StatutActe";
import { StatutPacesUtil } from "@model/etatcivil/enum/StatutPacs";
import { TypeActe } from "@model/etatcivil/enum/TypeActe";
import { TypeFamille } from "@model/etatcivil/enum/TypeFamille";
import { InscriptionRcUtil } from "@model/etatcivil/enum/TypeInscriptionRc";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IRMCActeArchive } from "@model/rmc/acteArchive/rechercheForm/IRMCActeArchive";
import { IRMCActeInscription } from "@model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import { IResultatRMCActe } from "@model/rmc/acteInscription/resultat/IResultatRMCActe";
import { getDateStringFromDateCompose, IDateCompose } from "@util/DateUtils";
import {
  formatNom,
  formatNoms,
  formatPrenoms,
  getValeurOuUndefined,
  getValeurOuVide,
  premiereLettreEnMajuscule,
  TROIS
} from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";

export function getCriteresTitulaire(
  criteres: IRMCActeInscription | IRMCActeArchive
) {
  return {
    nomTitulaire: getValeurOuUndefined(criteres.titulaire?.nom),
    prenomTitulaire: getValeurOuUndefined(criteres.titulaire?.prenom),
    jourNaissance: getValeurOuUndefined(
      criteres.titulaire?.dateNaissance?.jour
    ),
    moisNaissance: getValeurOuUndefined(
      criteres.titulaire?.dateNaissance?.mois
    ),
    anneeNaissance: getValeurOuUndefined(
      criteres.titulaire?.dateNaissance?.annee
    ),
    paysNaissance: getValeurOuUndefined(criteres.titulaire?.paysNaissance)
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
      dateEvenement: getDateStringFromDateCompose({
        jour: acte.jourEvenement,
        mois: acte.moisEvenement,
        annee: acte.anneeEvenement
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
    idDocument: getValeurOuVide(data.id),
    nature: premiereLettreEnMajuscule(nature),
    statut: getValeurOuVide(data.statut),
    reference: getValeurOuVide(data.reference),
    categorieRepertoire: getValeurOuVide(data.categorieRepertoire),
    statutOuType: statutOuType
  } as IRMCAutoPersonneResultat;
}
