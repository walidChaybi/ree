import { mapActe } from "@hook/repertoires/MappingRepertoires";
import { getTitulaires } from "@pages/fiche/hook/constructionComposants/acte/TitulairesActeUtils";
import { acte } from "../../../../../../../mock/data/ficheEtBandeau/ficheActe";

test("Acte utils : affichage correcte des infos d'un titulaire", async () => {
  const dataActe = mapActe(acte);
  const components = getTitulaires(dataActe);

  const idxNomTitulaire = components[0].partContent.contents.findIndex(
    content => content.libelle === "Nom Titulaire 1"
  );
  expect(idxNomTitulaire).toBeGreaterThan(-1);

  const valueNomTitulaire: JSX.Element = components[0].partContent.contents[
    idxNomTitulaire
  ].value as JSX.Element;
  expect(valueNomTitulaire.props.children).toBe("Greenwald");

  const idxPrenom1 = components[0].partContent.contents.findIndex(
    content => content.libelle === "Prénom 1"
  );
  expect(idxPrenom1).toBeGreaterThan(-1);
  expect(idxNomTitulaire).toBeLessThan(idxPrenom1);

  const valuePrenom1: JSX.Element = components[0].partContent.contents[
    idxPrenom1
  ].value as JSX.Element;
  expect(valuePrenom1.props.children).toBe("Paulita");

  const idxPrenom2 = components[0].partContent.contents.findIndex(
    content => content.libelle === "Prénom 2"
  );
  expect(idxPrenom2).toBeGreaterThan(-1);
  expect(idxPrenom1).toBeLessThan(idxPrenom2);

  const valuePrenom2: JSX.Element = components[0].partContent.contents[
    idxPrenom2
  ].value as JSX.Element;
  expect(valuePrenom2.props.children).toBe("Zaria");

  const idxPrenom3 = components[0].partContent.contents.findIndex(
    content => content.libelle === "Prénom 3"
  );
  expect(idxPrenom3).toBeGreaterThan(-1);
  expect(idxPrenom2).toBeLessThan(idxPrenom3);

  const valuePrenom3: JSX.Element = components[0].partContent.contents[
    idxPrenom3
  ].value as JSX.Element;
  expect(valuePrenom3.props.children).toBe("");

  const idxNeeLe = components[0].partContent.contents.findIndex(
    content => content.libelle === "Né(e) le"
  );
  expect(idxNeeLe).toBeGreaterThan(-1);
  expect(idxPrenom3).toBeLessThan(idxNeeLe);

  const valueNeeLe: JSX.Element = components[0].partContent.contents[idxNeeLe]
    .value as JSX.Element;
  expect(valueNeeLe.props.children).toBe("10/10/1901");

  const idxSexe = components[0].partContent.contents.findIndex(
    content => content.libelle === "Sexe"
  );
  expect(idxSexe).toBeGreaterThan(-1);
  expect(idxNeeLe).toBeLessThan(idxSexe);

  const valueSexe: JSX.Element = components[0].partContent.contents[idxSexe]
    .value as JSX.Element;
  expect(valueSexe.props.children).toBe("Féminin");

  const idxLieuNaissance = components[0].partContent.contents.findIndex(
    content => content.libelle === "Lieu de naissance"
  );
  expect(idxLieuNaissance).toBeGreaterThan(-1);
  expect(idxSexe).toBeLessThan(idxLieuNaissance);

  const valueLieuNaissance: JSX.Element = components[0].partContent.contents[
    idxLieuNaissance
  ].value as JSX.Element;
  expect(valueLieuNaissance.props.children).toBe(
    "Marseille 10ème arrondissement (Provence-Alpes-Côte d'Azur)"
  );
});
