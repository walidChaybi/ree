import { pacsModificationNotaire, pacsModificationNotaireMap } from "@mock/data/fichePACS";
import { ENationalite } from "@model/etatcivil/enum/Nationalite";
import { ESexe } from "@model/etatcivil/enum/Sexe";
import { FichePacs } from "@model/etatcivil/pacs/FichePacs";
import { IPartenaireDTO, Partenaire } from "@model/etatcivil/pacs/Partenaire";
import { describe, expect, test, vi } from "vitest";

describe("Test Partenaire", () => {
  describe("test modeles DTO invalides", () => {
    test("Erreur si le sexe est invalide", () => {
      const consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => {});

      const partenaire: IPartenaireDTO = {
        ...pacsModificationNotaireMap.partenaires[0],
        sexe: "nul" as unknown as keyof typeof ESexe
      };

      Partenaire.depuisDto(partenaire);

      expect(consoleErrorMock).toHaveBeenCalledWith(
        "Le sexe d'un Partenaire a la valeur nul au lieu d'une des suivantes : MASCULIN,FEMININ,INDETERMINE,INCONNU."
      );

      consoleErrorMock.mockRestore();
    });

    test("Erreur si la nationalite est invalide", () => {
      const consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => {});

      const partenaire: IPartenaireDTO = {
        ...pacsModificationNotaireMap.partenaires[0],
        nationalite: "nul" as unknown as keyof typeof ENationalite
      };

      Partenaire.depuisDto(partenaire);

      expect(consoleErrorMock).toHaveBeenCalledWith(
        "La nationalité d'un Partenaire a la valeur nul au lieu d'une des suivantes : FRANCAISE,ETRANGERE,INCONNUE."
      );

      consoleErrorMock.mockRestore();
    });

    test("Erreur si un attribut obligatoire est manquant", () => {
      const consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => {});

      const partenaire: IPartenaireDTO = {
        ...pacsModificationNotaireMap.partenaires[0],
        nomFamille: undefined as unknown as keyof typeof ENationalite
      };

      Partenaire.depuisDto(partenaire);

      expect(consoleErrorMock).toHaveBeenCalledWith("Un champ obligatoire d'un Partenaire n'est pas défini.");

      consoleErrorMock.mockRestore();
    });
  });

  test("Partenaires comme Tableau de SectionPartProps", () => {
    const partenaire1: IPartenaireDTO = {
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
