import { NatureActe } from "../../../../../model/etatcivil/enum/NatureActe";
import { TypeActe } from "../../../../../model/etatcivil/enum/TypeActe";
import { IRequeteDelivrance } from "../../../../../model/requete/IRequeteDelivrance";
import { IRMCActeArchive } from "../../../../../model/rmc/acteArchive/rechercheForm/IRMCActeArchive";
import { IRMCActeInscription } from "../../../../../model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { getDateStringFromDateCompose } from "../../../../common/util/DateUtils";
import {
  formatNom,
  formatNoms,
  formatPrenoms,
  getValeurOuVide,
  valeurOuUndefined
} from "../../../../common/util/Utils";

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
