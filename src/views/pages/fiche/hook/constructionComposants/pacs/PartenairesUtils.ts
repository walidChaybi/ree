import { AccordionPartProps } from "../../../../../common/widget/accordion/AccordionPart";
import { IPartenaire } from "../../../../../../model/etatcivil/pacs/IPartenaire";
import { joint, jointPrenoms } from "../../../../../common/util/Utils";
import { getDateStringFromDateCompose } from "../../../../../common/util/DateUtils";
import { NationaliteUtil } from "../../../../../../model/etatcivil/enum/Nationalite";
import { SexeUtil } from "../../../../../../model/etatcivil/enum/Sexe";

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
          value: joint([
            p.villeNaissance,
            p.paysNaissance,
            p.regionNaissance,
            p.arrondissementNaissance
          ])
        },
        {
          libelle: "Nationalité",
          value: NationaliteUtil.getLibelle(p.nationalite)
        },
        {
          libelle: "Sexe",
          value: SexeUtil.getLibelle(p.sexe)
        }
      ]
    };
  });
}
