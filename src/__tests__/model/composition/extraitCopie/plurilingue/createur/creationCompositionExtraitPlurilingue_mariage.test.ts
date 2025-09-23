import { creationCompositionExtraitPlurilingue } from "@hook/generation/generationECHook/creationComposition/creationCompositionExtraitPlurilingue";
import { NATURE_MENTION } from "@mock/data/NomenclatureNatureMention";
import { TYPE_MENTION } from "@mock/data/NomenclatureTypeMention";
import { FicheActe, IFicheActeDto } from "@model/etatcivil/acte/FicheActe";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { Mention } from "@model/etatcivil/acte/mention/Mention";
import { NatureMention } from "@model/etatcivil/enum/NatureMention";
import { EValidation } from "@model/requete/enum/EValidation";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { describe, expect, test } from "vitest";
import {
  ficheActeAvecDeuxTitulaireIndetermine,
  ficheActeAvecImage,
  ficheActeAvecUnNomTitulaireSNP,
  ficheActeAvecUnTitulaireIndetermine,
  ficheActeMariage,
  ficheActeMariageAvecNomContientDesormais
} from "../../../../../mock/data/ficheActe";
import { mentionsPlurilinguesMariageAvec6, mentionsPlurilinguesMariageNombre10 } from "../../../../../mock/data/mentions";

const validation = EValidation.O;
const mentionsRetirees: string[] = [];

describe("Composition extrait plurilingue de Mariage", () => {
  NatureMention.init(NATURE_MENTION);
  TypeMention.init(TYPE_MENTION);

  test("Doit retourner les bonnes informations pour les 2 titulaires", () => {
    const acte = FicheActe.depuisDto(ficheActeMariage)!;

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
    const acte = {
      ...FicheActe.depuisDto(ficheActeMariage)!,
      mentions: mentionsPlurilinguesMariageNombre10.map(Mention.depuisDto).filter((mention): mention is Mention => mention !== null)
    };

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, validation, SousTypeDelivrance.RDC, mentionsRetirees);

    expect(compositionCorps?.autres_enonciations_acte.nombre_enonciations).toBe(9);
  });

  test("Doit afficher les mentions quand le nombre de mentions est en dessous ou égale de la limite", () => {
    const acte = {
      ...FicheActe.depuisDto(ficheActeMariage)!,
      mentions: mentionsPlurilinguesMariageAvec6.map(Mention.depuisDto).filter((mention): mention is Mention => mention !== null)
    };

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, validation, SousTypeDelivrance.RDC, mentionsRetirees);

    const mentierAfficherUn = "Sc 31-01-92 Nantes Jenmi";

    expect(compositionCorps?.autres_enonciations_acte.enonciations[0]).toBe(mentierAfficherUn);
  });

  test("Doit retourner undefined quand le nom du titulaire de l'analyse marginale est égal à SNP ou prenom égale à SPC", () => {
    const acte = FicheActe.depuisDto(ficheActeAvecUnNomTitulaireSNP)!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, validation, SousTypeDelivrance.RDC, mentionsRetirees);
    expect(compositionCorps?.titulaire_1?.nom_avant_mariage).toBe("");
    expect(compositionCorps?.titulaire_2?.prenoms).toBe("");
  });

  test("Doit retourner le premier nom présent dans l'analyse marginale que celui-ci contient né ou née", () => {
    const acte = FicheActe.depuisDto(ficheActeAvecUnTitulaireIndetermine)!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, validation, SousTypeDelivrance.RDC, mentionsRetirees);

    expect(compositionCorps?.lieu_acte).toBe("Barcelone, Catalogne (Espagne)");
    expect(compositionCorps?.titulaire_1?.nom_avant_mariage).toBe("Michou");
  });

  test("Doit retourner le dernier nom présent dans l'analyse marginale que celui-ci contient désormais", () => {
    const acte = FicheActe.depuisDto(ficheActeMariageAvecNomContientDesormais)!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, validation, SousTypeDelivrance.RDC, mentionsRetirees);

    expect(compositionCorps?.titulaire_2?.nom_avant_mariage).toBe("PRODESKA");
  });

  test("Ne doit pas afficher les même titulaires dans le document quand les 2 titulaire sont de sexe indeterminé suivant l'ordre", () => {
    const acte = {
      ...FicheActe.depuisDto(ficheActeAvecDeuxTitulaireIndetermine)!,
      mentions: mentionsPlurilinguesMariageAvec6.map(Mention.depuisDto).filter((mention): mention is Mention => mention !== null)
    };

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, EValidation.O, SousTypeDelivrance.RDC, mentionsRetirees);

    expect(compositionCorps?.filigrane_erreur).toEqual(true);
  });

  test("Doit prendre le lieu de reprise en priorité", () => {
    const acte = FicheActe.depuisDto(ficheActeAvecImage)!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, EValidation.O, SousTypeDelivrance.RDC, mentionsRetirees);

    expect(compositionCorps?.lieu_acte).toEqual("Lieu de reprise evenement");
    expect(compositionCorps?.titulaire_2?.lieu_naissance).toBe("Lieu de reprise");
  });

  test("Doit formater la date de naissance correctement quand le pays est France", () => {
    const acte = FicheActe.depuisDto(ficheActeMariageAvecNomContientDesormais)!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, EValidation.O, SousTypeDelivrance.RDC, mentionsRetirees);

    expect(compositionCorps?.lieu_acte).toEqual("Lieu de reprise Nantes");
    expect(compositionCorps?.titulaire_1?.lieu_naissance).toBe("Paris");
  });

  test("Doit formater la date de naissance correctement si la ville est Paris ou pas renseigner et Jérusalem", () => {
    const acte = FicheActe.depuisDto(ficheActeAvecUnTitulaireIndetermine)!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, EValidation.O, SousTypeDelivrance.RDC, mentionsRetirees);

    expect(compositionCorps?.titulaire_1?.lieu_naissance).toBe("Paris");
  });

  test("Doit formater la date de naissance des correctement quand le pays est étranger", () => {
    const acte = FicheActe.depuisDto(ficheActeMariageAvecNomContientDesormais)!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, EValidation.O, SousTypeDelivrance.RDC, mentionsRetirees);

    expect(compositionCorps?.titulaire_2?.lieu_naissance).toBe("Barcelone, Catalogne (Espagne)");
  });

  test("Doit composer correctement le lieu de naissance quand le pays est inconnu", () => {
    const ficheActeMariageAvecPaysInconnu: IFicheActeDto = {
      ...ficheActeMariage,
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
            region: "",
            pays: "Inconnu"
          },
          profession: "Enseignante",
          domicile: {
            voie: "7 Rue du Noyer",
            ville: "Bruxelles",
            region: "Flandre",
            pays: "BELGIQUE"
          },
          filiations: [
            {
              ordre: 1,
              nom: "Sacken",
              sexe: "FEMININ",
              profession: "Coiffeuse",
              lienParente: "PARENT",
              domicile: {
                voie: "16 avenue des Palmiers",
                ville: "Djibouti",
                pays: "DJIBOUTI"
              },
              prenoms: ["Carmela", "Linzy"]
            },
            {
              ordre: 1,
              nom: "Sacken",
              sexe: "FEMININ",
              profession: "Coiffeuse",
              lienParente: "PARENT",
              domicile: {
                voie: "16 avenue des Palmiers",
                ville: "Djibouti",
                pays: "DJIBOUTI"
              },
              prenoms: ["Carmelaa", "Linzy"]
            },
            {
              ordre: 1,
              nom: "Sacken",
              sexe: "FEMININ",
              profession: "Coiffeuse",
              lienParente: "PARENT_ADOPTANT",
              domicile: {
                voie: "16 avenue des Palmiers",
                ville: "Djibouti",
                pays: "DJIBOUTI"
              },
              prenoms: ["Carmelaaa", "Linzy"]
            },
            {
              ordre: 1,
              nom: "Sacken",
              sexe: "FEMININ",
              profession: "Coiffeuse",
              lienParente: "PARENT_ADOPTANT",
              domicile: {
                voie: "16 avenue des Palmiers",
                ville: "Djibouti",
                pays: "DJIBOUTI"
              },
              prenoms: ["Carmelaaaa", "Linzy"]
            }
          ],
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
          profession: "Enseignante",
          domicile: {
            voie: "7 Rue du Noyer",
            ville: "Bruxelles",
            region: "Flandre",
            pays: "BELGIQUE"
          },
          filiations: [
            {
              lienParente: "PARENT_ADOPTANT",
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
          nomAvantMariage: "nomAvantMariage",
          nomApresMariage: "nomApresMariage"
        }
      ]
    };

    const compositionCorps = creationCompositionExtraitPlurilingue(
      FicheActe.depuisDto(ficheActeMariageAvecPaysInconnu)!,
      EValidation.O,
      SousTypeDelivrance.RDC,
      mentionsRetirees
    );

    expect(compositionCorps?.titulaire_1?.lieu_naissance).toBe("Paris");
  });
});
