import { creationCompositionExtraitPlurilingue } from "@hook/generation/generationECHook/creationComposition/creationCompositionExtraitPlurilingue";
import { mapActe } from "@hook/repertoires/MappingRepertoires";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IMention } from "@model/etatcivil/acte/mention/IMention";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { Validation } from "@model/requete/enum/Validation";
import request from "superagent";
import {
  ficheActeAvecDeuxTitulaireIndetermine,
  ficheActeAvecUnTitulaireIndetermine,
  ficheActeMariage
} from "../../../../../../mock/data/ficheActe";
import {
  mentionsPlurilinguesMariageAvec6,
  mentionsPlurilinguesMariageNombre7
} from "../../../../../../mock/data/mentions";
import { configRequetes } from "../../../../../../mock/superagent-config/superagent-mock-requetes";

const superagentMock = require("superagent-mock")(request, [configRequetes[0]]);

const validation = "O";

beforeAll(() => {
  DocumentDelivrance.init();
});

afterAll(() => {
  superagentMock.unset();
});

test("Doit retourner les bonnes informations pour les 2 titulaires", () => {
  const acte = mapActe(ficheActeMariage.data);

  const compositionCorps = creationCompositionExtraitPlurilingue(
    acte as any as IFicheActe,
    validation as Validation
  );

  const nomApresMariageAttenduT1 = "nomApresMariage";
  const nomAvantMariageAttenduT1 = "nomAvantMariage";
  const prenomsT1 = "Jean-Louis Alphonse Raoül";
  const dateNaissanceT1 = {
    jour: 29,
    mois: 11,
    annee: 1989
  };
  const lieuNaissanceT1 = "Paris (Fance)";

  const nomApresMariageAttenduT2 = "nomApresMariage";
  const nomAvantMariageAttenduT2 = "nomAvantMariage";
  const prenomsT2 = "Elodie Marie-Charlotte Pauline";
  const dateNaissanceT2 = {
    jour: 25,
    mois: 6,
    annee: 1990
  };
  const lieuNaissanceT2 = "Barcelone, Catalogne (Espagne)";

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
  expect(compositionCorps.titulaire_1?.lieu_naissance).toBe(lieuNaissanceT1);

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

test("Doit mettre le document en erreur quand le nombre de mentions dépasse la limite", () => {
  const acte = mapActe(ficheActeMariage.data);
  acte.mentions = mentionsPlurilinguesMariageNombre7 as any as IMention[];

  const compositionCorps = creationCompositionExtraitPlurilingue(
    acte as any as IFicheActe,
    validation as Validation
  );

  const mentionErreur = "--";

  expect(compositionCorps.autres_enonciations_acte.enonciations[0]).toBe(
    mentionErreur
  );
});

test("Doit afficher les mentions quand le nombre de mentions est en dessous ou égale de la limite", () => {
  const acte = mapActe(ficheActeMariage.data);
  acte.mentions = mentionsPlurilinguesMariageAvec6 as any as IMention[];

  const compositionCorps = creationCompositionExtraitPlurilingue(
    acte as any as IFicheActe,
    validation as Validation
  );

  const mentierAfficherUn = "Sc 31-01-92 Nantes Jenmi";

  expect(compositionCorps.autres_enonciations_acte.enonciations[0]).toBe(
    mentierAfficherUn
  );
});

test("Doit mettre le filigrane en erreur quand un des titulaire est de sexe indeterminé et mettre le sexe indetermine dans la colonne titulaire_2", () => {
  const acte = mapActe(ficheActeAvecUnTitulaireIndetermine.data);
  acte.mentions = mentionsPlurilinguesMariageAvec6 as any as IMention[];

  const compositionCorps = creationCompositionExtraitPlurilingue(
    acte as any as IFicheActe,
    validation as Validation
  );

  expect(compositionCorps.filigrane_erreur).toEqual(true);
  expect(compositionCorps.titulaire_2?.prenoms).toBe(
    "Elodie Marie-Charlotte Pauline"
  );
});

test("Ne doit pas afficher les même titulaires dans le document quand les 2 titulaire sont de sexe indeterminé suivant l'ordre", () => {
  const acte = mapActe(ficheActeAvecDeuxTitulaireIndetermine.data);
  acte.mentions = mentionsPlurilinguesMariageAvec6 as any as IMention[];

  const compositionCorps = creationCompositionExtraitPlurilingue(
    acte as any as IFicheActe,
    Validation.O
  );

  expect(compositionCorps.filigrane_erreur).toEqual(true);
});
