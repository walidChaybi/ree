import {
    A_NE_PAS_DELIVRER,
    TypeAlerte
} from "@model/etatcivil/enum/TypeAlerte";

beforeEach(async () => {
  TypeAlerte.init();
});

test("Attendu: getEnumsAPartirType de TypeAlerte fonctionne correctement", () => {
  expect(TypeAlerte.getEnumsAPartirType(A_NE_PAS_DELIVRER)).toHaveLength(11);
});


