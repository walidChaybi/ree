import { LISTE_UTILISATEURS } from "@mock/data/ListeUtilisateurs";
import { userDroitnonCOMEDEC } from "@mock/data/mockConnectedUserAvecDroit";
import { requeteDelivranceRDC } from "@mock/data/requeteDelivrance";
import { Courrier } from "@pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/Courrier";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, test } from "vitest";
import { elementAvecContexte } from "../../../../../../__tests__utils__/testsUtil";

test.skip("renders courrier", () => {
  render(
    elementAvecContexte(
      <Courrier requete={requeteDelivranceRDC} />,
      userDroitnonCOMEDEC,
      LISTE_UTILISATEURS
    )
  );

  const boutonValider = screen.getByText(/Valider/i) as HTMLButtonElement;
  const inputCourrier = screen.getByTestId(
    "choixCourrier.courrier"
  ) as HTMLSelectElement;

  waitFor(() => {
    expect(screen.getAllByText(/Modification du courrier/i)).toBeDefined();
    expect(screen.getByText(/Numéro, type et nom de la voie/i)).toBeDefined();
    expect(screen.getByText(/Nombre d'exemplaires/i)).toBeDefined();
    expect(boutonValider).toBeDefined();
    expect(screen.getByText(/Réinitialiser/i)).toBeDefined();
    expect(inputCourrier).toBeDefined();
    expect(boutonValider.disabled).toBeFalsy();
  });

  fireEvent.change(inputCourrier, {
    target: { value: "4b60aab4-2e9f-479c-bec6-f38edbd6e647" }
  });

  fireEvent.click(screen.getByText(/Valider/i));

  expect(
    screen.getByText(
      "Le choix d'une option standard est obligatoire pour ce courrier"
    )
  ).toBeDefined();
});

test.skip("créer courrier", () => {
  render(
    elementAvecContexte(
      <Courrier requete={requeteDelivranceRDC} />,
      userDroitnonCOMEDEC,
      LISTE_UTILISATEURS
    )
  );

  fireEvent.doubleClick(
    screen.getByText(
      "Arrondissement d'Alger (événement entre le 24/04/1959 et le 31/12/1962)"
    )
  );

  fireEvent.click(screen.getByText(/Valider/i));
});
