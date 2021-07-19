import { localStorageMock } from "../../../mock/localStorageMock";
import { GestionnaireDoubleOuverture } from "../../../views/common/util/GestionnaireDoubleOuverture";

beforeAll(() => {
  Object.defineProperty(window, "localStorage", { value: localStorageMock });
});

test("checkSiAppliNonDejaOuverte", () => {
  expect(GestionnaireDoubleOuverture.verifSiAppliNonDejaOuverte()).toBeTruthy();
});

test("test incremente", () => {
  GestionnaireDoubleOuverture.incrementeNAppliOuverte();
  expect(GestionnaireDoubleOuverture.verifSiAppliDejaOuverte()).toBeTruthy();
});

test("test decrease", () => {
  GestionnaireDoubleOuverture.incrementeNAppliOuverte();
  GestionnaireDoubleOuverture.decroitNAppliOuverte();
  GestionnaireDoubleOuverture.decroitNAppliOuverte();
  expect(GestionnaireDoubleOuverture.verifSiAppliNonDejaOuverte()).toBeTruthy();
});

test("test resetNAppli", () => {
  GestionnaireDoubleOuverture.incrementeNAppliOuverte();
  GestionnaireDoubleOuverture.incrementeNAppliOuverte();
  GestionnaireDoubleOuverture.incrementeNAppliOuverte();
  GestionnaireDoubleOuverture.resetNAppli();
  expect(GestionnaireDoubleOuverture.verifSiAppliNonDejaOuverte()).toBeTruthy();
});
