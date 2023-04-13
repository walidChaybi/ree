import { getDecisionExequatur } from "@hook/generation/generationInscriptionsHook/specificationInscriptions/specificationCommunes";
import {
  FicheRcaDecisionAvecInstructionProcureur,
  FicheRcaDecisionJuridictionEtrangere
} from "@mock/data/ficheRCA";

test("Attendu: getDecisionExequatur AVEC une decision Juridiction étrangère", async () => {
  const data = FicheRcaDecisionJuridictionEtrangere;
  const phrase = getDecisionExequatur(data);
  expect(phrase).toBe(
    "prise en exequatur de la décision étrangère en date du 26 novembre 2020"
  );
});

test("Attendu: getDecisionExequatur SANS decision Juridiction étrangère", async () => {
  const data = FicheRcaDecisionAvecInstructionProcureur;
  const phrase = getDecisionExequatur(data);
  expect(phrase).toBeUndefined();
});
