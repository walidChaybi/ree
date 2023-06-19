import { LISTE_UTILISATEURS } from "@mock/data/ListeUtilisateurs";
import { userDroitnonCOMEDEC } from "@mock/data/connectedUserAvecDroit";
import { requeteDelivranceRDC } from "@mock/data/requeteDelivrance";
import { Courrier } from "@pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/Courrier";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { storeRece } from "@util/storeRece";

beforeAll(() => {
  storeRece.listeUtilisateurs = LISTE_UTILISATEURS;
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
});

test("renders courrier", async () => {
  await act(async () => {
    render(
      <Courrier
        requete={requeteDelivranceRDC}
        handleDocumentEnregistre={jest.fn()}
      />
    );
  });

  const boutonValider = screen.getByText(/Valider/i) as HTMLButtonElement;
  const inputCourrier = screen.getByTestId(
    "choixCourrier.courrier"
  ) as HTMLSelectElement;

  await waitFor(() => {
    expect(screen.getAllByText(/Modification du courrier/i)).toBeDefined();
    expect(screen.getByText(/Numéro, type et nom de la voie/i)).toBeDefined();
    expect(screen.getByText(/Nombre d'exemplaires/i)).toBeDefined();
    expect(boutonValider).toBeDefined();
    expect(screen.getByText(/Réinitialiser/i)).toBeDefined();
    expect(inputCourrier).toBeDefined();
  });

  expect(boutonValider.disabled).toBeFalsy();

  fireEvent.change(inputCourrier, {
    target: { value: "4b60aab4-2e9f-479c-bec6-f38edbd6e647" }
  });

  await act(async () => {
    fireEvent.click(screen.getByText(/Valider/i));
  });

  expect(
    screen.getByText(
      "Le choix d'une option standard est obligatoire pour ce courrier"
    )
  ).toBeDefined();
});

test("créer courrier", async () => {
  await act(async () => {
    render(
      <Courrier
        requete={requeteDelivranceRDC}
        handleDocumentEnregistre={jest.fn()}
      />
    );
  });

  await act(async () => {
    fireEvent.doubleClick(
      screen.getByText(
        "Arrondissement d'Alger (événement entre le 24/04/1959 et le 31/12/1962)"
      )
    );
  });

  await act(async () => {
    fireEvent.click(screen.getByText(/Valider/i));
  });
});
