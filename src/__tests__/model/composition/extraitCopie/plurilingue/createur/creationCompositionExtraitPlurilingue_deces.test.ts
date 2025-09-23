import { creationCompositionExtraitPlurilingue } from "@hook/generation/generationECHook/creationComposition/creationCompositionExtraitPlurilingue";
import { FicheActe, IFicheActeDto } from "@model/etatcivil/acte/FicheActe";
import { EValidation } from "@model/requete/enum/EValidation";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { describe, expect, test } from "vitest";
import { ficheActeDeces } from "../../../../../mock/data/ficheActe";

const mentionsRetirees: string[] = [];

describe("Composition extrait plurilingue de Décès", () => {
  test("Doit composer l'extrait avec les bonne données", () => {
    const acte = FicheActe.depuisDto(ficheActeDeces)!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, EValidation.O, SousTypeDelivrance.RDC, mentionsRetirees);

    const nom = "GREENWALD";
    const prenoms = "Marie-paulita, Zaria, Léna";
    const sexe = "F";
    const date_naissance = {
      jour: "",
      mois: 3,
      annee: 1948
    };
    const date_deces = {
      jour: 11,
      mois: 3,
      annee: 1995
    };
    const lieuNaissance = "Milan, Lombardie (Italie)";

    const nomPere = "Sacken";
    const prenomsPere = "Carmela, Linzy";

    if (compositionCorps?.titulaire_1) {
      expect(compositionCorps?.titulaire_1.nom).toBe(nom);
      expect(compositionCorps?.titulaire_1.prenoms).toBe(prenoms);
      expect(compositionCorps?.titulaire_1.sexe).toBe(sexe);
      expect(compositionCorps?.titulaire_1?.lieu_naissance).toBe(lieuNaissance);
      expect(compositionCorps?.titulaire_1.date_naissance?.jour).toBe(date_naissance.jour);
      expect(compositionCorps?.titulaire_1.nom_mere).toBe("");
      expect(compositionCorps?.titulaire_1.prenoms_mere).toBe("");
      expect(compositionCorps?.titulaire_1.nom_pere).toBe(nomPere);
      expect(compositionCorps?.titulaire_1.prenoms_pere).toBe(prenomsPere);
      expect(compositionCorps?.titulaire_1.nom_dernier_conjoint).toBe("De fontaine");
      expect(compositionCorps?.titulaire_1.prenoms_dernier_conjoint).toBe("Ratus");
      expect(compositionCorps?.titulaire_1.date_deces?.annee).toBe(date_deces.annee);
      expect(compositionCorps?.titulaire_1.lieu_deces).toBe("Lille, Loire-Atlantique (France)");
    }
  });

  test("Doit composer les données de naissance de l'extrait avec les bonne données", () => {
    const acteDto: IFicheActeDto = {
      ...ficheActeDeces,
      ...(ficheActeDeces.titulaires[0] = {
        nom: "GREENWALD",
        prenoms: ["marie-paulita", "zaria", "léna"],
        ordre: 729,
        sexe: "FEMININ",
        naissance: {
          mois: 3,
          annee: 1948,
          ville: "Milan",
          region: "Lombardie",
          pays: "Alger"
        },
        profession: "POMPIER",
        domicile: {
          voie: "7 Rue du Noyer",
          ville: "Bruxelles",
          region: "Flandre",
          pays: "BELGIQUE"
        },
        filiations: [
          {
            lienParente: "PARENT",
            ordre: 752,
            nom: "Sacken",
            sexe: "MASCULIN",
            profession: "Informaticien",
            domicile: {
              voie: "16 avenue des Palmiers",
              ville: "Djibouti",
              pays: "DJIBOUTI"
            },
            prenoms: ["Carmela", "Linzy"]
          }
        ],
        nomDernierConjoint: "De fontaine",
        prenomsDernierConjoint: "Ratus"
      })
    };

    const acte: FicheActe = FicheActe.depuisDto(acteDto)!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, EValidation.O, SousTypeDelivrance.RDC, mentionsRetirees);

    const nom = "GREENWALD";
    const prenoms = "Marie-paulita, Zaria, Léna";
    const sexe = "F";
    const date_naissance = {
      jour: "",
      mois: 3,
      annee: 1948
    };
    const date_deces = {
      jour: 11,
      mois: 3,
      annee: 1995
    };
    const lieuNaissance = "Milan, Lombardie (Alger)";

    const nomPere = "Sacken";
    const prenomsPere = "Carmela, Linzy";

    if (compositionCorps?.titulaire_1) {
      expect(compositionCorps?.titulaire_1.nom).toBe(nom);
      expect(compositionCorps?.titulaire_1.prenoms).toBe(prenoms);
      expect(compositionCorps?.titulaire_1.sexe).toBe(sexe);
      expect(compositionCorps?.titulaire_1?.lieu_naissance).toBe(lieuNaissance);
      expect(compositionCorps?.titulaire_1.date_naissance?.jour).toBe(date_naissance.jour);
      expect(compositionCorps?.titulaire_1.nom_mere).toBe("");
      expect(compositionCorps?.titulaire_1.prenoms_mere).toBe("");
      expect(compositionCorps?.titulaire_1.nom_pere).toBe(nomPere);
      expect(compositionCorps?.titulaire_1.prenoms_pere).toBe(prenomsPere);
      expect(compositionCorps?.titulaire_1.nom_dernier_conjoint).toBe("De fontaine");
      expect(compositionCorps?.titulaire_1.prenoms_dernier_conjoint).toBe("Ratus");
      expect(compositionCorps?.titulaire_1.date_deces?.annee).toBe(date_deces.annee);
      expect(compositionCorps?.titulaire_1.lieu_deces).toBe("Lille, Loire-Atlantique (France)");
    }
  });

  test("Doit composer l'extrait avec le bon formatage du lieu de naissance quand le pays est inconnu", () => {
    const acteDecesAvecPaysInconnuDto: IFicheActeDto = {
      ...ficheActeDeces,
      ...(ficheActeDeces.titulaires[0] = {
        nom: "GREENWALD",
        prenoms: ["marie-paulita", "zaria", "léna"],
        ordre: 729,
        sexe: "FEMININ",
        naissance: {
          mois: 3,
          annee: 1948,
          ville: "Milan",
          region: "Lombardie",
          pays: "Inconnu"
        },
        profession: "POMPIER",
        domicile: {
          voie: "7 Rue du Noyer",
          ville: "Bruxelles",
          region: "Flandre",
          pays: "BELGIQUE"
        },
        filiations: [
          {
            lienParente: "PARENT",
            ordre: 752,
            nom: "Sacken",
            sexe: "MASCULIN",
            profession: "Informaticien",
            domicile: {
              voie: "16 avenue des Palmiers",
              ville: "Djibouti",
              pays: "DJIBOUTI"
            },
            prenoms: ["Carmela", "Linzy"]
          }
        ],
        nomDernierConjoint: "De fontaine",
        prenomsDernierConjoint: "Ratus"
      })
    };

    const acteDecesAvecPaysInconnu: FicheActe = FicheActe.depuisDto(acteDecesAvecPaysInconnuDto)!;

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acteDecesAvecPaysInconnu,
      EValidation.O,
      SousTypeDelivrance.RDC,
      mentionsRetirees
    );

    const nom = "GREENWALD";
    const prenoms = "Marie-paulita, Zaria, Léna";
    const sexe = "F";
    const date_naissance = {
      jour: "",
      mois: 3,
      annee: 1948
    };
    const date_deces = {
      jour: 11,
      mois: 3,
      annee: 1995
    };
    const lieuNaissance = "Milan, Lombardie";

    const nomPere = "Sacken";
    const prenomsPere = "Carmela, Linzy";

    if (compositionCorps?.titulaire_1) {
      expect(compositionCorps?.titulaire_1.nom).toBe(nom);
      expect(compositionCorps?.titulaire_1.prenoms).toBe(prenoms);
      expect(compositionCorps?.titulaire_1.sexe).toBe(sexe);
      expect(compositionCorps?.titulaire_1?.lieu_naissance).toBe(lieuNaissance);
      expect(compositionCorps?.titulaire_1.date_naissance?.jour).toBe(date_naissance.jour);
      expect(compositionCorps?.titulaire_1.nom_mere).toBe("");
      expect(compositionCorps?.titulaire_1.prenoms_mere).toBe("");
      expect(compositionCorps?.titulaire_1.nom_pere).toBe(nomPere);
      expect(compositionCorps?.titulaire_1.prenoms_pere).toBe(prenomsPere);
      expect(compositionCorps?.titulaire_1.nom_dernier_conjoint).toBe("De fontaine");
      expect(compositionCorps?.titulaire_1.prenoms_dernier_conjoint).toBe("Ratus");
      expect(compositionCorps?.titulaire_1.date_deces?.annee).toBe(date_deces.annee);
      expect(compositionCorps?.titulaire_1.lieu_deces).toBe("Lille, Loire-Atlantique (France)");
    }
  });
});
