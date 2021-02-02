import {
  ficheAutoriteJuridictionFranceAvecConfirmation,
  ficheAutoriteNotaireFranceAvecConfirmation,
  ficheAutoriteONACFranceAvecConfirmation,
  ficheAutoriteJuridictionFranceAvecConfirmationAvecDateEtrangèreRCA
} from "./mock/DecisionAutoriteMock";
import { IFicheRcRca } from "../../../../../model/etatcivil/FicheInterfaces";
import { getDecision } from "../../../../../views/pages/fiche/hook/constructionComposants/DecisionUtils";

test("Decision utils get decision : decision de type Juridiction, ", async () => {
  const components = getDecision(
    ficheAutoriteJuridictionFranceAvecConfirmation as IFicheRcRca
  );

  expect(components).toHaveLength(2);

  const idxType = components[0].contentsPart?.contents.findIndex(
    content => content.libelle === "Type"
  );
  expect(idxType).toBeGreaterThan(-1);

  const idxDate = components[0].contentsPart?.contents.findIndex(
    content => content.libelle === "Date"
  );
  expect(idxDate).toBeGreaterThan(-1);

  expect(idxType).toBeLessThan(idxDate);

  const idxEntolementRg = components[0].contentsPart?.contents.findIndex(
    content => content.libelle === "Enrôlement RG"
  );
  expect(idxEntolementRg).toBeGreaterThan(-1);
  expect(idxDate).toBeLessThan(idxEntolementRg);

  const idxEnrolementPortalis = components[0].contentsPart?.contents.findIndex(
    content => content.libelle === "Enrôlement Portalis"
  );
  expect(idxEnrolementPortalis).toBeGreaterThan(-1);
  expect(idxEntolementRg).toBeLessThan(idxEnrolementPortalis);
});

test("Decision utils get decision : decision de type Notaire, ", async () => {
  const components = getDecision(
    ficheAutoriteNotaireFranceAvecConfirmation as IFicheRcRca
  );

  expect(components).toHaveLength(2);

  const idxType = components[0].contentsPart?.contents.findIndex(
    content => content.libelle === "Type"
  );
  expect(idxType).toBeGreaterThan(-1);

  const idxDate = components[0].contentsPart?.contents.findIndex(
    content => content.libelle === "Date"
  );
  expect(idxDate).toBeGreaterThan(-1);

  expect(idxType).toBeLessThan(idxDate);

  const idxEntolementRg = components[0].contentsPart?.contents.findIndex(
    content => content.libelle === "Enrôlement RG"
  );
  expect(idxEntolementRg).toBe(-1);

  const idxEnrolementPortalis = components[0].contentsPart?.contents.findIndex(
    content => content.libelle === "Enrôlement Portalis"
  );
  expect(idxEnrolementPortalis).toBe(-1);
});

test("Decision utils get decision : decision de type ONAC, ", async () => {
  const componentsEtrangere = getDecision(
    ficheAutoriteONACFranceAvecConfirmation as IFicheRcRca
  );

  expect(componentsEtrangere).toHaveLength(2);

  const idxType = componentsEtrangere[1].contentsPart?.contents.findIndex(
    content => content.libelle === "Type"
  );
  expect(idxType).toBeGreaterThan(-1);

  const idxDate = componentsEtrangere[1].contentsPart?.contents.findIndex(
    content => content.libelle === "Date"
  );
  expect(idxDate).toBeGreaterThan(-1);

  expect(idxType).toBeLessThan(idxDate);

  const idxDateEtrangere = componentsEtrangere[1].contentsPart?.contents.findIndex(
    content => content.libelle === "Date décision étrangère"
  );
  expect(idxDateEtrangere).toBeGreaterThan(-1);

  expect(idxDate).toBeLessThan(idxDateEtrangere);

  const idxEntolementRg = componentsEtrangere[1].contentsPart?.contents.findIndex(
    content => content.libelle === "Enrôlement RG"
  );
  expect(idxEntolementRg).toBeGreaterThan(-1);

  const idxEnrolementPortalis = componentsEtrangere[1].contentsPart?.contents.findIndex(
    content => content.libelle === "Enrôlement Portalis"
  );
  expect(idxEnrolementPortalis).toBeGreaterThan(-1);
});

test("Decision utils get decision fiche RCA : decision de type Juridiction, ", async () => {
  const components = getDecision(
    ficheAutoriteJuridictionFranceAvecConfirmationAvecDateEtrangèreRCA as IFicheRcRca
  );

  expect(components).toHaveLength(2);

  const idxType = components[0].contentsPart?.contents.findIndex(
    content => content.libelle === "Type"
  );
  expect(idxType).toBeGreaterThan(-1);

  const idxDate = components[0].contentsPart?.contents.findIndex(
    content => content.libelle === "Date"
  );
  expect(idxDate).toBeGreaterThan(-1);

  expect(idxType).toBeLessThan(idxDate);

  const idxDateEtranegre = components[0].contentsPart?.contents.findIndex(
    content => content.libelle === "Date décision étrangère"
  );
  expect(idxDateEtranegre).toBeGreaterThan(-1);

  expect(idxDate).toBeLessThan(idxDateEtranegre);

  const idxEntolementRg = components[0].contentsPart?.contents.findIndex(
    content => content.libelle === "Enrôlement RG"
  );
  expect(idxEntolementRg).toBeGreaterThan(-1);
  expect(idxDateEtranegre).toBeLessThan(idxEntolementRg);

  const idxEnrolementPortalis = components[0].contentsPart?.contents.findIndex(
    content => content.libelle === "Enrôlement Portalis"
  );
  expect(idxEnrolementPortalis).toBeGreaterThan(-1);
  expect(idxEntolementRg).toBeLessThan(idxEnrolementPortalis);
});

test("Decision utils get decision fiche RCA : decision notaire et confirmation decision de type Juridiction, ", async () => {
  const components = getDecision(
    ficheAutoriteJuridictionFranceAvecConfirmationAvecDateEtrangèreRCA as IFicheRcRca
  );

  expect(components).toHaveLength(2);

  const idxType = components[1].contentsPart?.contents.findIndex(
    content => content.libelle === "Type"
  );
  expect(idxType).toBeGreaterThan(-1);

  const idxDate = components[1].contentsPart?.contents.findIndex(
    content => content.libelle === "Date"
  );
  expect(idxDate).toBeGreaterThan(-1);

  expect(idxType).toBeLessThan(idxDate);

  const idxDateEtranegre = components[1].contentsPart?.contents.findIndex(
    content => content.libelle === "Date décision étrangère"
  );
  expect(idxDateEtranegre).toBeGreaterThan(-1);

  expect(idxDate).toBeLessThan(idxDateEtranegre);

  const idxEntolementRg = components[1].contentsPart?.contents.findIndex(
    content => content.libelle === "Enrôlement RG"
  );
  expect(idxEntolementRg).toBeGreaterThan(-1);
  expect(idxDateEtranegre).toBeLessThan(idxEntolementRg);

  const idxEnrolementPortalis = components[1].contentsPart?.contents.findIndex(
    content => content.libelle === "Enrôlement Portalis"
  );
  expect(idxEnrolementPortalis).toBeGreaterThan(-1);
  expect(idxEntolementRg).toBeLessThan(idxEnrolementPortalis);
});
