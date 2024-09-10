import { mapActe } from "@hook/repertoires/MappingRepertoires";
import { getTitulairesAM } from "@pages/fiche/hook/constructionComposants/acte/TitulairesActeUtils";
import { UN, ZERO } from "@util/Utils";
import { expect, test } from "vitest";
import { acte } from "../../../../../../../mock/data/ficheEtBandeau/ficheActe";

test("Acte utils : affichage correcte des infos d'un titulaire", () => {
  const dataActe = mapActe(acte);
  const components = getTitulairesAM(dataActe);

  const idxNomTitulaire = components[ZERO].partContent?.contents.findIndex(
    content => content.libelle === "Nom Titulaire 1"
  );
  expect(idxNomTitulaire).toBeGreaterThan(-UN);

  const valueNomTitulaire: JSX.Element = components[ZERO].partContent?.contents[
    Number(idxNomTitulaire)
  ].value as JSX.Element;
  expect(valueNomTitulaire.props.children).toBe("Greenwild");

  const idxPrenom1 = components[ZERO].partContent?.contents.findIndex(
    content => content.libelle === "Prénom 1"
  );
  expect(idxPrenom1).toBeGreaterThan(-UN);
  expect(idxNomTitulaire).toBeLessThan(Number(idxPrenom1));

  const valuePrenom1: JSX.Element = components[ZERO].partContent?.contents[
    Number(idxPrenom1)
  ].value as JSX.Element;
  expect(valuePrenom1.props.children).toBe("Pauliti");

  const idxPrenom2 = components[ZERO].partContent?.contents.findIndex(
    content => content.libelle === "Prénom 2"
  );
  expect(idxPrenom2).toBeGreaterThan(-UN);
  expect(idxPrenom1).toBeLessThan(Number(idxPrenom2));

  const valuePrenom2: JSX.Element = components[ZERO].partContent?.contents[
    Number(idxPrenom2)
  ].value as JSX.Element;
  expect(valuePrenom2.props.children).toBe("Ziria");

  const idxPrenom3 = components[ZERO].partContent?.contents.findIndex(
    content => content.libelle === "Prénom 3"
  );
  expect(idxPrenom3).toBeGreaterThan(-UN);
  expect(idxPrenom2).toBeLessThan(Number(idxPrenom3));

  const valuePrenom3: JSX.Element = components[ZERO].partContent?.contents[
    Number(idxPrenom3)
  ].value as JSX.Element;
  expect(valuePrenom3.props.children).toBe("");

  const idxNeeLe = components[ZERO].partContent?.contents.findIndex(
    content => content.libelle === "Né(e) le"
  );
  expect(idxNeeLe).toBeGreaterThan(-UN);
  expect(idxPrenom3).toBeLessThan(Number(idxNeeLe));

  const valueNeeLe: JSX.Element = components[ZERO].partContent?.contents[
    Number(idxNeeLe)
  ].value as JSX.Element;
  expect(valueNeeLe.props.children).toBe("10/10/1901");

  const idxSexe = components[ZERO].partContent?.contents.findIndex(
    content => content.libelle === "Sexe"
  );
  expect(idxSexe).toBeGreaterThan(-UN);
  expect(idxNeeLe).toBeLessThan(Number(idxSexe));

  const valueSexe: JSX.Element = components[ZERO].partContent?.contents[
    Number(idxSexe)
  ].value as JSX.Element;
  expect(valueSexe.props.children).toBe("Féminin");

  const idxLieuNaissance = components[ZERO].partContent?.contents.findIndex(
    content => content.libelle === "Lieu de naissance"
  );
  expect(idxLieuNaissance).toBeGreaterThan(-UN);
  expect(idxSexe).toBeLessThan(Number(idxLieuNaissance));

  const valueLieuNaissance: JSX.Element = components[ZERO].partContent
    ?.contents[Number(idxLieuNaissance)].value as JSX.Element;
  expect(valueLieuNaissance.props.children).toBe(
    "Marseille 10ème arrondissement (Provence-Alpes-Côte d'Azur)"
  );
});
