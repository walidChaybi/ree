import { creationCompositionExtraitPlurilingue } from "@hook/generation/generationECHook/creationComposition/creationCompositionExtraitPlurilingue";
import { mapActe } from "@hook/repertoires/MappingRepertoires";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IMention } from "@model/etatcivil/acte/mention/IMention";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { Validation } from "@model/requete/enum/Validation";
import request from "superagent";
import {
  ficheActeAvecAnneeNaissanceTitulaireAbsente,
  ficheActeAvecTitulaireIndetermine,
  ficheActeAvecUnParentTitulaireInconnu,
  ficheActeAvecUnParentTitulaireIndetermine,
  ficheActeNaissanceAvecParentsDeMemeSexe,
  ficheActeNaissanceAvecTitulaireInconnu
} from "../../../../../../mock/data/ficheActe";
import { mentionsPlurilinguesMariageAvec6 } from "../../../../../../mock/data/mentions";
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

describe("Composition extrait plurilingue de Naissance", () => {
  test("Doit mettre le document en erreur si le titulaire est de sexe inconnu", () => {
    const acte = mapActe(ficheActeNaissanceAvecTitulaireInconnu.data);

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      Validation.O,
      mentionsRetirees
    );

    expect(compositionCorps.filigrane_incomplet).toEqual(true);
  });

  test("Doit mettre le document en erreur si un des parents est de sexe inconnu", () => {
    const acte = mapActe(ficheActeAvecUnParentTitulaireInconnu.data);

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      Validation.O,
      mentionsRetirees
    );

    expect(compositionCorps.filigrane_incomplet).toEqual(true);
  });

  test("Doit mettre le document en erreur si l'annee de naissance du titulaire est manquante", () => {
    const acte = mapActe(ficheActeAvecAnneeNaissanceTitulaireAbsente.data);

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      Validation.O,
      mentionsRetirees
    );

    expect(compositionCorps.filigrane_incomplet).toEqual(true);
  });

  test("Doit mettre le document en erreur si le titulaire de l'acte est de genre indeterminé", () => {
    const acte = mapActe(ficheActeAvecTitulaireIndetermine.data);

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      Validation.O,
      mentionsRetirees
    );

    expect(compositionCorps.filigrane_erreur).toEqual(true);
  });

  test("Doit mettre le document en erreur si les parents du titulaires sont de même sexe", () => {
    const acte = mapActe(ficheActeNaissanceAvecParentsDeMemeSexe.data);

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      Validation.O,
      mentionsRetirees
    );

    expect(compositionCorps.filigrane_erreur).toEqual(true);
  });

  test("Doit mettre le document en erreur si les parents du titulaires est de sexe indetermine", () => {
    const acte = mapActe(ficheActeAvecUnParentTitulaireIndetermine.data);

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      Validation.O,
      mentionsRetirees
    );

    expect(compositionCorps.filigrane_erreur).toEqual(true);
  });

  test("Doit composer l'etrait avec les bonne données", () => {
    const acte = mapActe(ficheActeAvecUnParentTitulaireInconnu.data);

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      Validation.O,
      mentionsRetirees
    );

    const nom = "Patamob";
    const prenoms = "Lolita";
    const date_naissance = {
      jour: 17,
      mois: 4,
      annee: 1970
    };
    const lieuNaissance = "Sitka, Alaska (États-Unis)";

    const nomPere = "Sacken";
    const prenomPere = "Jean Louis";

    expect(compositionCorps.titulaire_1.nom).toBe(nom);
    expect(compositionCorps.titulaire_1.prenoms).toBe(prenoms);
    expect(compositionCorps.titulaire_1?.lieu_naissance).toBe(lieuNaissance);
    expect(compositionCorps.titulaire_1.date_naissance?.jour).toBe(
      date_naissance.jour
    );
    expect(compositionCorps.titulaire_1.nom_pere).toBe(nomPere);

    expect(compositionCorps.titulaire_1?.prenom_pere).toBe(prenomPere);
  });

  test("Doit afficher les mentions quand le nombre de mentions est en dessous ou égale de la limite", () => {
    const acte = mapActe(ficheActeAvecUnParentTitulaireInconnu.data);
    acte.mentions = mentionsPlurilinguesMariageAvec6 as any as IMention[];

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      validation as Validation,
      mentionsRetirees
    );

    const mentierAfficherUn = "Sc 31-01-92 Nantes Jenmi";

    expect(compositionCorps.autres_enonciations_acte.enonciations[0]).toBe(
      mentierAfficherUn
    );
  });

  test("Ne doit pas affiché une mention sur l'extrait si elle est présente dans les mentions retirées", () => {
    const acte = mapActe(ficheActeAvecUnParentTitulaireInconnu.data);
    acte.mentions = mentionsPlurilinguesMariageAvec6 as any as IMention[];
    const mentionsRetirees: string[] = ["f6947623-9959-4d07-8963-f55b16a01071"];

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      validation as Validation,
      mentionsRetirees
    );

    const mentionAfficherUn = "Sc 31-12-98 Nantes Jenmi";

    expect(compositionCorps.autres_enonciations_acte.enonciations[0]).toBe(
      mentionAfficherUn
    );
  });
});
