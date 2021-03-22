import { getFichesPersonne } from "../../../../../views/pages/fiche/hook/constructionComposants/personne/FichePersonne";
import { personneMock } from "./mock/PersonneMock";

test("Decision utils get decision : decision de type Juridiction, ", async () => {
  const components = getFichesPersonne([personneMock]);

  expect(components).toHaveLength(1);

  const parts = components[0].panelAreas[0].parts;

  expect(parts).toHaveLength(3);

  // test part 1 info personne
  const idxNom = parts[0].contentsPart?.contents.findIndex(
    (content: any) => content.libelle === "Nom"
  );
  expect(idxNom).toBeGreaterThan(-1);

  const idxAutresNoms = parts[0].contentsPart?.contents.findIndex(
    (content: any) => content.libelle === "Autres noms"
  );
  expect(idxAutresNoms).toBeGreaterThan(-1);
  expect(idxNom).toBeLessThan(idxAutresNoms);

  const idxPrenoms = parts[0].contentsPart?.contents.findIndex(
    (content: any) => content.libelle === "Prénoms"
  );
  expect(idxPrenoms).toBeGreaterThan(-1);
  expect(idxAutresNoms).toBeLessThan(idxPrenoms);

  const idxAutresPrenoms = parts[0].contentsPart?.contents.findIndex(
    (content: any) => content.libelle === "Autres prénoms"
  );
  expect(idxAutresPrenoms).toBeGreaterThan(-1);
  expect(idxPrenoms).toBeLessThan(idxAutresPrenoms);

  const idxLieuNaissance = parts[0].contentsPart?.contents.findIndex(
    (content: any) => content.libelle === "Lieu de naissance"
  );
  expect(idxLieuNaissance).toBeGreaterThan(-1);
  expect(idxAutresPrenoms).toBeLessThan(idxLieuNaissance);

  const idxDateNaissance = parts[0].contentsPart?.contents.findIndex(
    (content: any) => content.libelle === "Né(e) le"
  );
  expect(idxDateNaissance).toBeGreaterThan(-1);
  expect(idxLieuNaissance).toBeLessThan(idxDateNaissance);

  const idxNationalite = parts[0].contentsPart?.contents.findIndex(
    (content: any) => content.libelle === "Nationalité"
  );
  expect(idxNationalite).toBeGreaterThan(-1);
  expect(idxDateNaissance).toBeLessThan(idxNationalite);

  const idxSexe = parts[0].contentsPart?.contents.findIndex(
    (content: any) => content.libelle === "Sexe"
  );
  expect(idxSexe).toBeGreaterThan(-1);
  expect(idxNationalite).toBeLessThan(idxSexe);

  const idxLieuDeces = parts[0].contentsPart?.contents.findIndex(
    (content: any) => content.libelle === "Lieu décès (si connu)"
  );
  expect(idxLieuDeces).toBeGreaterThan(-1);
  expect(idxSexe).toBeLessThan(idxLieuDeces);

  const idxDateDeces = parts[0].contentsPart?.contents.findIndex(
    (content: any) => content.libelle === "Date décès (si connu)"
  );
  expect(idxDateDeces).toBeGreaterThan(-1);
  expect(idxLieuDeces).toBeLessThan(idxDateDeces);
});
