import { IPartenaire } from "../../../../../../model/etatcivil/pacs/IPartenaire";
import { LieuxUtils } from "../../../../../../model/LieuxUtils";
import { getDateStringFromDateCompose } from "../../../../../common/util/DateUtils";
import {
  formatNom,
  formatNoms,
  formatPrenoms,
  jointPrenoms
} from "../../../../../common/util/Utils";
import { SectionPartProps } from "../../../../../common/widget/section/SectionPart";

export function getPartenaires(partenaires: IPartenaire[]): SectionPartProps[] {
  return partenaires.map((p, idx) => {
    if (p) {
      return {
        partContent: {
          title: `Partenaire ${idx + 1}`,
          contents: [
            {
              libelle: "Nom",
              value: formatNom(p.nomFamille)
            },
            {
              libelle: "Autre(s) nom(s)",
              value: formatNoms(p.autreNoms)
            },
            {
              libelle: "Prénoms",
              value: jointPrenoms(p.prenoms)
            },
            {
              libelle: "Autre(s) prénom(s)",
              value: formatPrenoms(p.autrePrenoms)
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
              value: p.nationalite?.libelle
            },
            {
              libelle: "Sexe",
              value: p.sexe?.libelle
            }
          ]
        }
      };
    }
    return {
      partContent: {
        title: `Partenaire ${idx + 1}`,
        contents: []
      }
    };
  });
}
