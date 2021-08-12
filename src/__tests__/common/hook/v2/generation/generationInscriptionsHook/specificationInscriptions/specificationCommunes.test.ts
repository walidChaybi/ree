import {
  IFicheRcRcaDecisionAvecInstructionProcureur,
  IFicheRcRcaDecisionJuridictionEtrangere
} from "../../../../../../../mock/data/ficheRCA";
import { getDecisionExequatur } from "../../../../../../../views/common/hook/v2/generation/generationInscriptionsHook/specificationInscriptions/specificationCommunes";

test("Attendu: getDecisionExequatur AVEC une decision Juridiction étrangère", async () => {
  const data = IFicheRcRcaDecisionJuridictionEtrangere;
  const phrase = getDecisionExequatur(data);
  expect(phrase).toBe(
    "prise en exequatur de la décision étrangère en date du 26 Novembre 2020"
  );
});

test("Attendu: getDecisionExequatur SANS decision Juridiction étrangère", async () => {
  const data = IFicheRcRcaDecisionAvecInstructionProcureur;
  const phrase = getDecisionExequatur(data);
  expect(phrase).toBeUndefined();
});
