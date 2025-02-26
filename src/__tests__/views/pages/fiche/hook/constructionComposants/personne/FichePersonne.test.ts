import { getFichesPersonne } from "@pages/fiche/hook/constructionComposants/personne/FichePersonne";
import { SectionPartProps } from "@widget/section/SectionPart";
import { expect, test } from "vitest";
import { personneMock } from "../../../../../../mock/data/ficheEtBandeau/divers/PersonneMock";

test("Decision utils get decision : decision de type Juridiction, ", () => {
  const components = getFichesPersonne([personneMock]);

  expect(components).toHaveLength(1);

  const parts = components[0].panelAreas[0].parts as SectionPartProps[];

  expect(parts).toHaveLength(3);

  // test part 1 info personne
  const idxNom = parts[0].partContent?.contents.findIndex((content: any) => content.libelle === "Nom");
  expect(idxNom).toBeGreaterThan(-1);

  const idxAutresNoms = parts[0].partContent?.contents.findIndex((content: any) => content.libelle === "Autres noms");
  expect(idxAutresNoms).toBeGreaterThan(-1);
  expect(idxNom).toBeLessThan(idxAutresNoms as number);

  const idxPrenoms = parts[0].partContent?.contents.findIndex((content: any) => content.libelle === "Prénoms");
  expect(idxPrenoms).toBeGreaterThan(-1);
  expect(idxAutresNoms).toBeLessThan(idxPrenoms as number);

  const idxAutresPrenoms = parts[0].partContent?.contents.findIndex((content: any) => content.libelle === "Autres prénoms");
  expect(idxAutresPrenoms).toBeGreaterThan(-1);
  expect(idxPrenoms).toBeLessThan(idxAutresPrenoms as number);

  const idxLieuNaissance = parts[0].partContent?.contents.findIndex((content: any) => content.libelle === "Lieu de naissance");
  expect(idxLieuNaissance).toBeGreaterThan(-1);
  expect(idxAutresPrenoms).toBeLessThan(idxLieuNaissance as number);

  const idxDateNaissance = parts[0].partContent?.contents.findIndex((content: any) => content.libelle === "Né(e) le");
  expect(idxDateNaissance).toBeGreaterThan(-1);
  expect(idxLieuNaissance).toBeLessThan(idxDateNaissance as number);

  const idxNationalite = parts[0].partContent?.contents.findIndex((content: any) => content.libelle === "Nationalité");
  expect(idxNationalite).toBeGreaterThan(-1);
  expect(idxDateNaissance).toBeLessThan(idxNationalite as number);

  const idxSexe = parts[0].partContent?.contents.findIndex((content: any) => content.libelle === "Sexe");
  expect(idxSexe).toBeGreaterThan(-1);
  expect(idxNationalite).toBeLessThan(idxSexe as number);

  const idxLieuDeces = parts[0].partContent?.contents.findIndex((content: any) => content.libelle === "Lieu décès");
  expect(idxLieuDeces).toBeGreaterThan(-1);
  expect(idxSexe).toBeLessThan(idxLieuDeces as number);

  const idxDateDeces = parts[0].partContent?.contents.findIndex((content: any) => content.libelle === "Date décès");
  expect(idxDateDeces).toBeGreaterThan(-1);
  expect(idxLieuDeces).toBeLessThan(idxDateDeces as number);
});
