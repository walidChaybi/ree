import {
  ficheInscriptionRepertoireCivil,
  ficheInscriptionRepertoireCivilSansInscriptionsLieesInscriptionsImpactes,
  ficheInscriptionRepertoireCivilSansUniteDureeInscription
} from "@mock/data/ficheEtBandeau/divers/InscriptionRepertoireCivilMock";
import { IFicheRcRca } from "@model/etatcivil/rcrca/IFicheRcRca";
import { getInscriptionRepertoireCivil } from "@pages/fiche/hook/constructionComposants/inscriptionRepertoireCivil/InscriptionRepertoireCivilUtils";
import { expect, test } from "vitest";

test("Inscription repertoire civil utils : affichage correcte des infos d'une inscription civile  ", () => {
  const component = getInscriptionRepertoireCivil(
    ficheInscriptionRepertoireCivil as unknown as IFicheRcRca
  );

  const idxNature = component.partContent?.contents.findIndex(
    content => content.libelle === "Nature"
  );
  expect(idxNature).toBeGreaterThan(-1);

  const idxMandataire = component.partContent?.contents.findIndex(
    content => content.libelle === "Mandataire(s)"
  );
  expect(idxMandataire).toBeGreaterThan(-1);
  const valueMandataire: string = component.partContent?.contents[
    idxMandataire as number
  ].value as string;

  expect(valueMandataire.match(/ \/ /)).toHaveLength(1);
  expect(idxNature).toBeLessThan(idxMandataire as number);

  const idxTypeInscription = component.partContent?.contents.findIndex(
    content => content.libelle === "Type inscription"
  );
  expect(idxTypeInscription).toBeGreaterThan(-1);
  const valueTypeInscription: JSX.Element = component.partContent?.contents[
    idxTypeInscription as number
  ].value as JSX.Element;
  expect(valueTypeInscription.props.children[0]).toBe("Renouvellement");
  expect(valueTypeInscription.props.children[1]).toHaveLength(2);
  expect(idxMandataire).toBeLessThan(idxTypeInscription as number);

  const valueTypeInscription1: JSX.Element =
    valueTypeInscription.props.children[1][0];
  expect(valueTypeInscription1.props.children[0]).toBe(" (");
  expect(valueTypeInscription1.props.children[1]).toBe("RC n°");
  expect(valueTypeInscription1.props.children[3]).toBe(", ");

  const valueTypeInscription2: JSX.Element =
    valueTypeInscription.props.children[1][1];
  expect(valueTypeInscription2.props.children[0]).toBe("");
  expect(valueTypeInscription2.props.children[1]).toBe("RC n°");
  expect(valueTypeInscription2.props.children[3]).toBe(")");

  const idxInscriptionLie = component.partContent?.contents.findIndex(
    content => content.libelle === "Inscription(s) liée(s)"
  );
  expect(idxInscriptionLie).toBeGreaterThan(-1);
  expect(idxMandataire).toBeLessThan(idxInscriptionLie as number);

  const idxDateInscription = component.partContent?.contents.findIndex(
    content => content.libelle === "Date d'inscription"
  );
  const valueDateInscription =
    component.partContent?.contents[idxDateInscription as number].value;
  expect(idxDateInscription).toBeGreaterThan(-1);
  expect(valueDateInscription).toBe("15/02/2018");
  expect(idxInscriptionLie).toBeLessThan(idxDateInscription as number);

  const idxDureeInscription = component.partContent?.contents.findIndex(
    content => content.libelle === "Durée inscription"
  );
  const valueDureeInscription =
    component.partContent?.contents[idxDureeInscription as number].value;
  expect(idxDureeInscription).toBeGreaterThan(-1);
  expect(valueDureeInscription).toBe("2 années");
  expect(idxDateInscription).toBeLessThan(idxDureeInscription as number);

  const idxDateFinMEsure = component.partContent?.contents.findIndex(
    content => content.libelle === "Date fin de mesure"
  );
  const valueDateFinMesure =
    component.partContent?.contents[idxDateFinMEsure as number].value;
  expect(idxDateFinMEsure).toBeGreaterThan(-1);
  expect(valueDateFinMesure).toBe("15/02/2020");
  expect(idxDureeInscription).toBeLessThan(idxDateFinMEsure as number);
});

test("Inscription repertoire civil utils : affichage correcte des infos d'une inscription civile sans unité de durée d'inscription", () => {
  const component = getInscriptionRepertoireCivil(
    ficheInscriptionRepertoireCivilSansUniteDureeInscription as unknown as IFicheRcRca
  );
  const idxDateFinDeMesure = component.partContent?.contents.findIndex(
    content => content.libelle === "Date fin de mesure"
  );
  const valueDateFinDeMesure =
    component.partContent?.contents[idxDateFinDeMesure as number].value;
  expect(idxDateFinDeMesure).toBeGreaterThan(-1);
  expect(valueDateFinDeMesure).toBe("15/02/2020");
});

test("Inscription repertoire civil utils : affichage correcte des infos d'une inscription civile sans inscriptions liees et sans inscriptions impactées", async () => {
  const component = getInscriptionRepertoireCivil(
    ficheInscriptionRepertoireCivilSansInscriptionsLieesInscriptionsImpactes as unknown as IFicheRcRca
  );

  const idxTypeInscription = component.partContent?.contents.findIndex(
    content => content.libelle === "Type inscription"
  );
  expect(idxTypeInscription).toBeGreaterThan(-1);
  const valueTypeInscription: JSX.Element = component.partContent?.contents[
    idxTypeInscription as number
  ].value as JSX.Element;

  expect(valueTypeInscription.props.children[0]).toBe("Renouvellement");
  expect(valueTypeInscription.props.children[1]).toHaveLength(0);
});
