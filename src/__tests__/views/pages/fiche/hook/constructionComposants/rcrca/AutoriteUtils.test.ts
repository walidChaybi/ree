import {
  ficheAutoriteJuridictionEtrangerAvecConfirmation,
  ficheAutoriteJuridictionFranceAvecConfirmation,
  ficheAutoriteNotaireEtrangerAvecConfirmation,
  ficheAutoriteNotaireFranceAvecConfirmation,
  ficheAutoriteOnac,
  ficheAutoriteOnaceEtrangerAvecConfirmation,
  ficheAutoriteSansConfirmation,
  ficheNonValide
} from "@mock/data/ficheEtBandeau/divers/DecisionAutoriteMock";
import { FicheRcRca } from "@model/etatcivil/rcrca/FicheRcRca";
import { getAutorite } from "@pages/fiche/hook/constructionComposants/rcrca/AutoriteUtils";
import { expect, test } from "vitest";

test("Autorite utils get autorite : decision en France, de type Juridiction, la source de confirmation est présente", () => {
  const components = getAutorite(FicheRcRca.RcDepuisDto(ficheAutoriteJuridictionFranceAvecConfirmation) as FicheRcRca);

  expect(components).toHaveLength(2);

  const idxType = components[0].partContent?.contents.findIndex(content => content.libelle === "Type");
  expect(idxType).toBeGreaterThan(-1);

  const idxVille = components[0].partContent?.contents.findIndex(content => content.libelle === "Ville");
  expect(idxVille).toBeGreaterThan(-1);

  expect(idxType).toBeLessThan(idxVille as number);

  const idxArrondissement = components[0].partContent?.contents.findIndex(content => content.libelle === "Arrondissement");
  expect(idxArrondissement).toBeGreaterThan(-1);
  expect(idxType).toBeLessThan(idxArrondissement as number);

  const idxDepartement = components[0].partContent?.contents.findIndex(content => content.libelle === "Département");
  expect(idxDepartement).toBeGreaterThan(-1);
  expect(idxArrondissement).toBeLessThan(idxDepartement as number);

  expect(components[0].partContent?.contents.findIndex(content => content.libelle === "Prénom NOM")).toBe(-1);

  expect(components[0].partContent?.contents.findIndex(content => content.libelle === "Région")).toBe(-1);

  expect(components[0].partContent?.contents.findIndex(content => content.libelle === "Pays")).toBe(-1);

  expect(components[0].partContent?.contents.findIndex(content => content.libelle === "N° CRPCEN")).toBe(-1);
});

test("Autorite utils get autorite : decision à l'étranger, de type Juridiction, la source de confirmation est présente", () => {
  const components = getAutorite(FicheRcRca.RcDepuisDto(ficheAutoriteJuridictionEtrangerAvecConfirmation) as FicheRcRca);

  const idxType = components[0].partContent?.contents.findIndex(content => content.libelle === "Type");
  expect(idxType).toBeGreaterThan(-1);

  const idxVille = components[0].partContent?.contents.findIndex(content => content.libelle === "Ville");
  expect(idxVille).toBeGreaterThan(-1);

  expect(idxType).toBeLessThan(idxVille as number);

  const idxRegion = components[0].partContent?.contents.findIndex(content => content.libelle === "Région");
  expect(idxRegion).toBeGreaterThan(-1);
  expect(idxType).toBeLessThan(idxRegion as number);

  const idxPays = components[0].partContent?.contents.findIndex(content => content.libelle === "Pays");
  expect(idxPays).toBeGreaterThan(-1);
  expect(idxRegion).toBeLessThan(idxPays as number);

  expect(components[0].partContent?.contents.findIndex(content => content.libelle === "Arrondissement")).toBe(-1);
  expect(components[0].partContent?.contents.findIndex(content => content.libelle === "Département")).toBe(-1);
  expect(components[0].partContent?.contents.findIndex(content => content.libelle === "Prénom NOM")).toBe(-1);

  expect(components[0].partContent?.contents.findIndex(content => content.libelle === "N° CRPCEN")).toBe(-1);
});

test("Autorite utils get autorite : decision en France, de type Notaire ", () => {
  const components = getAutorite(FicheRcRca.RcDepuisDto(ficheAutoriteNotaireFranceAvecConfirmation) as FicheRcRca);

  const idxType = components[0].partContent?.contents.findIndex(content => content.libelle === "Type");
  expect(idxType).toBeGreaterThan(-1);

  const idxVille = components[0].partContent?.contents.findIndex(content => content.libelle === "Ville");
  expect(idxVille).toBeGreaterThan(-1);

  expect(idxType).toBeLessThan(idxVille as number);

  const idxPrenomNom = components[0].partContent?.contents.findIndex(content => content.libelle === "Prénom NOM");
  expect(components[0].partContent?.contents.findIndex(content => content.libelle === "Prénom NOM")).toBeGreaterThan(-1);
  expect(idxVille).toBeGreaterThan(idxPrenomNom as number);

  const idxArrondissement = components[0].partContent?.contents.findIndex(content => content.libelle === "Arrondissement");
  expect(idxArrondissement).toBeGreaterThan(-1);
  expect(idxPrenomNom).toBeLessThan(idxArrondissement as number);

  const idxDepartement = components[0].partContent?.contents.findIndex(content => content.libelle === "Département");
  expect(idxDepartement).toBeGreaterThan(-1);
  expect(idxArrondissement).toBeLessThan(idxDepartement as number);

  const idxCrpcen = components[0].partContent?.contents.findIndex(content => content.libelle === "N° CRPCEN");

  expect(idxCrpcen).toBeGreaterThan(-1);
  expect(idxDepartement).toBeLessThan(idxCrpcen as number);

  expect(components[0].partContent?.contents.findIndex(content => content.libelle === "Région")).toBe(-1);

  expect(components[0].partContent?.contents.findIndex(content => content.libelle === "Pays")).toBe(-1);
});

test("Autorite utils get autorite : decision à l'étranger, de type Notaire ", () => {
  const components = getAutorite(FicheRcRca.RcDepuisDto(ficheAutoriteNotaireEtrangerAvecConfirmation) as FicheRcRca);

  const idxType = components[0].partContent?.contents.findIndex(content => content.libelle === "Type");
  expect(idxType).toBeGreaterThan(-1);

  const idxPrenomNom = components[0].partContent?.contents.findIndex(content => content.libelle === "Prénom NOM");
  expect(idxPrenomNom).toBeGreaterThan(-1);
  expect(idxType).toBeLessThan(idxPrenomNom as number);

  const idxVille = components[0].partContent?.contents.findIndex(content => content.libelle === "Ville");
  expect(idxVille).toBeGreaterThan(-1);

  expect(idxPrenomNom).toBeLessThan(idxVille as number);

  const idxRegion = components[0].partContent?.contents.findIndex(content => content.libelle === "Région");
  expect(idxRegion).toBeGreaterThan(-1);
  expect(idxVille).toBeLessThan(idxRegion as number);

  const idxPays = components[0].partContent?.contents.findIndex(content => content.libelle === "Pays");
  expect(idxPays).toBeGreaterThan(-1);
  expect(idxRegion).toBeLessThan(idxPays as number);

  expect(components[0].partContent?.contents.findIndex(content => content.libelle === "Arrondissement")).toBe(-1);
  expect(components[0].partContent?.contents.findIndex(content => content.libelle === "Département")).toBe(-1);

  expect(components[0].partContent?.contents.findIndex(content => content.libelle === "N° CRPCEN")).toBe(-1);
});

test("Autorite utils get autorite : decision à l'étranger, de type Onac avec confirmation ONAC ", () => {
  const components = getAutorite(FicheRcRca.RcDepuisDto(ficheAutoriteOnaceEtrangerAvecConfirmation) as FicheRcRca);

  const idxType = components[0].partContent?.contents.findIndex(content => content.libelle === "Type");
  expect(idxType).toBeGreaterThan(-1);

  const idxPrenomNom = components[0].partContent?.contents.findIndex(content => content.libelle === "Titre");
  expect(idxPrenomNom).toBeGreaterThan(-1);
  expect(idxType).toBeLessThan(idxPrenomNom as number);

  const idxVille = components[0].partContent?.contents.findIndex(content => content.libelle === "Ville");
  expect(idxVille).toBeGreaterThan(-1);

  expect(idxPrenomNom).toBeLessThan(idxVille as number);

  const idxRegion = components[0].partContent?.contents.findIndex(content => content.libelle === "Région");
  expect(idxRegion).toBeGreaterThan(-1);
  expect(idxVille).toBeLessThan(idxRegion as number);

  const idxPays = components[0].partContent?.contents.findIndex(content => content.libelle === "Pays");
  expect(idxPays).toBeGreaterThan(-1);
  expect(idxRegion).toBeLessThan(idxPays as number);

  expect(components[0].partContent?.contents.findIndex(content => content.libelle === "Arrondissement")).toBe(-1);
  expect(components[0].partContent?.contents.findIndex(content => content.libelle === "Département")).toBe(-1);

  expect(components[0].partContent?.contents.findIndex(content => content.libelle === "N° CRPCEN")).toBe(-1);
});

test("Autorite utils get autorite : la source de confirmation n'est pas présente", () => {
  const components = getAutorite(FicheRcRca.RcDepuisDto(ficheAutoriteSansConfirmation) as FicheRcRca);

  expect(components).toHaveLength(1);
});

test("Autorite utils get autorite : donnees non valides", async () => {
  const components = getAutorite(FicheRcRca.RcDepuisDto(ficheNonValide) as FicheRcRca);

  expect(components).toHaveLength(0);
});

test("Autorite utils get autorite : onac", async () => {
  const components = getAutorite(FicheRcRca.RcaDepuisDto(ficheAutoriteOnac) as FicheRcRca);
  const element = components[0].partContent?.contents[1].value as JSX.Element;
  expect(element.props.children).toBe("titreOnac");
});
