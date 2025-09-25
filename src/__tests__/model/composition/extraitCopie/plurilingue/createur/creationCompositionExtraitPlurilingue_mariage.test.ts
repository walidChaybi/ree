import { creationCompositionExtraitPlurilingue } from "@hook/generation/generationECHook/creationComposition/creationCompositionExtraitPlurilingue";
import { creerMockAnalyseMarginaleDtoDepuisTitulaireActeDto } from "@mock/data/etatcivil/acte/mockAnalyseMarginale";
import { MOCK_EVENEMENT } from "@mock/data/etatcivil/acte/mockIEvenement";
import { MOCK_DEUX_TITULAIRES_ACTE, MOCK_TITULAIRE_ACTE } from "@mock/data/etatcivil/acte/mockTitulaireActe";
import { NATURE_MENTION } from "@mock/data/NomenclatureNatureMention";
import { TYPE_MENTION } from "@mock/data/NomenclatureTypeMention";
import { MockFicheActeBuilder } from "@mock/model/etatcivil/acte/MockFicheActe";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { NatureMention } from "@model/etatcivil/enum/NatureMention";
import { EValidation } from "@model/requete/enum/EValidation";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { describe, expect, test } from "vitest";
import { mentionsPlurilinguesMariageAvec6, mentionsPlurilinguesMariageNombre10 } from "../../../../../mock/data/mentions";

const validation = EValidation.O;
const mentionsRetirees: string[] = [];

describe("Composition extrait plurilingue de Mariage", () => {
  NatureMention.init(NATURE_MENTION);
  TypeMention.init(TYPE_MENTION);

  test("Doit retourner les bonnes informations pour les 2 titulaires", () => {
    const acte = new MockFicheActeBuilder({
      titulaires: [
        {
          nom: "MARTIN",
          prenoms: ["Jean-Louis", "Alphonse", "Raoül"],
          ordre: 1,
          sexe: "MASCULIN",
          naissance: {
            jour: 29,
            mois: 11,
            annee: 1989,
            ville: "Paris",
            pays: "France"
          },
          filiations: [],
          nomAvantMariage: "nomAvantMariage",
          nomApresMariage: "nomApresMariage"
        },
        {
          nom: "PRODESK",
          prenoms: ["Elodie", "Marie-Charlotte", "Pauline"],
          ordre: 2,
          sexe: "FEMININ",
          naissance: {
            jour: 25,
            mois: 6,
            annee: 1990,
            ville: "Barcelone",
            region: "Catalogne",
            pays: "Espagne"
          },
          filiations: [],
          nomAvantMariage: "nomAvantMariage",
          nomApresMariage: "nomApresMariage"
        }
      ]
    })
      .deNature("MARIAGE")
      .generer()!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, validation, SousTypeDelivrance.RDC, mentionsRetirees);

    const nomApresMariageAttenduT1 = "nomApresMariage";
    const nomAvantMariageAttenduT1 = "MARTIN";
    const prenomsT1 = "Jean-Louis, Alphonse, Raoül";
    const dateNaissanceT1 = {
      jour: 29,
      mois: 11,
      annee: 1989
    };
    const lieuNaissanceT1 = "Paris";

    const nomApresMariageAttenduT2 = "nomApresMariage";
    const nomAvantMariageAttenduT2 = "PRODESK";
    const prenomsT2 = "Elodie, Marie-Charlotte, Pauline";
    const dateNaissanceT2 = {
      jour: 25,
      mois: 6,
      annee: 1990
    };
    const lieuNaissanceT2 = "Barcelone, Catalogne (Espagne)";

    if (compositionCorps?.titulaire_1) {
      expect(compositionCorps.titulaire_1.nom_apres_mariage).toBe(nomApresMariageAttenduT1);
      expect(compositionCorps.titulaire_1.nom_avant_mariage).toBe(nomAvantMariageAttenduT1);
      expect(compositionCorps.titulaire_1.prenoms).toBe(prenomsT1);
      expect(compositionCorps.titulaire_1.date_naissance?.jour).toBe(dateNaissanceT1.jour);
      expect(compositionCorps.titulaire_1?.lieu_naissance).toBe(lieuNaissanceT1);
    }

    expect(compositionCorps?.titulaire_2?.nom_apres_mariage).toBe(nomApresMariageAttenduT2);
    expect(compositionCorps?.titulaire_2?.nom_avant_mariage).toBe(nomAvantMariageAttenduT2);
    expect(compositionCorps?.titulaire_2?.prenoms).toBe(prenomsT2);
    expect(compositionCorps?.titulaire_2?.date_naissance?.jour).toBe(dateNaissanceT2.jour);
    expect(compositionCorps?.titulaire_2?.lieu_naissance).toBe(lieuNaissanceT2);
  });

  test("Ne doit pas éditer les mentions supérieur à 9", () => {
    const acte = new MockFicheActeBuilder({ mentions: mentionsPlurilinguesMariageNombre10 }).deNature("MARIAGE").generer()!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, validation, SousTypeDelivrance.RDC, mentionsRetirees);

    expect(compositionCorps?.autres_enonciations_acte.nombre_enonciations).toBe(9);
  });

  test("Doit afficher les mentions quand le nombre de mentions est en dessous ou égale de la limite", () => {
    const acte = new MockFicheActeBuilder({ mentions: mentionsPlurilinguesMariageAvec6 }).deNature("MARIAGE").generer()!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, validation, SousTypeDelivrance.RDC, mentionsRetirees);

    const mentierAfficherUn = "Sc 31-01-92 Nantes Jenmi";

    expect(compositionCorps?.autres_enonciations_acte.enonciations[0]).toBe(mentierAfficherUn);
  });

  test("Doit retourner undefined quand le nom du titulaire de l'analyse marginale est égal à SNP ou prenom égale à SPC", () => {
    const acte = new MockFicheActeBuilder({
      titulaires: [
        { ...MOCK_TITULAIRE_ACTE, nom: "SNP", ordre: 1, typeDeclarationConjointe: "CHANGEMENT_NOM" },
        { ...MOCK_TITULAIRE_ACTE, prenoms: ["SPC"], ordre: 2, sexe: "FEMININ", typeDeclarationConjointe: "CHANGEMENT_NOM" }
      ]
    })
      .deNature("MARIAGE")
      .generer()!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, validation, SousTypeDelivrance.RDC, mentionsRetirees);
    expect(compositionCorps?.titulaire_1?.nom_avant_mariage).toBe("");
    expect(compositionCorps?.titulaire_2?.prenoms).toBe("");
  });

  test("Doit retourner le premier nom présent dans l'analyse marginale que celui-ci contient né ou née", () => {
    const acte = new MockFicheActeBuilder({
      analyseMarginales: creerMockAnalyseMarginaleDtoDepuisTitulaireActeDto([
        MOCK_DEUX_TITULAIRES_ACTE[0],
        { ...MOCK_DEUX_TITULAIRES_ACTE[1], nom: "Monroe née Jane" }
      ]),
      evenement: { ville: "Barcelone", pays: "Espagne", region: "Catalogne" }
    })
      .deNature("MARIAGE")
      .generer()!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, validation, SousTypeDelivrance.RDC, mentionsRetirees);

    expect(compositionCorps?.lieu_acte).toBe("Barcelone, Catalogne (Espagne)");
    expect(compositionCorps?.titulaire_2?.nom_avant_mariage).toBe("Monroe");
  });

  test("Doit retourner le dernier nom présent dans l'analyse marginale que celui-ci contient désormais", () => {
    const acte = new MockFicheActeBuilder({
      analyseMarginales: creerMockAnalyseMarginaleDtoDepuisTitulaireActeDto([
        { ...MOCK_DEUX_TITULAIRES_ACTE[0], nom: "Simon désormais Pierre" },
        MOCK_DEUX_TITULAIRES_ACTE[1]
      ])
    })
      .deNature("MARIAGE")
      .generer()!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, validation, SousTypeDelivrance.RDC, mentionsRetirees);

    expect(compositionCorps?.titulaire_1?.nom_avant_mariage).toBe("Pierre");
  });

  test("Ne doit pas afficher les même titulaires dans le document quand les 2 titulaire sont de sexe indeterminé suivant l'ordre", () => {
    const acte = new MockFicheActeBuilder({
      titulaires: MOCK_DEUX_TITULAIRES_ACTE.map(titulaire => ({ ...titulaire, sexe: "INDETERMINE" }))
    })
      .deNature("MARIAGE")
      .generer()!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, EValidation.O, SousTypeDelivrance.RDC, mentionsRetirees);

    expect(compositionCorps?.filigrane_erreur).toEqual(true);
  });

  test("Doit prendre le lieu de reprise en priorité", () => {
    const acte = new MockFicheActeBuilder({
      evenement: {
        ...MOCK_EVENEMENT,
        lieuReprise: "Lieu de reprise evenement"
      },
      titulaires: MOCK_DEUX_TITULAIRES_ACTE.map(titulaire => ({
        ...titulaire,
        naissance: {
          ...MOCK_EVENEMENT,
          lieuReprise: "Lieu de reprise naissance"
        }
      }))
    })
      .deNature("MARIAGE")
      .generer()!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, EValidation.O, SousTypeDelivrance.RDC, mentionsRetirees);

    expect(compositionCorps?.lieu_acte).toEqual("Lieu de reprise evenement");
    expect(compositionCorps?.titulaire_2?.lieu_naissance).toBe("Lieu de reprise naissance");
  });

  test("Doit formater la date de naissance correctement quand le pays est France", () => {
    const acte = new MockFicheActeBuilder({
      evenement: {
        ...MOCK_EVENEMENT,
        lieuReprise: "Lieu de reprise Nantes"
      },
      titulaires: MOCK_DEUX_TITULAIRES_ACTE.map(titulaire => ({
        ...titulaire,
        naissance: {
          ...MOCK_EVENEMENT,
          ville: "Paris",
          pays: "France"
        }
      }))
    })
      .deNature("MARIAGE")
      .generer()!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, EValidation.O, SousTypeDelivrance.RDC, mentionsRetirees);

    expect(compositionCorps?.lieu_acte).toEqual("Lieu de reprise Nantes");
    expect(compositionCorps?.titulaire_1?.lieu_naissance).toBe("Paris");
  });

  test("Doit formater la date de naissance correctement si la ville est Paris ou pas renseigner et Jérusalem", () => {
    const acte = new MockFicheActeBuilder({
      titulaires: MOCK_DEUX_TITULAIRES_ACTE.map(titulaire => ({
        ...titulaire,
        naissance: {
          ...MOCK_EVENEMENT,
          ville: "Jerusalem",
          pays: ""
        }
      }))
    })
      .deNature("MARIAGE")
      .generer()!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, EValidation.O, SousTypeDelivrance.RDC, mentionsRetirees);

    expect(compositionCorps?.titulaire_1?.lieu_naissance).toBe("Jerusalem");
  });

  test("Doit formater la date de naissance des correctement quand le pays est étranger", () => {
    const acte = new MockFicheActeBuilder({
      titulaires: [
        { ...MOCK_DEUX_TITULAIRES_ACTE[0], naissance: { ville: "Barcelone", pays: "Espagne", region: "Catalogne" } },
        MOCK_DEUX_TITULAIRES_ACTE[1]
      ]
    })
      .deNature("MARIAGE")
      .generer()!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, EValidation.O, SousTypeDelivrance.RDC, mentionsRetirees);

    expect(compositionCorps?.titulaire_1?.lieu_naissance).toBe("Barcelone, Catalogne (Espagne)");
  });

  test("Doit composer correctement le lieu de naissance quand le pays est inconnu", () => {
    const acte = new MockFicheActeBuilder({
      titulaires: [{ ...MOCK_DEUX_TITULAIRES_ACTE[0], naissance: { pays: "", ville: "Paris" } }, MOCK_DEUX_TITULAIRES_ACTE[1]]
    })
      .deNature("MARIAGE")
      .generer()!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte!, EValidation.O, SousTypeDelivrance.RDC, mentionsRetirees);

    expect(compositionCorps?.titulaire_1?.lieu_naissance).toBe("Paris");
  });
});
