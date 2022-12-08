import {
  A_NE_PAS_DELIVRER,
  TypeAlerte
} from "@model/etatcivil/enum/TypeAlerte";
import request from "superagent";
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

beforeEach(async () => {
  TypeAlerte.init();
});

test("Attendu: getEnumsAPartirType de TypeAlerte fonctionne correctement", () => {
  expect(TypeAlerte.getEnumsAPartirType(A_NE_PAS_DELIVRER)).toHaveLength(11);
});

afterAll(() => {
  superagentMock.unset();
});
