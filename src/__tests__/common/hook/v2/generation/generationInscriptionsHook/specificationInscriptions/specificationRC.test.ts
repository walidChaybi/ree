import request from "superagent";
import {
  FicheRcDecisionNotaire,
  FicheRcRenouvellement
} from "../../../../../../../mock/data/ficheRC";
import { configEtatcivil } from "../../../../../../../mock/superagent-config/superagent-mock-etatcivil";
import { NatureRc } from "../../../../../../../model/etatcivil/enum/NatureRc";
import { specificationRC } from "../../../../../../../views/common/hook/v2/generation/generationInscriptionsHook/specificationInscriptions/specificationRC";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

beforeAll(() => {
  NatureRc.init();
});
test("Attendu: specificationRC.getElementsJasper ", async () => {
  const data = FicheRcDecisionNotaire;
  const elementsJasper = specificationRC.getElementsJasper(data);
  expect(elementsJasper.anneeInscription).toBe("2020");
  expect(elementsJasper.numeroInscription).toBe("11");
  expect(elementsJasper.decisionRecue1).toBe("TODO US 499");
  expect(elementsJasper.decisionRecue2).toBe("TODO US 499");
  expect(elementsJasper.interesseDecision).toBe("TODO US 398");
  expect(elementsJasper.regime).toBe("sous le régime de curatelle simple");
  expect(elementsJasper.renouvellementModification).toBeUndefined();
  expect(elementsJasper.decisionExequatur).toBeUndefined();
  expect(elementsJasper.duree).toBe("pour une durée de 1 année");
  expect(elementsJasper.paragrapheFin).toBe(
    "Conformément à l'article Article 4 du décret 65-422 du 1er juin 1965, une inscription a été prise au répertoire civil le 18 Novembre 2020 sous la référence : RC n°2020 - 11"
  );
});

test("Attendu: specificationRC.getElementsJasper ", async () => {
  const data = FicheRcRenouvellement;
  const elementsJasper = specificationRC.getElementsJasper(data);
  expect(elementsJasper.anneeInscription).toBe("2020");
  expect(elementsJasper.numeroInscription).toBe("2");
  expect(elementsJasper.decisionRecue1).toBe("TODO US 499");
  expect(elementsJasper.decisionRecue2).toBe("TODO US 499");
  expect(elementsJasper.interesseDecision).toBe("TODO US 398");
  expect(elementsJasper.regime).toBeUndefined();
  expect(elementsJasper.renouvellementModification).toBe(
    "prononçant le renouvellement de la mesure de curatelle simple RC n° 2020 - 1"
  );
  expect(elementsJasper.decisionExequatur).toBeUndefined();
  expect(elementsJasper.duree).toBe("pour une durée de 1 mois");
  expect(elementsJasper.paragrapheFin).toBe(
    "Conformément à l'article Article 4 du décret 65-422 du 1er juin 1965, une inscription a été prise au répertoire civil le 22 Novembre 2020 sous la référence : RC n°2020 - 2"
  );
});

afterAll(() => {
  superagentMock.unset();
});
