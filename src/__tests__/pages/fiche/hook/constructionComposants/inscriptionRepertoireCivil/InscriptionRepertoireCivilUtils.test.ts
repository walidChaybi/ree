import { getInscriptionRepertoireCivil } from "../../../../../../views/pages/fiche/hook/constructionComposants/inscriptionRepertoireCivil/InscriptionRepertoireCivilUtils";
import { IFicheRc } from "../../../../../../model/etatcivil/FicheInterfaces";
import {
  ficheInscriptionRepertoireCivil,
  ficheInscriptionRepertoireCivilSansInscriptionsLieesInscriptionsImpactes,
  ficheInscriptionRepertoireCivilSansUniteDureeInscription,
  ficheInscriptionRepertoireCivilSansDonnees
} from "../mock/InscriptionRepertoireCivilMock";

test("Inscription repertoire civil utils : affichage correcte des infos d'une inscription civile  ", async () => {
  const component = getInscriptionRepertoireCivil(
    ficheInscriptionRepertoireCivil as IFicheRc
  );

  const idxNature = component.contents.findIndex(
    content => content.libelle === "Nature"
  );
  expect(idxNature).toBeGreaterThan(-1);

  const idxMandataire = component.contents.findIndex(
    content => content.libelle === "Mandataire(s)"
  );
  expect(idxMandataire).toBeGreaterThan(-1);
  const valueMandataire: string = component.contents[idxMandataire].value;

  expect(valueMandataire.match(/ \/ /)).toHaveLength(1);
  expect(idxNature).toBeLessThan(idxMandataire);

  const idxTyepInscription = component.contents.findIndex(
    content => content.libelle === "Type inscription"
  );
  expect(idxTyepInscription).toBeGreaterThan(-1);
  const valueTyepInscription: JSX.Element =
    component.contents[idxTyepInscription].value;
  expect(valueTyepInscription.props.children[0]).toBe("Renouvellement (");
  expect(valueTyepInscription.props.children[1]).toHaveLength(2);
  expect(valueTyepInscription.props.children[2]).toBe(")");
  expect(idxMandataire).toBeLessThan(idxTyepInscription);

  const idxInscriptionLie = component.contents.findIndex(
    content => content.libelle === "Inscription(s) liée(s)"
  );
  expect(idxInscriptionLie).toBeGreaterThan(-1);
  expect(idxMandataire).toBeLessThan(idxInscriptionLie);

  const idxDateInscription = component.contents.findIndex(
    content => content.libelle === "Date d'inscription"
  );
  const valueDateInscription = component.contents[idxDateInscription].value;
  expect(idxDateInscription).toBeGreaterThan(-1);
  expect(valueDateInscription).toBe("15/02/2018");
  expect(idxInscriptionLie).toBeLessThan(idxDateInscription);

  const idxDureeInscription = component.contents.findIndex(
    content => content.libelle === "Durée inscription"
  );
  const valueDureeInscription = component.contents[idxDureeInscription].value;
  expect(idxDureeInscription).toBeGreaterThan(-1);
  expect(valueDureeInscription).toBe("2 années");
  expect(idxDateInscription).toBeLessThan(idxDureeInscription);

  const idxDateFinMEsure = component.contents.findIndex(
    content => content.libelle === "Date fin de mesure"
  );
  const valueDateFinMesure = component.contents[idxDateFinMEsure].value;
  expect(idxDateFinMEsure).toBeGreaterThan(-1);
  expect(valueDateFinMesure).toBe("15/02/2020");
  expect(idxDureeInscription).toBeLessThan(idxDateFinMEsure);
});

test("Inscription repertoire civil utils : affichage correcte des infos d'une inscription civile sans isncriptions liees  et sans inscriptions impactées", async () => {
  const component = getInscriptionRepertoireCivil(
    ficheInscriptionRepertoireCivilSansUniteDureeInscription as IFicheRc
  );
  const idxDureeInscription = component.contents.findIndex(
    content => content.libelle === "Durée inscription"
  );
  const valueDureeInscription = component.contents[idxDureeInscription].value;
  expect(idxDureeInscription).toBeGreaterThan(-1);
  expect(valueDureeInscription).toBe("Viager");
});

test("Inscription repertoire civil utils : affichage correcte des infos d'une inscription civile sans isncriptions liees  et sans inscriptions impactées", async () => {
  const component = getInscriptionRepertoireCivil(
    ficheInscriptionRepertoireCivilSansInscriptionsLieesInscriptionsImpactes as IFicheRc
  );

  const idxTyepInscription = component.contents.findIndex(
    content => content.libelle === "Type inscription"
  );
  expect(idxTyepInscription).toBeGreaterThan(-1);
  const valueTyepInscription: JSX.Element =
    component.contents[idxTyepInscription].value;

  expect(valueTyepInscription.props.children[0]).toBe("Renouvellement ");
  expect(valueTyepInscription.props.children[1]).toHaveLength(0);
  expect(valueTyepInscription.props.children[2]).toBe("");
});

test("Inscription repertoire civil utils : affichage correcte des infos d'une inscription civile sans isncriptions liees  et sans inscriptions impactées", async () => {
  const component = getInscriptionRepertoireCivil(
    ficheInscriptionRepertoireCivilSansDonnees as IFicheRc
  );

  expect(component.title).toBe("Inscrition au répertoire civil");
});
