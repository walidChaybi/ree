import { getInscriptionRepertoireCivil } from "../../../../../../views/pages/fiche/hook/constructionComposants/inscriptionRepertoireCivil/InscriptionRepertoireCivilUtils";
import {
  ficheInscriptionRepertoireCivil,
  ficheInscriptionRepertoireCivilSansInscriptionsLieesInscriptionsImpactes,
  ficheInscriptionRepertoireCivilSansUniteDureeInscription,
  ficheInscriptionRepertoireCivilSansDonnees
} from "../mock/InscriptionRepertoireCivilMock";
import { IFicheRcRcaRca } from "../../../../../../model/etatcivil/fiche/FicheInterfaces";

test("Inscription repertoire civil utils : affichage correcte des infos d'une inscription civile  ", async () => {
  const component = getInscriptionRepertoireCivil(
    ficheInscriptionRepertoireCivil as IFicheRcRcaRca
  );

  const idxNature = component.contentsPart.contents.findIndex(
    content => content.libelle === "Nature"
  );
  expect(idxNature).toBeGreaterThan(-1);

  const idxMandataire = component.contentsPart.contents.findIndex(
    content => content.libelle === "Mandataire(s)"
  );
  expect(idxMandataire).toBeGreaterThan(-1);
  const valueMandataire: string =
    component.contentsPart.contents[idxMandataire].value;

  expect(valueMandataire.match(/ \/ /)).toHaveLength(1);
  expect(idxNature).toBeLessThan(idxMandataire);

  const idxTypeInscription = component.contentsPart.contents.findIndex(
    content => content.libelle === "Type inscription"
  );
  expect(idxTypeInscription).toBeGreaterThan(-1);
  const valueTypeInscription: JSX.Element =
    component.contentsPart.contents[idxTypeInscription].value;
  expect(valueTypeInscription.props.children[0]).toBe("Renouvellement");
  expect(valueTypeInscription.props.children[1]).toHaveLength(2);
  expect(idxMandataire).toBeLessThan(idxTypeInscription);

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

  const idxInscriptionLie = component.contentsPart.contents.findIndex(
    content => content.libelle === "Inscription(s) liée(s)"
  );
  expect(idxInscriptionLie).toBeGreaterThan(-1);
  expect(idxMandataire).toBeLessThan(idxInscriptionLie);

  const idxDateInscription = component.contentsPart.contents.findIndex(
    content => content.libelle === "Date d'inscription"
  );
  const valueDateInscription =
    component.contentsPart.contents[idxDateInscription].value;
  expect(idxDateInscription).toBeGreaterThan(-1);
  expect(valueDateInscription).toBe("15/02/2018");
  expect(idxInscriptionLie).toBeLessThan(idxDateInscription);

  const idxDureeInscription = component.contentsPart.contents.findIndex(
    content => content.libelle === "Durée inscription"
  );
  const valueDureeInscription =
    component.contentsPart.contents[idxDureeInscription].value;
  expect(idxDureeInscription).toBeGreaterThan(-1);
  expect(valueDureeInscription).toBe("2 années");
  expect(idxDateInscription).toBeLessThan(idxDureeInscription);

  const idxDateFinMEsure = component.contentsPart.contents.findIndex(
    content => content.libelle === "Date fin de mesure"
  );
  const valueDateFinMesure =
    component.contentsPart.contents[idxDateFinMEsure].value;
  expect(idxDateFinMEsure).toBeGreaterThan(-1);
  expect(valueDateFinMesure).toBe("15/02/2020");
  expect(idxDureeInscription).toBeLessThan(idxDateFinMEsure);
});

test("Inscription repertoire civil utils : affichage correcte des infos d'une inscription civile sans unité de durée d'inscription", async () => {
  const component = getInscriptionRepertoireCivil(
    ficheInscriptionRepertoireCivilSansUniteDureeInscription as IFicheRcRca
  );
  const idxDureeInscription = component.contentsPart.contents.findIndex(
    content => content.libelle === "Durée inscription"
  );
  const valueDureeInscription =
    component.contentsPart.contents[idxDureeInscription].value;
  expect(idxDureeInscription).toBeGreaterThan(-1);
  expect(valueDureeInscription).toBe("Viager");
});

test("Inscription repertoire civil utils : affichage correcte des infos d'une inscription civile sans inscriptions liees et sans inscriptions impactées", async () => {
  const component = getInscriptionRepertoireCivil(
    ficheInscriptionRepertoireCivilSansInscriptionsLieesInscriptionsImpactes as IFicheRcRca
  );

  const idxTypeInscription = component.contentsPart.contents.findIndex(
    content => content.libelle === "Type inscription"
  );
  expect(idxTypeInscription).toBeGreaterThan(-1);
  const valueTypeInscription: JSX.Element =
    component.contentsPart.contents[idxTypeInscription].value;

  expect(valueTypeInscription.props.children[0]).toBe("Renouvellement");
  expect(valueTypeInscription.props.children[1]).toHaveLength(0);
});

test("Inscription repertoire civil utils : affichage sans données", async () => {
  const component = getInscriptionRepertoireCivil(
    ficheInscriptionRepertoireCivilSansDonnees as IFicheRcRca
  );

  expect(component.contentsPart.title).toBe("Inscription au répertoire civil");
});
