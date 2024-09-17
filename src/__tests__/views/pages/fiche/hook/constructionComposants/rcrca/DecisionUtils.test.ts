import {
  ficheAutoriteJuridictionFranceAvecConfirmation,
  ficheAutoriteJuridictionFranceAvecConfirmationAvecDateEtrangèreRCA,
  ficheAutoriteNotaireFranceAvecConfirmation,
  ficheAutoriteONACFranceAvecConfirmation
} from "@mock/data/ficheEtBandeau/divers/DecisionAutoriteMock";
import { IFicheRcRca } from "@model/etatcivil/rcrca/IFicheRcRca";
import { getDecision } from "@pages/fiche/hook/constructionComposants/rcrca/DecisionUtils";
import { expect, test } from "vitest";

test("Decision utils get decision : decision de type Juridiction, ", () => {
  const components = getDecision(
    ficheAutoriteJuridictionFranceAvecConfirmation as any as IFicheRcRca
  );

  expect(components).toHaveLength(2);

  const idxType = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Type"
  );
  expect(idxType).toBeGreaterThan(-1);

  const idxDate = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Date"
  );
  expect(idxDate).toBeGreaterThan(-1);

  expect(idxType).toBeLessThan(idxDate as number);

  const idxEntolementRg = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Enrôlement RG"
  );
  expect(idxEntolementRg).toBeGreaterThan(-1);
  expect(idxDate).toBeLessThan(idxEntolementRg as number);

  const idxEnrolementPortalis = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Enrôlement Portalis"
  );
  expect(idxEnrolementPortalis).toBeGreaterThan(-1);
  expect(idxEntolementRg).toBeLessThan(idxEnrolementPortalis as number);
});

test("Decision utils get decision : decision de type Notaire, ", () => {
  const components = getDecision(
    ficheAutoriteNotaireFranceAvecConfirmation as unknown as IFicheRcRca
  );

  expect(components).toHaveLength(2);

  const idxType = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Type"
  );
  expect(idxType).toBeGreaterThan(-1);

  const idxDate = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Date"
  );
  expect(idxDate).toBeGreaterThan(-1);

  expect(idxType).toBeLessThan(idxDate as number);

  const idxEntolementRg = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Enrôlement RG"
  );
  expect(idxEntolementRg).toBe(-1);

  const idxEnrolementPortalis = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Enrôlement Portalis"
  );
  expect(idxEnrolementPortalis).toBe(-1);
});

test("Decision utils get decision : decision de type ONAC, ", () => {
  const componentsEtrangere = getDecision(
    ficheAutoriteONACFranceAvecConfirmation as unknown as IFicheRcRca
  );

  expect(componentsEtrangere).toHaveLength(2);

  const idxType = componentsEtrangere[1].partContent?.contents.findIndex(
    content => content.libelle === "Type"
  );
  expect(idxType).toBeGreaterThan(-1);

  const idxDate = componentsEtrangere[1].partContent?.contents.findIndex(
    content => content.libelle === "Date"
  );
  expect(idxDate).toBeGreaterThan(-1);

  expect(idxType).toBeLessThan(idxDate as number);

  const idxDateEtrangere =
    componentsEtrangere[1].partContent?.contents.findIndex(
      content => content.libelle === "Date décision étrangère"
    );
  expect(idxDateEtrangere).toBeGreaterThan(-1);

  expect(idxDate).toBeLessThan(idxDateEtrangere as number);

  const idxEntolementRg =
    componentsEtrangere[1].partContent?.contents.findIndex(
      content => content.libelle === "Enrôlement RG"
    );
  expect(idxEntolementRg).toBeGreaterThan(-1);

  const idxEnrolementPortalis =
    componentsEtrangere[1].partContent?.contents.findIndex(
      content => content.libelle === "Enrôlement Portalis"
    );
  expect(idxEnrolementPortalis).toBeGreaterThan(-1);
});

test("Decision utils get decision fiche RCA : decision de type Juridiction, ", () => {
  const components = getDecision(
    ficheAutoriteJuridictionFranceAvecConfirmationAvecDateEtrangèreRCA as unknown as IFicheRcRca
  );

  expect(components).toHaveLength(2);

  const idxType = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Type"
  );
  expect(idxType).toBeGreaterThan(-1);

  const idxDate = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Date"
  );
  expect(idxDate).toBeGreaterThan(-1);

  expect(idxType).toBeLessThan(idxDate as number);

  const idxDateEtranegre = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Date décision étrangère"
  );
  expect(idxDateEtranegre).toBeGreaterThan(-1);

  expect(idxDate).toBeLessThan(idxDateEtranegre as number);

  const idxEntolementRg = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Enrôlement RG"
  );
  expect(idxEntolementRg).toBeGreaterThan(-1);
  expect(idxDateEtranegre).toBeLessThan(idxEntolementRg as number);

  const idxEnrolementPortalis = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Enrôlement Portalis"
  );
  expect(idxEnrolementPortalis).toBeGreaterThan(-1);
  expect(idxEntolementRg).toBeLessThan(idxEnrolementPortalis as number);
});

test("Decision utils get decision fiche RCA : decision notaire et confirmation decision de type Juridiction, ", () => {
  const components = getDecision(
    ficheAutoriteJuridictionFranceAvecConfirmationAvecDateEtrangèreRCA as unknown as IFicheRcRca
  );

  expect(components).toHaveLength(2);

  const idxType = components[1].partContent?.contents.findIndex(
    content => content.libelle === "Type"
  );
  expect(idxType).toBeGreaterThan(-1);

  const idxDate = components[1].partContent?.contents.findIndex(
    content => content.libelle === "Date"
  );
  expect(idxDate).toBeGreaterThan(-1);

  expect(idxType).toBeLessThan(idxDate as number);

  const idxDateEtranegre = components[1].partContent?.contents.findIndex(
    content => content.libelle === "Date décision étrangère"
  );
  expect(idxDateEtranegre).toBeGreaterThan(-1);

  expect(idxDate).toBeLessThan(idxDateEtranegre as number);

  const idxEntolementRg = components[1].partContent?.contents.findIndex(
    content => content.libelle === "Enrôlement RG"
  );
  expect(idxEntolementRg).toBeGreaterThan(-1);
  expect(idxDateEtranegre).toBeLessThan(idxEntolementRg as number);

  const idxEnrolementPortalis = components[1].partContent?.contents.findIndex(
    content => content.libelle === "Enrôlement Portalis"
  );
  expect(idxEnrolementPortalis).toBeGreaterThan(-1);
  expect(idxEntolementRg).toBeLessThan(idxEnrolementPortalis as number);
});
