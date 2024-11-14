import { LISTE_UTILISATEURS } from "@mock/data/ListeUtilisateurs";
import { userDroitnonCOMEDEC } from "@mock/data/mockConnectedUserAvecDroit";
import { requeteDelivranceRDC } from "@mock/data/requeteDelivrance";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, test } from "vitest";
import { Courrier } from "../../../../../../composants/pages/requetesDelivrance/editionRequete/partieDocument/voletCourrier/Courrier";
import { elementAvecContexte } from "../../../../../__tests__utils__/testsUtil";

test("renders courrier", async () => {
  render(
    elementAvecContexte(
      <Courrier requete={requeteDelivranceRDC} />,
      userDroitnonCOMEDEC,
      LISTE_UTILISATEURS,
    ),
  );

  await waitFor(() => {
    expect(screen.getByText(/Numéro, type et nom de la voie/i)).toBeDefined();
    expect(screen.getByText(/Nombre d'exemplaires/i)).toBeDefined();
    expect(screen.getByText(/Valider/i)).toBeDefined();
    expect(screen.getByText(/Réinitialiser/i)).toBeDefined();
    expect(screen.getByTestId("choixCourrier.courrier")).toBeDefined();
    expect(
      (screen.getByText(/Valider/i) as HTMLButtonElement).disabled,
    ).toBeFalsy();
  });
});

test("créer courrier", () => {
  render(
    elementAvecContexte(
      <Courrier requete={requeteDelivranceRDC} />,
      userDroitnonCOMEDEC,
      LISTE_UTILISATEURS,
    ),
  );

  const adresseInput = screen.getByLabelText(
    "Numéro, type et nom de la voie",
  ) as HTMLInputElement;
  fireEvent.change(adresseInput, { target: { value: "123 rue de l'exemple" } });

  const nombreExemplairesInput = screen.getByLabelText(
    "Nombre d'exemplaires",
  ) as HTMLInputElement;
  fireEvent.change(nombreExemplairesInput, { target: { value: "2" } });

  fireEvent.click(screen.getByText("Valider"));

  waitFor(() => {
    expect(
      screen.queryByText(
        "Le choix d'une option standard est obligatoire pour ce courrier",
      ),
    ).toBeNull();
  });
});
