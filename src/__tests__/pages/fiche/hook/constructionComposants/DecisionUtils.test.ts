import {
  ficheAutoriteJuridictionFranceAvecConfirmation,
  ficheAutoriteNotaireFranceAvecConfirmation
} from "./mock/DecisionAutoriteMock";
import { IFicheRc } from "../../../../../model/ficheRcRca/FicheRcInterfaces";
import { getDecision } from "../../../../../views/pages/fiche/hook/constructionComposants/DecisionUtils";

test("Decision utils get decision : decision de type Juridiction, ", async () => {
  const components = getDecision(
    ficheAutoriteJuridictionFranceAvecConfirmation as IFicheRc
  );

  expect(components).toHaveLength(2);

  const idxType = components[0].contents.findIndex(
    content => content.libelle === "Type"
  );
  expect(idxType).toBeGreaterThan(-1);

  const idxDate = components[0].contents.findIndex(
    content => content.libelle === "Date"
  );
  expect(idxDate).toBeGreaterThan(-1);

  expect(idxType).toBeLessThan(idxDate);

  const idxEntolementRg = components[0].contents.findIndex(
    content => content.libelle === "Enrôlement RG"
  );
  expect(idxEntolementRg).toBeGreaterThan(-1);
  expect(idxDate).toBeLessThan(idxEntolementRg);

  const idxEnrolementPortalis = components[0].contents.findIndex(
    content => content.libelle === "Enrôlement Portalis"
  );
  expect(idxEnrolementPortalis).toBeGreaterThan(-1);
  expect(idxEntolementRg).toBeLessThan(idxEnrolementPortalis);
});

test("Decision utils get decision : decision de type Notaire, ", async () => {
  const components = getDecision(
    ficheAutoriteNotaireFranceAvecConfirmation as IFicheRc
  );

  expect(components).toHaveLength(2);

  const idxType = components[0].contents.findIndex(
    content => content.libelle === "Type"
  );
  expect(idxType).toBeGreaterThan(-1);

  const idxDate = components[0].contents.findIndex(
    content => content.libelle === "Date"
  );
  expect(idxDate).toBeGreaterThan(-1);

  expect(idxType).toBeLessThan(idxDate);

  const idxEntolementRg = components[0].contents.findIndex(
    content => content.libelle === "Enrôlement RG"
  );
  expect(idxEntolementRg).toBe(-1);

  const idxEnrolementPortalis = components[0].contents.findIndex(
    content => content.libelle === "Enrôlement Portalis"
  );
  expect(idxEnrolementPortalis).toBe(-1);
});
