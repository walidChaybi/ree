import { pacsModificationNotaire } from "@mock/data/fichePACS";
import { FichePacs } from "@model/etatcivil/pacs/FichePacs";
import { Partenaire } from "@model/etatcivil/pacs/Partenaire";
import { describe, expect, test } from "vitest";

describe("Test Partenaire", () => {
  test("Partenaires comme Tableau de SectionPartProps", () => {
    const partenaire1 = {
      numeroOrdreSaisi: 1,
      nomFamille: "De Gaulle",
      villeNaissance: "Lille",
      paysNaissance: "France",
      regionNaissance: "Nord",
      arrondissementNaissance: "NC",
      nationalite: "FRANCAISE",
      sexe: "MASCULIN",
      autreNoms: [],
      autrePrenoms: [],
      prenoms: [{ valeur: "Charles", numeroOrdre: 0 }],
      dateNaissance: { jour: "22", mois: "11", annee: "1890" }
    };

    const res = Partenaire.commeTableauSectionPartProps([Partenaire.depuisDto(partenaire1), null]);

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
});

describe("Test FichePacs", () => {
  test("FichePacs comme Panel AccordionReceSection", () => {
    const panels = (FichePacs.depuisDto(pacsModificationNotaire.data) as FichePacs).commePanelAccordionReceSection;
    expect(panels.panels).toHaveLength(1);
    expect(panels.panels[0].panelAreas).toHaveLength(5);
    expect(panels.panels[0].title).toBe("Visualisation du PACS");
  });
});
