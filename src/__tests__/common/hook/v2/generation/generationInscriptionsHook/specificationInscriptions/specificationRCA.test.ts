import {
  IFicheRcRcaDecisionAvecInstructionProcureur,
  IFicheRcRcaDecisionJuridictionEtrangere
} from "../../../../../../../mock/data/ficheRCA";
import { specificationRCA } from "../../../../../../../views/common/hook/v2/generation/generationInscriptionsHook/specificationInscriptions/specificationRCA";

test("Attendu: specificationRCA.getElementsJasper AVEC une instruction procureur", async () => {
  const data = IFicheRcRcaDecisionAvecInstructionProcureur;
  const elementsJasper = specificationRCA.getElementsJasper(data);
  expect(elementsJasper.anneeInscription).toBe("2020");
  expect(elementsJasper.numeroInscription).toBe("4012");
  expect(elementsJasper.decisionRecue).toBe("TODO US 452");
  expect(elementsJasper.interesseDecision).toBe("TODO US 398");
  expect(elementsJasper.decisionExequatur).toBeUndefined();
  expect(elementsJasper.paragrapheFin).toBe(
    "Conformément à l'article Article 4-1 du décret 65-422 du 1er juin 1965, et sur instruction du procureur de la République de Nantes Arr.arrondissement (Loire-Atlantique) (N° réf. 56848) du 26 Novembre 2020, une inscription a été prise au répertoire civil annexe le 23 Février 2020 sous la référence : RCA n°2020 - 4012"
  );
});

test("Attendu: specificationRCA.getElementsJasper AVEC une decision Juridiction étrangère", async () => {
  const data = IFicheRcRcaDecisionJuridictionEtrangere;
  const elementsJasper = specificationRCA.getElementsJasper(data);
  expect(elementsJasper.anneeInscription).toBe("2020");
  expect(elementsJasper.numeroInscription).toBe("4013");
  expect(elementsJasper.decisionRecue).toBe("TODO US 452");
  expect(elementsJasper.interesseDecision).toBe("TODO US 398");
  expect(elementsJasper.decisionExequatur).toBe(
    "prise en exequatur de la décision étrangère en date du 26 Novembre 2020"
  );
  expect(elementsJasper.paragrapheFin).toBe(
    "Conformément à l'article Article 4-1 du décret 65-422 du 1er juin 1965, une inscription a été prise au répertoire civil annexe le 23 Février 2020 sous la référence : RCA n°2020 - 4013"
  );
});
