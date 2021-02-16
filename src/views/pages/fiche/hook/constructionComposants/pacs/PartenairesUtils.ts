import { AccordionPartProps } from "../../../../../common/widget/accordion/AccordionPart";
import { IPartenaire } from "../../../../../../model/etatcivil/pacs/IPartenaire";
import {
  jointPrenoms,
  formatNoms,
  formatPrenoms,
  formatNom
} from "../../../../../common/util/Utils";
import { getDateStringFromDateCompose } from "../../../../../common/util/DateUtils";
import { LieuxUtils } from "../../../../../../model/Lieux";

export function getPartenaires(
  partenaires: IPartenaire[]
): AccordionPartProps[] {
  return partenaires.map((p, idx) => {
    return {
      contentsPart: {
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
            value: p.nationalite.libelle
          },
          {
            libelle: "Sexe",
            value: p.sexe.libelle
          }
        ]
      }
    };
  });
}
