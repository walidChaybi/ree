import { creationCompositionExtraitPlurilingue } from "@hook/generation/generationECHook/creationComposition/creationCompositionExtraitPlurilingue";
import { mapActe } from "@hook/repertoires/MappingRepertoires";
import {
  ficheActeAvecDeuxTitulaireIndetermine,
  ficheActeAvecImage,
  ficheActeAvecUnNomTitulaireSNP,
  ficheActeAvecUnTitulaireIndetermine,
  ficheActeMariage,
  ficheActeMariageAvecNomContientDesormais
} from "@mock/data/ficheActe";
import {
  mentionsPlurilinguesMariageAvec6,
  mentionsPlurilinguesMariageNombre10
} from "@mock/data/mentions";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IMention } from "@model/etatcivil/acte/mention/IMention";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { Validation } from "@model/requete/enum/Validation";

const validation = "O";
const mentionsRetirees: string[] = [];

describe("Composition extrait plurilingue de Mariage", () => {
  test("Doit retourner les bonnes informations pour les 2 titulaires", () => {
    const acte = mapActe(ficheActeMariage.data);

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      validation as Validation,
      SousTypeDelivrance.RDC,
      mentionsRetirees
    );

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

    if (compositionCorps.titulaire_1) {
      expect(compositionCorps.titulaire_1.nom_apres_mariage).toBe(
        nomApresMariageAttenduT1
      );
      expect(compositionCorps.titulaire_1.nom_avant_mariage).toBe(
        nomAvantMariageAttenduT1
      );
      expect(compositionCorps.titulaire_1.prenoms).toBe(prenomsT1);
      expect(compositionCorps.titulaire_1.date_naissance?.jour).toBe(
        dateNaissanceT1.jour
      );
      expect(compositionCorps.titulaire_1?.lieu_naissance).toBe(
        lieuNaissanceT1
      );
    }

    expect(compositionCorps.titulaire_2?.nom_apres_mariage).toBe(
      nomApresMariageAttenduT2
    );
    expect(compositionCorps.titulaire_2?.nom_avant_mariage).toBe(
      nomAvantMariageAttenduT2
    );
    expect(compositionCorps.titulaire_2?.prenoms).toBe(prenomsT2);
    expect(compositionCorps.titulaire_2?.date_naissance?.jour).toBe(
      dateNaissanceT2.jour
    );
    expect(compositionCorps.titulaire_2?.lieu_naissance).toBe(lieuNaissanceT2);
  });

  test("Ne doit pas éditer les mentions supérieur à 9", () => {
    const acte = mapActe(ficheActeMariage.data);
    acte.mentions = mentionsPlurilinguesMariageNombre10 as any as IMention[];

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      validation as Validation,
      SousTypeDelivrance.RDC,
      mentionsRetirees
    );

    expect(compositionCorps.autres_enonciations_acte.nombre_enonciations).toBe(
      9
    );
  });

  test("Doit afficher les mentions quand le nombre de mentions est en dessous ou égale de la limite", () => {
    const acte = mapActe(ficheActeMariage.data);
    acte.mentions = mentionsPlurilinguesMariageAvec6 as any as IMention[];

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      validation as Validation,
      SousTypeDelivrance.RDC,
      mentionsRetirees
    );

    const mentierAfficherUn = "Sc 31-01-92 Nantes Jenmi";

    expect(compositionCorps.autres_enonciations_acte.enonciations[0]).toBe(
      mentierAfficherUn
    );
  });

  test("Doit retourner undefined quand le nom du titulaire de l'analyse marginale est égal à SNP ou prenom égale à SPC", () => {
    const acte = mapActe(ficheActeAvecUnNomTitulaireSNP.data);

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      validation as Validation,
      SousTypeDelivrance.RDC,
      mentionsRetirees
    );
    expect(compositionCorps.titulaire_1?.nom_avant_mariage).toBe("");
    expect(compositionCorps.titulaire_2?.prenoms).toBe("");
  });

  test("Doit retourner le premier nom présent dans l'analyse marginale que celui-ci contient né ou née", () => {
    const acte = mapActe(ficheActeAvecUnTitulaireIndetermine.data);

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      validation as Validation,
      SousTypeDelivrance.RDC,
      mentionsRetirees
    );

    expect(compositionCorps.lieu_acte).toBe("Barcelone, Catalogne (Espagne)");
    expect(compositionCorps.titulaire_1?.nom_avant_mariage).toBe("Michou");
  });

  test("Doit retourner le dernier nom présent dans l'analyse marginale que celui-ci contient désormais", () => {
    const acte = mapActe(ficheActeMariageAvecNomContientDesormais.data);

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      validation as Validation,
      SousTypeDelivrance.RDC,
      mentionsRetirees
    );

    expect(compositionCorps.titulaire_2?.nom_avant_mariage).toBe("PRODESKA");
  });

  test("Ne doit pas afficher les même titulaires dans le document quand les 2 titulaire sont de sexe indeterminé suivant l'ordre", () => {
    const acte = mapActe(ficheActeAvecDeuxTitulaireIndetermine.data);
    acte.mentions = mentionsPlurilinguesMariageAvec6 as any as IMention[];

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      Validation.O,
      SousTypeDelivrance.RDC,
      mentionsRetirees
    );

    expect(compositionCorps.filigrane_erreur).toEqual(true);
  });

  test("Doit prendre le lieu de reprise en priorité", () => {
    const acte = mapActe(ficheActeAvecImage.data);

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      Validation.O,
      SousTypeDelivrance.RDC,
      mentionsRetirees
    );

    expect(compositionCorps.lieu_acte).toEqual("Lieu de reprise evenement");
    expect(compositionCorps.titulaire_2?.lieu_naissance).toBe(
      "Lieu de reprise"
    );
  });

  test("Doit formater la date de naissance correctement quand le pays est France", () => {
    const acte = mapActe(ficheActeMariageAvecNomContientDesormais.data);

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      Validation.O,
      SousTypeDelivrance.RDC,
      mentionsRetirees
    );

    expect(compositionCorps.lieu_acte).toEqual("Lieu de reprise Nantes");
    expect(compositionCorps.titulaire_1?.lieu_naissance).toBe("Paris");
  });

  test("Doit formater la date de naissance correctement si la ville est Paris ou pas renseigner et Jérusalem", () => {
    const acte = mapActe(ficheActeAvecUnTitulaireIndetermine.data);

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      Validation.O,
      SousTypeDelivrance.RDC,
      mentionsRetirees
    );

    expect(compositionCorps.titulaire_1?.lieu_naissance).toBe("Paris");
  });

  test("Doit formater la date de naissance des correctement quand le pays est étranger", () => {
    const acte = mapActe(ficheActeMariageAvecNomContientDesormais.data);

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      Validation.O,
      SousTypeDelivrance.RDC,
      mentionsRetirees
    );

    expect(compositionCorps.titulaire_2?.lieu_naissance).toBe(
      "Barcelone, Catalogne (Espagne)"
    );
  });

  test("Doit composer correctement le lieu de naissance quand le pays est inconnu", () => {
    const ficheActeMariageAvecPaysInconnu = {
      ...ficheActeMariage.data,
      ...(ficheActeMariage.data.titulaires = [
        {
          nom: "MARTIN",
          prenoms: ["Jean-Louis", "Alphonse", "Raoül"],
          autresNoms: null,
          autresPrenoms: null,
          ordre: 1,
          sexe: "MASCULIN",
          naissance: {
            minute: null,
            heure: null,
            jour: 29,
            mois: 11,
            annee: 1989,
            voie: null,
            ville: "Paris",
            arrondissement: null,
            region: "",
            pays: "Inconnu",
            lieuReprise: null
          },
          profession: "Enseignante",
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
              type: null,
              ordre: 1,
              nom: "Sacken",
              sexe: "FEMININ",
              naissance: null,
              profession: "Coiffeuse",
              age: null,
              lienParente: "PARENT",
              domicile: {
                voie: "16 avenue des Palmiers",
                ville: "Djibouti",
                arrondissement: null,
                region: null,
                pays: "DJIBOUTI"
              },
              prenoms: ["Carmela", "Linzy"]
            },
            {
              type: null,
              ordre: 1,
              nom: "Sacken",
              sexe: "FEMININ",
              naissance: null,
              profession: "Coiffeuse",
              age: null,
              lienParente: "PARENT",
              domicile: {
                voie: "16 avenue des Palmiers",
                ville: "Djibouti",
                arrondissement: null,
                region: null,
                pays: "DJIBOUTI"
              },
              prenoms: ["Carmelaa", "Linzy"]
            },
            {
              type: null,
              ordre: 1,
              nom: "Sacken",
              sexe: "FEMININ",
              naissance: null,
              profession: "Coiffeuse",
              age: null,
              lienParente: "PARENT_ADOPTANT",
              domicile: {
                voie: "16 avenue des Palmiers",
                ville: "Djibouti",
                arrondissement: null,
                region: null,
                pays: "DJIBOUTI"
              },
              prenoms: ["Carmelaaa", "Linzy"]
            },
            {
              type: null,
              ordre: 1,
              nom: "Sacken",
              sexe: "FEMININ",
              naissance: null,
              profession: "Coiffeuse",
              age: null,
              lienParente: "PARENT_ADOPTANT",
              domicile: {
                voie: "16 avenue des Palmiers",
                ville: "Djibouti",
                arrondissement: null,
                region: null,
                pays: "DJIBOUTI"
              },
              prenoms: ["Carmelaaaa", "Linzy"]
            }
          ],
          typeDeclarationConjointe: null,
          dateDeclarationConjointe: null,
          nomPartie1: null,
          nomPartie2: null,
          nomAvantMariage: "nomAvantMariage",
          nomApresMariage: "nomApresMariage",
          nomDernierConjoint: null,
          prenomsDernierConjoint: null
        },
        {
          nom: "PRODESK",
          prenoms: ["Elodie", "Marie-Charlotte", "Pauline"],
          autresNoms: null,
          autresPrenoms: null,
          ordre: 2,
          sexe: "FEMININ",
          naissance: {
            minute: null,
            heure: null,
            jour: 25,
            mois: 6,
            annee: 1990,
            voie: null,
            ville: "Barcelone",
            arrondissement: null,
            region: "Catalogne",
            pays: "Espagne",
            lieuReprise: null
          },
          profession: "Enseignante",
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
              lienParente: "PARENT_ADOPTANT",
              type: null,
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
          nomAvantMariage: "nomAvantMariage",
          nomApresMariage: "nomApresMariage",
          nomDernierConjoint: null,
          prenomsDernierConjoint: null
        }
      ])
    };

    const compositionCorps = creationCompositionExtraitPlurilingue(
      mapActe(ficheActeMariageAvecPaysInconnu) as any as IFicheActe,
      Validation.O,
      SousTypeDelivrance.RDC,
      mentionsRetirees
    );

    expect(compositionCorps.titulaire_1?.lieu_naissance).toBe("Paris");
  });
});
