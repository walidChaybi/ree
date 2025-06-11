import { PrenomsForm } from "@model/form/commun/PrenomsForm";
import { describe, expect, test } from "vitest";
import ModeleTexte, { EModeleTexteDocument } from "../../utils/ModeleTexte";

describe("Test du Helper de modele texte", () => {
  test("Enregistrement, récupération et réinitialisation d'un modèle texte", () => {
    const texte = "Texte test";

    expect(ModeleTexte.getModeleTexteDocument(EModeleTexteDocument.PROJET_NAISSANCE_MINEUR)).toBeNull();
    ModeleTexte.enregistrerModeleTexteDocument(EModeleTexteDocument.PROJET_NAISSANCE_MINEUR, texte);
    expect(ModeleTexte.getModeleTexteDocument(EModeleTexteDocument.PROJET_NAISSANCE_MINEUR)).toBe(texte);
    ModeleTexte.reinitialiserModelesTexte();
    expect(ModeleTexte.getModeleTexteDocument(EModeleTexteDocument.PROJET_NAISSANCE_MINEUR)).toBeNull();
  });

  test("Création en génération d'un texte via un modele texte", () => {
    const texteConditionsEtValeurs =
      "{{#valeur valeur1}}, {{#valeur valeur2 pas de valeur}}, {{#valeur valeurTableau aucun tableau}}, {{/nl}}, {{#if condition1}}texte1{{#if condition2}}, texte2{{/if}}{{/if}}, {{#if sinon1}}{{else}}{{#if !sinon2 false}}{{else}}sinon{{/if}}{{/if}}";
    const valeursConditionEtValeurs = {
      valeur1: "valeur1",
      valeur2: "",
      valeurTableau: [],
      condition1: true,
      condition2: true,
      sinon1: false,
      sinon2: false
    };

    expect(ModeleTexte.creer(texteConditionsEtValeurs).generer(valeursConditionEtValeurs)).toBe(
      "valeur1, PAS DE VALEUR, AUCUN TABLEAU, <br/>, texte1, texte2, sinon"
    );

    const texteDates =
      "{{#valeur date}}, {{#valeur date/sansPrefixe}}, {{#valeur moisAnnee}}, {{#valeur moisAnnee/sansPrefixe}}, {{#valeur annee}}, {{#valeur annee/sansPrefixe}}, {{#valeur dateHorsPremier}}, {{#valeur dateNonRenseignee pas de date}}";
    const valeursDate = {
      date: {
        jour: "01",
        mois: "01",
        annee: "2000"
      },
      moisAnnee: {
        jour: "",
        mois: "01",
        annee: "2000"
      },
      annee: {
        jour: "",
        mois: "",
        annee: "2000"
      },
      dateHorsPremier: {
        jour: "02",
        mois: "01",
        annee: "2000"
      },
      dateNonRenseignee: {
        jour: "",
        mois: "",
        annee: ""
      }
    };

    expect(ModeleTexte.creer(texteDates).generer(valeursDate)).toBe(
      "le 1er janvier 2000, 1er janvier 2000, en janvier 2000, janvier 2000, en 2000, 2000, le 2 janvier 2000, PAS DE DATE"
    );

    const textePrenoms = "{{#valeur prenoms}}, {{#valeur prenomsVides pas de prénoms}}";
    const valeursPrenoms = {
      prenoms: PrenomsForm.valeursInitiales([
        { prenom: "Test1", numeroOrdre: 1 },
        { prenom: "Test2", numeroOrdre: 2 },
        { prenom: "Test3", numeroOrdre: 3 }
      ]),
      prenomsVides: PrenomsForm.valeursInitiales()
    };
    expect(ModeleTexte.creer(textePrenoms).generer(valeursPrenoms)).toBe("Test1, Test2, Test3, PAS DE PRÉNOMS");
  });

  test("Création et génération d'un texte par pages via un modèle texte", () => {
    const modeleTest = "{{/nl}}Texte test, motlongtrèslongtrèslongsilong. ligne1{{/nl}}ligne2{{/nl}}ligne3";

    expect(ModeleTexte.creer(modeleTest).genererParPage({}, { tailleLigne: 11, ligneParPage: 6 })).toStrictEqual({
      "page-1": ["", "Texte test,", "motlongtrès", "longtrèslon", "gsilong.", "ligne1"],
      "page-2": ["ligne2", "ligne3"]
    });
  });
});
