import { ReponseAppelNomenclatureTypeAlerte } from "@mock/data/nomenclatures";
import { A_NE_PAS_DELIVRER, TypeAlerte } from "@model/etatcivil/enum/TypeAlerte";
import { beforeEach, expect, test } from "vitest";

beforeEach(() => {
  return TypeAlerte.init(ReponseAppelNomenclatureTypeAlerte.data);
});

test("Attendu: listeDepuisType de TypeAlerte fonctionne correctement", () => {
  expect(TypeAlerte.listeDepuisType(A_NE_PAS_DELIVRER)).toHaveLength(11);
});
