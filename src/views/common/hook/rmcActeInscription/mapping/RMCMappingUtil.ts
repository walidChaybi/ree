import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { TypeActe } from "@model/etatcivil/enum/TypeActe";
import { TypeFamille } from "@model/etatcivil/enum/TypeFamille";
import { IRMCActeArchive } from "@model/rmc/acteArchive/rechercheForm/IRMCActeArchive";
import { IRMCActeInscription } from "@model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import { IResultatRMCActe } from "@model/rmc/acteInscription/resultat/IResultatRMCActe";
import DateUtils from "@util/DateUtils";
import { formatNom, formatNoms, formatPrenoms, getValeurOuUndefined, getValeurOuVide } from "@util/Utils";

export function getCriteresTitulaire(criteres: IRMCActeInscription | IRMCActeArchive) {
  return {
    nomTitulaire: getValeurOuUndefined(criteres.titulaire?.nom),
    prenomTitulaire: getValeurOuUndefined(criteres.titulaire?.prenom),
    jourNaissance: getValeurOuUndefined(criteres.titulaire?.dateNaissance?.jour),
    moisNaissance: getValeurOuUndefined(criteres.titulaire?.dateNaissance?.mois),
    anneeNaissance: getValeurOuUndefined(criteres.titulaire?.dateNaissance?.annee),
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
      dateNaissance: DateUtils.getDateStringFromDateCompose({
        jour: acte.jourNaissance,
        mois: acte.moisNaissance,
        annee: acte.anneeNaissance
      }),
      dateEvenement: DateUtils.getDateStringFromDateCompose({
        jour: acte.jourEvenement,
        mois: acte.moisEvenement,
        annee: acte.anneeEvenement
      }),
      paysNaissance: getValeurOuVide(acte.paysNaissance),
      nature: NatureActe.getEnumFor(acte.nature).libelle,
      referenceRece: getValeurOuVide(acte.referenceRece),
      referenceRegistre: getValeurOuVide(acte.referenceRegistre),
      familleRegistre: TypeFamille.getEnumFor(acte.familleRegistre),
      type: TypeActe.getEnumFor(acte.type).libelle
    };
    actesMapper.push(acteMapper);
  });
  return actesMapper;
}
