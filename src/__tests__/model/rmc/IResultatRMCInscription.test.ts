import { isInstanceOfInscription } from "../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";

test("Test si un objet correspond à l'interface IResultatRMCInscription", () => {
  expect(isInstanceOfInscription(undefined)).toBe(undefined);
  expect(isInstanceOfInscription(null)).toBe(null);
  expect(isInstanceOfInscription({})).toBe(false);
  expect(isInstanceOfInscription({ idActe: "" })).toBe(false);
  expect(isInstanceOfInscription({ idInscription: "" })).toBe(true);
});
