import { SuiviObservationsRequete } from "@composant/suivis/SuiviObservationsRequete";
import { userDroitnonCOMEDEC } from "@mock/data/connectedUserAvecDroit";
import { observations0, observations1 } from "@mock/data/Observations";
import DONNEES_REQUETE from "@mock/data/requete";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { beforeAll, expect, test } from "vitest";

beforeAll(() => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
});

test("renders suivi des observations requete", () => {
  render(
    <SuiviObservationsRequete
      observations={DONNEES_REQUETE.observations}
      idRequete="123"
    />
  );
  const titre = screen.getByText(/Observations requête/i);
  let elem1: HTMLElement;
  let elem2: HTMLElement;

  waitFor(() => {
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

test("ajouter observation", () => {
  render(
    <SuiviObservationsRequete
      observations={DONNEES_REQUETE.observations}
      idRequete="123"
    />
  );

  fireEvent.click(screen.getByText("Ajouter une observation"));

  waitFor(() => {
    expect(screen.getByText("Saisissez l'observation")).toBeDefined();
  });

  fireEvent.change(screen.getByPlaceholderText("Description"), {
    target: {
      value: "salut"
    }
  });

  waitFor(() => {
    expect(screen.getByText("salut")).toBeDefined();
  });

  fireEvent.click(screen.getByText("Valider"));

  waitFor(() => {
    expect(screen.getByText(/salut - /i)).toBeDefined();
  });
});

test("modifier observation", () => {
  render(
    <SuiviObservationsRequete observations={observations0} idRequete="123" />
  );

  fireEvent.click(screen.getByText(/C'est vraiment dur/i));

  waitFor(() => {
    expect(
      screen.getByText(
        "C'est vraiment dur de pouvoir trouver un texte adequate pour remplir ce mock mais bon on fait avec"
      )
    ).toBeDefined();
  });

  fireEvent.change(screen.getByPlaceholderText("Description"), {
    target: {
      value: "salut"
    }
  });

  waitFor(() => {
    expect(screen.getByText("salut")).toBeDefined();
  });

  fireEvent.click(screen.getByText("Valider"));

  waitFor(() => {
    expect(screen.getByText(/salut - /i)).toBeDefined();
  });
});

test("supprimer observation", () => {
  render(
    <SuiviObservationsRequete observations={observations1} idRequete="123" />
  );

  fireEvent.click(screen.getByText("Supprimer l'observation"));

  waitFor(() => {
    expect(
      screen.getByTitle(
        "C'est vraiment dur de pouvoir trouver un texte adequate pour remplir ce mock mais bon on fait avec"
      )
    ).not.toBeDefined();
  });
});
