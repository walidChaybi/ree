import { getDecisionExequatur } from "@hook/generation/generationInscriptionsHook/specificationInscriptions/specificationCommunes";
import { ficheRcaDecisionAvecInstructionProcureur, ficheRcaDecisionJuridictionEtrangere } from "@mock/data/ficheRCA";
import { FicheRcRca } from "@model/etatcivil/rcrca/FicheRcRca";
import { expect, test } from "vitest";

test("Attendu: getDecisionExequatur AVEC une decision Juridiction étrangère", () => {
  const ficheRcRca = FicheRcRca.RcaDepuisDto(ficheRcaDecisionJuridictionEtrangere) as FicheRcRca;
  const phrase = getDecisionExequatur(ficheRcRca);
  expect(phrase).toBe("prise en exequatur de la décision étrangère en date du 26 novembre 2020");
});

test("Attendu: getDecisionExequatur SANS decision Juridiction étrangère", () => {
  const ficheRcRca = FicheRcRca.RcaDepuisDto(ficheRcaDecisionAvecInstructionProcureur) as FicheRcRca;
  const phrase = getDecisionExequatur(ficheRcRca);
  expect(phrase).toBeUndefined();
});
