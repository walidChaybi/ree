import { act, waitFor } from "@testing-library/react";
import { GestionnaireDoubleOuverture, gestionnaireDoubleOuverture } from "@util/GestionnaireDoubleOuverture";
import { beforeAll, expect, test, vi } from "vitest";
import { localStorageMock } from "../../../mock/localStorageMock";

const mockFunction = vi.fn();

beforeAll(() => {
  Object.defineProperty(window, "localStorage", { value: localStorageMock });
  gestionnaireDoubleOuverture.init();
  gestionnaireDoubleOuverture.lancerVerification(vi.fn());
});

test("check si l'uuid est initialisé", () => {
  waitFor(() => {
    expect(gestionnaireDoubleOuverture.ecouteNouvelleAppli()).toBeFalsy();
  });
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
