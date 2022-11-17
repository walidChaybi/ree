import { creationCompositionExtraitPlurilingue } from "@hook/generation/generationECHook/creationComposition/creationCompositionExtraitPlurilingue";
import { mapActe } from "@hook/repertoires/MappingRepertoires";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IMention } from "@model/etatcivil/acte/mention/IMention";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { Validation } from "@model/requete/enum/Validation";
import request from "superagent";
import {
  ficheActeAvecDeuxTitulaireIndetermine,
  ficheActeAvecImage,
  ficheActeAvecUnNomTitulaireSNP,
  ficheActeAvecUnTitulaireIndetermine,
  ficheActeMariage,
  ficheActeMariageAvecNomContientDesormais
} from "../../../../../../mock/data/ficheActe";
import {
  mentionsPlurilinguesMariageAvec6,
  mentionsPlurilinguesMariageNombre10
} from "../../../../../../mock/data/mentions";
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

  test("Doit formater la date de naissance correctement quand le pays est étranger", () => {
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
});
