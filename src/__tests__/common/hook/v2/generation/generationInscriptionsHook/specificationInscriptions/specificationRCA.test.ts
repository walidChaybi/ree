import {
  FicheRcaDecisionAvecInstructionProcureur,
  FicheRcaDecisionJuridictionEtrangere,
  FicheRcaDecisionNotaireConvention
} from "../../../../../../../mock/data/ficheRCA";
import { specificationRCA } from "../../../../../../../views/common/hook/v2/generation/generationInscriptionsHook/specificationInscriptions/specificationRCA";

test("Attendu: specificationRCA.getElementsJasper AVEC une instruction procureur", async () => {
  const data = FicheRcaDecisionAvecInstructionProcureur;
  const elementsJasper = specificationRCA.getElementsJasper(data);
  const interesse = `Léo, Jules FLECK
Date de naissance: 01 Septembre 1983
Lieu de naissance: Lyon Arrdt 8 (Rhône)
Date de décès: Mars 2003
Lieu de décès: Londres - Grand-Londres (Royaume-Uni)`;
  expect(elementsJasper.anneeInscription).toBe("2020");
  expect(elementsJasper.numeroInscription).toBe("4012");
  expect(elementsJasper.decisionRecue).toBe(
    "Le service central d'état civil a reçu la décision de la Directrice générale de l'Office national des anciens combattants et victimes de guerre en date du 26 Novembre 2020 concernant la mention adoption simple prononcée à l'étranger avec jugement d'exequatur attribuée à :"
  );
  expect(elementsJasper.interesseDecision).toBe(interesse);
  expect(elementsJasper.decisionExequatur).toBeUndefined();
  expect(elementsJasper.paragrapheFin).toBe(
    "Conformément à l'article Article 4-1 du décret 65-422 du 1er juin 1965, et sur instruction du procureur de la République de Nantes Arr.arrondissement (Loire-Atlantique) (N° réf. 56848) du 26 Novembre 2020, une inscription a été prise au répertoire civil annexe le 23 Février 2020 sous la référence : RCA n°2020 - 4012"
  );
});

test("Attendu: specificationRCA.getElementsJasper AVEC une decision Juridiction étrangère", async () => {
  const data = FicheRcaDecisionJuridictionEtrangere;
  const elementsJasper = specificationRCA.getElementsJasper(data);
  const interesse = `Léo, Jules FLECK
Date de naissance: 01 Septembre 1983
Lieu de naissance: Lyon Arrdt 8 (Rhône)
par
Lucas, Didier DUPONT
Date de naissance: 01 Février 1993
Lieu de naissance: Nantes (Loire-Atlantique)`;
  expect(elementsJasper.anneeInscription).toBe("2020");
  expect(elementsJasper.numeroInscription).toBe("4013");
  expect(elementsJasper.decisionRecue).toBe(
    "Le service central d'état civil a reçu le jugement du Tribunal judiciaire de Paris Arrdt 18, en date du 26 Novembre 2020 concernant le changement de régime matrimonial par acte notarié étranger / instruction du Procureur de :  "
  );
  expect(elementsJasper.interesseDecision).toBe(interesse);
  expect(elementsJasper.decisionExequatur).toBe(
    "prise en exequatur de la décision étrangère en date du 26 Novembre 2020"
  );
  expect(elementsJasper.paragrapheFin).toBe(
    "Conformément à l'article Article 4-1 du décret 65-422 du 1er juin 1965, une inscription a été prise au répertoire civil annexe le 23 Février 2020 sous la référence : RCA n°2020 - 4013"
  );
});

test("Attendu: specificationRCA.getElementsJasper AVEC une decision Notaire type convention", async () => {
  const data = FicheRcaDecisionNotaireConvention;
  const elementsJasper = specificationRCA.getElementsJasper(data);
  const interesses = `Julie, Sarah DURANT
Date de naissance: Octobre 1960
Lieu de naissance: Brooklyn - New-York (États-unis d'Amériques)
et
Harleen, Charlène QUINZEL
Date de naissance: 1993
Lieu de naissance: Nantes (Loire-Atlantique)
Mariés devant les autorités consulaires de Italie en France le 28 Juin 2018`;
  expect(elementsJasper.anneeInscription).toBe("1998");
  expect(elementsJasper.numeroInscription).toBe("4094");
  expect(elementsJasper.decisionRecue).toBe(
    "Le service central d'état civil a reçu la convention déposée au rang des minutes de Maitre Flavie Le-Grand, notaire à Nantes (Pays de la Loire), office notarial n°9AKLO, le 3 Juin 2020 concernant la contestation de paternité de : "
  );
  expect(elementsJasper.interesseDecision).toBe(interesses);
  expect(elementsJasper.decisionExequatur).toBeUndefined();
  expect(elementsJasper.paragrapheFin).toBe(
    "Conformément à l'article Article 4-1 du décret 65-422 du 1er juin 1965, une inscription a été prise au répertoire civil annexe le 20 Avril 1929 sous la référence : RCA n°1998 - 4094"
  );
});
