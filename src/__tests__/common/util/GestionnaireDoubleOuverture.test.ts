import { act, waitFor } from "@testing-library/react";
import { localStorageMock } from "../../../mock/localStorageMock";
import {
  GestionnaireDoubleOuverture,
  gestionnaireDoubleOuverture
} from "../../../views/common/util/GestionnaireDoubleOuverture";

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
  gestionnaireDoubleOuverture.actionSiAppliOuverte(mockFunction, 0);
  await waitFor(() => {
    expect(mockFunction).toHaveBeenCalled();
  });
});
