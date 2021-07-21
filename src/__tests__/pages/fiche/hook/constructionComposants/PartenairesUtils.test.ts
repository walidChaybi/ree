import { Nationalite } from "../../../../../model/etatcivil/enum/Nationalite";
import { Sexe } from "../../../../../model/etatcivil/enum/Sexe";
import { getPartenaires } from "../../../../../views/pages/fiche/hook/constructionComposants/pacs/PartenairesUtils";

test("getPartenaires", () => {
  const partenaires = [
    {
      numeroOrdreSaisi: 1,
      nomFamille: "De Gaulle",
      villeNaissance: "Lille",
      paysNaissance: "France",
      regionNaissance: "Nord",
      arrondissementNaissance: "NC",
      nationalite: Nationalite.FRANCAISE,
      sexe: Sexe.MASCULIN,
      autreNoms: [],
      autrePrenoms: [],
      prenoms: [{ valeur: "Charles", numeroOrdre: 0 }],
      dateNaissance: { jour: "22", mois: "11", annee: "1890" }
    },
    null
  ];
  const res = getPartenaires(partenaires);

  expect(res).toStrictEqual([
    {
      partContent: {
        contents: [
          { libelle: "Nom", value: "DE GAULLE" },
          { libelle: "Autre(s) nom(s)", value: "" },
          { libelle: "Prénoms", value: "Charles" },
          { libelle: "Autre(s) prénom(s)", value: "" },
          { libelle: "Date de naissance", value: "22/11/1890" },
          { libelle: "Lieu de naissance", value: "Lille (Nord)" },
          { libelle: "Nationalité", value: "Française" },
          { libelle: "Sexe", value: "Masculin" }
        ],
        title: "Partenaire 1"
      }
    },
    {
      partContent: {
        contents: [],
        title: "Partenaire 2"
      }
    }
  ]);
});
