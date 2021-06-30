import { isInstanceOfActe } from "../../../model/rmc/acteInscription/resultat/IResultatRMCActe";

test("Test si un objet correspond à l'interface IResultatRMCActe", () => {
  expect(isInstanceOfActe(undefined)).toBe(undefined);
  expect(isInstanceOfActe(null)).toBe(null);
  expect(isInstanceOfActe({})).toBe(false);
  expect(isInstanceOfActe({ idInscription: "" })).toBe(false);
  expect(isInstanceOfActe({ idActe: "" })).toBe(true);
});
