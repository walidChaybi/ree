import { creationCompositionExtraitPlurilingue } from "@hook/generation/generationECHook/creationComposition/creationCompositionExtraitPlurilingue";
import { mapActe } from "@hook/repertoires/MappingRepertoires";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { Validation } from "@model/requete/enum/Validation";
import request from "superagent";
import { ficheActeDeces } from "../../../../../../mock/data/ficheActe";
import { configRequetes } from "../../../../../../mock/superagent-config/superagent-mock-requetes";

const superagentMock = require("superagent-mock")(request, [configRequetes[0]]);

const validation = "O";
const mentionsRetirees: string[] = [];

beforeAll(() => {
  DocumentDelivrance.init();
});

afterAll(() => {
  superagentMock.unset();
});

describe("Composition extrait plurilingue de Décès", () => {
  test("Doit composer l'extrait avec les bonne données", () => {
    const acte = mapActe(ficheActeDeces.data);

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      Validation.O,
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
    const lieuNaissance = "Milan, Lombardie (Italie)";

    const nomPere = "Sacken";
    const prenomsPere = "Carmela, Linzy";

    if (compositionCorps.titulaire_1) {
      expect(compositionCorps.titulaire_1.nom).toBe(nom);
      expect(compositionCorps.titulaire_1.prenoms).toBe(prenoms);
      expect(compositionCorps.titulaire_1.sexe).toBe(sexe);
      expect(compositionCorps.titulaire_1?.lieu_naissance).toBe(lieuNaissance);
      expect(compositionCorps.titulaire_1.date_naissance?.jour).toBe(
        date_naissance.jour
      );
      expect(compositionCorps.titulaire_1.nom_mere).toBe("");
      expect(compositionCorps.titulaire_1.prenoms_mere).toBe("");
      expect(compositionCorps.titulaire_1.nom_pere).toBe(nomPere);
      expect(compositionCorps.titulaire_1.prenoms_pere).toBe(prenomsPere);
      expect(compositionCorps.titulaire_1.nom_dernier_conjoint).toBe(
        "De fontaine"
      );
      expect(compositionCorps.titulaire_1.prenoms_dernier_conjoint).toBe(
        "Ratus"
      );
      expect(compositionCorps.titulaire_1.date_deces?.annee).toBe(
        date_deces.annee
      );
      expect(compositionCorps.titulaire_1.lieu_deces).toBe(
        "Lille, Loire-Atlantique (France)"
      );
    }
  });

  test("Doit composer les données de naissance de l'extrait avec les bonne données", () => {
    const acte = {
      ...ficheActeDeces.data,
      ...(ficheActeDeces.data.titulaires[0] = {
        nom: "GREENWALD",
        prenoms: ["marie-paulita", "zaria", "léna"],
        autresNoms: null,
        autresPrenoms: null,
        ordre: 729,
        sexe: "FEMININ",
        naissance: {
          minute: null,
          heure: null,
          jour: null,
          mois: 3,
          annee: 1948,
          voie: null,
          ville: "Milan",
          arrondissement: null,
          region: "Lombardie",
          pays: "Alger",
          lieuReprise: null
        },
        profession: "POMPIER",
        age: null,
        domicile: {
          voie: "7 Rue du Noyer",
          ville: "Bruxelles",
          arrondissement: null,
          region: "Flandre",
          pays: "BELGIQUE"
        },
        filiations: [
          {
            lienParente: "PARENT",
            ordre: 752,
            nom: "Sacken",
            sexe: "MASCULIN",
            naissance: null,
            profession: "Informaticien",
            age: null,
            domicile: {
              voie: "16 avenue des Palmiers",
              ville: "Djibouti",
              arrondissement: null,
              region: null,
              pays: "DJIBOUTI"
            },
            prenoms: ["Carmela", "Linzy"]
          }
        ],
        typeDeclarationConjointe: null,
        dateDeclarationConjointe: null,
        nomPartie1: null,
        nomPartie2: null,
        nomAvantMariage: null,
        nomApresMariage: null,
        nomDernierConjoint: "De fontaine",
        prenomsDernierConjoint: "Ratus"
      })
    };

    const compositionCorps = creationCompositionExtraitPlurilingue(
      mapActe(acte) as any as IFicheActe,
      Validation.O,
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
    const lieuNaissance = "Milan, Lombardie (Alger)";

    const nomPere = "Sacken";
    const prenomsPere = "Carmela, Linzy";

    if (compositionCorps.titulaire_1) {
      expect(compositionCorps.titulaire_1.nom).toBe(nom);
      expect(compositionCorps.titulaire_1.prenoms).toBe(prenoms);
      expect(compositionCorps.titulaire_1.sexe).toBe(sexe);
      expect(compositionCorps.titulaire_1?.lieu_naissance).toBe(lieuNaissance);
      expect(compositionCorps.titulaire_1.date_naissance?.jour).toBe(
        date_naissance.jour
      );
      expect(compositionCorps.titulaire_1.nom_mere).toBe("");
      expect(compositionCorps.titulaire_1.prenoms_mere).toBe("");
      expect(compositionCorps.titulaire_1.nom_pere).toBe(nomPere);
      expect(compositionCorps.titulaire_1.prenoms_pere).toBe(prenomsPere);
      expect(compositionCorps.titulaire_1.nom_dernier_conjoint).toBe(
        "De fontaine"
      );
      expect(compositionCorps.titulaire_1.prenoms_dernier_conjoint).toBe(
        "Ratus"
      );
      expect(compositionCorps.titulaire_1.date_deces?.annee).toBe(
        date_deces.annee
      );
      expect(compositionCorps.titulaire_1.lieu_deces).toBe(
        "Lille, Loire-Atlantique (France)"
      );
    }
  });

  test("Doit composer l'extrait avec le bon formatage du lieu de naissance quand le pays est inconnu", () => {
    const acteDecesAvecPaysInconnu = {
      ...ficheActeDeces.data,
      ...(ficheActeDeces.data.titulaires[0] = {
        nom: "GREENWALD",
        prenoms: ["marie-paulita", "zaria", "léna"],
        autresNoms: null,
        autresPrenoms: null,
        ordre: 729,
        sexe: "FEMININ",
        naissance: {
          minute: null,
          heure: null,
          jour: null,
          mois: 3,
          annee: 1948,
          voie: null,
          ville: "Milan",
          arrondissement: null,
          region: "Lombardie",
          pays: "Inconnu",
          lieuReprise: null
        },
        profession: "POMPIER",
        age: null,
        domicile: {
          voie: "7 Rue du Noyer",
          ville: "Bruxelles",
          arrondissement: null,
          region: "Flandre",
          pays: "BELGIQUE"
        },
        filiations: [
          {
            lienParente: "PARENT",
            ordre: 752,
            nom: "Sacken",
            sexe: "MASCULIN",
            naissance: null,
            profession: "Informaticien",
            age: null,
            domicile: {
              voie: "16 avenue des Palmiers",
              ville: "Djibouti",
              arrondissement: null,
              region: null,
              pays: "DJIBOUTI"
            },
            prenoms: ["Carmela", "Linzy"]
          }
        ],
        typeDeclarationConjointe: null,
        dateDeclarationConjointe: null,
        nomPartie1: null,
        nomPartie2: null,
        nomAvantMariage: null,
        nomApresMariage: null,
        nomDernierConjoint: "De fontaine",
        prenomsDernierConjoint: "Ratus"
      })
    };

    const compositionCorps = creationCompositionExtraitPlurilingue(
      mapActe(acteDecesAvecPaysInconnu) as any as IFicheActe,
      Validation.O,
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

    if (compositionCorps.titulaire_1) {
      expect(compositionCorps.titulaire_1.nom).toBe(nom);
      expect(compositionCorps.titulaire_1.prenoms).toBe(prenoms);
      expect(compositionCorps.titulaire_1.sexe).toBe(sexe);
      expect(compositionCorps.titulaire_1?.lieu_naissance).toBe(lieuNaissance);
      expect(compositionCorps.titulaire_1.date_naissance?.jour).toBe(
        date_naissance.jour
      );
      expect(compositionCorps.titulaire_1.nom_mere).toBe("");
      expect(compositionCorps.titulaire_1.prenoms_mere).toBe("");
      expect(compositionCorps.titulaire_1.nom_pere).toBe(nomPere);
      expect(compositionCorps.titulaire_1.prenoms_pere).toBe(prenomsPere);
      expect(compositionCorps.titulaire_1.nom_dernier_conjoint).toBe(
        "De fontaine"
      );
      expect(compositionCorps.titulaire_1.prenoms_dernier_conjoint).toBe(
        "Ratus"
      );
      expect(compositionCorps.titulaire_1.date_deces?.annee).toBe(
        date_deces.annee
      );
      expect(compositionCorps.titulaire_1.lieu_deces).toBe(
        "Lille, Loire-Atlantique (France)"
      );
    }
  });
});
