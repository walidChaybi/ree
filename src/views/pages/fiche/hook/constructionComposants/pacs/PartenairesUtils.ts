import { AccordionPartProps } from "../../../../../common/widget/accordion/AccordionPart";
import { IPartenaire } from "../../../../../../model/etatcivil/pacs/IPartenaire";
import { joint, jointPrenoms } from "../../../../../common/util/Utils";
import { getDateStringFromDateCompose } from "../../../../../common/util/DateUtils";
import { SexeUtil } from "../../../../../../model/etatcivil/enum/Sexe";
import { LieuxUtils } from "../../../../../../model/Lieux";

export function getPartenaires(
  partenaires: IPartenaire[]
): AccordionPartProps[] {
  return partenaires.map((p, idx) => {
    return {
      title: `Partenaire ${idx + 1}`,
      contents: [
        {
          libelle: "Nom",
          value: p.nomFamille
        },
        {
          libelle: "Autre(s) nom(s)",
          value: joint(p.autreNoms)
        },
        {
          libelle: "Prénoms",
          value: jointPrenoms(p.prenoms)
        },
        {
          libelle: "Autres prénom(s)",
          value: joint(p.autrePrenoms)
        },
        {
          libelle: "Date de naissance",
          value: getDateStringFromDateCompose(p.dateNaissance)
        },
        {
          libelle: "Lieu de naissance",
          value: LieuxUtils.getLieu(
            p.villeNaissance,
            p.regionNaissance,
            p.paysNaissance,
            p.arrondissementNaissance
          )
        },
        {
          libelle: "Nationalité",
          value: p.nationalite.libelle
        },
        {
          libelle: "Sexe",
          value: SexeUtil.getLibelle(p.sexe)
        }
      ]
    };
  });
}
