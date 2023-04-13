import { localStorageMock } from "@mock/localStorageMock";
import { act, waitFor } from "@testing-library/react";
import {
  GestionnaireDoubleOuverture,
  gestionnaireDoubleOuverture
} from "@util/GestionnaireDoubleOuverture";

const mockFunction = jest.fn();

beforeAll(() => {
  Object.defineProperty(window, "localStorage", { value: localStorageMock });
  gestionnaireDoubleOuverture.init();
  gestionnaireDoubleOuverture.lancerVerification(jest.fn());
});

test("check si l'uuid est initialisé", () => {
  expect(gestionnaireDoubleOuverture.ecouteNouvelleAppli()).toBeFalsy();
});

test("check si la nouvelle appli est détecté", async () => {
  const nouvelleAppli = new GestionnaireDoubleOuverture();
  await act(async () => {
    nouvelleAppli.init();
  });
  gestionnaireDoubleOuverture.actionSiAppliOuverte(mockFunction);
  await waitFor(() => {
    expect(mockFunction).toHaveBeenCalled();
  });
});

test("arreter le minuteur", () => {
  gestionnaireDoubleOuverture.arreterVerification();
  expect(gestionnaireDoubleOuverture.checkMinuteurEstArrete()).toBeTruthy();
});
