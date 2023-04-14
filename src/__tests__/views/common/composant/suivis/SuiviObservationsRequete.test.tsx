import { SuiviObservationsRequete } from "@composant/suivis/SuiviObservationsRequete";
import { userDroitnonCOMEDEC } from "@mock/data/connectedUserAvecDroit";
import { observations0, observations1 } from "@mock/data/Observations";
import DONNEES_REQUETE from "@mock/data/requete";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import React from "react";

beforeAll(() => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
});

test("renders suivi des observations requete", async () => {
  render(
    <SuiviObservationsRequete
      observations={DONNEES_REQUETE.observations}
      idRequete="123"
    />
  );
  const titre = screen.getByText(/Observations requête/i);
  let elem1: HTMLElement;
  let elem2: HTMLElement;

  await waitFor(() => {
    expect(titre.textContent).toBeDefined();
    elem1 = screen.getByText(/LOS/i);
    expect(elem1).toBeDefined();
    expect(elem1.innerHTML).toBe(
      "C'est vraiment dur de pouvo... - 02/01/1970 - LOS"
    );
    elem2 = screen.getByText(/BTC/i);
    expect(elem2).toBeDefined();
    expect(elem2.innerHTML).toBe(
      "Je fais pas 30 charactères - 02/01/1970 - BTC"
    );
  });
});

test("ajouter observation", async () => {
  render(
    <SuiviObservationsRequete
      observations={DONNEES_REQUETE.observations}
      idRequete="123"
    />
  );

  await act(async () => {
    fireEvent.click(screen.getByText("Ajouter une observation"));
  });

  await waitFor(() => {
    expect(screen.getByText("Saisissez l'observation")).toBeDefined();
  });

  await act(async () => {
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: {
        value: "salut"
      }
    });
  });

  await waitFor(() => {
    expect(screen.getByText("salut")).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(screen.getByText("Valider"));
  });

  await waitFor(() => {
    expect(screen.getByText(/salut - /i)).toBeDefined();
  });
});

test("modifier observation", async () => {
  render(
    <SuiviObservationsRequete observations={observations0} idRequete="123" />
  );

  await act(async () => {
    fireEvent.click(screen.getByText(/C'est vraiment dur/i));
  });

  await waitFor(() => {
    expect(
      screen.getByText(
        "C'est vraiment dur de pouvoir trouver un texte adequate pour remplir ce mock mais bon on fait avec"
      )
    ).toBeDefined();
  });

  await act(async () => {
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: {
        value: "salut"
      }
    });
  });

  await waitFor(() => {
    expect(screen.getByText("salut")).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(screen.getByText("Valider"));
  });

  await waitFor(() => {
    expect(screen.getByText(/salut - /i)).toBeDefined();
  });
});

test("supprimer observation", async () => {
  render(
    <SuiviObservationsRequete observations={observations1} idRequete="123" />
  );

  await act(async () => {
    fireEvent.click(screen.getByText("Supprimer l'observation"));
  });
});
