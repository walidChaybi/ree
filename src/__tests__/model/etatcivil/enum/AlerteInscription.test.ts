import {
  AlerteInscription,
  AlerteInscriptionUtil
} from "@model/etatcivil/enum/AlerteInscription";
import { expect, test } from "vitest";

test("AlerteInscription model getLibelle", () => {
  expect(
    AlerteInscriptionUtil.getLibelle(AlerteInscription.DATE_FIN_MESURE_DEPASSEE)
  ).toBe("Date de fin de mesure dépassée");
  expect(
    AlerteInscriptionUtil.getLibelle("toto" as AlerteInscription)
  ).toBeUndefined();
});
