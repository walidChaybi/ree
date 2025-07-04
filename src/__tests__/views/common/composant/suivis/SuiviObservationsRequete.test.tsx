import { SuiviObservationsRequete } from "@composant/suivis/SuiviObservationsRequete";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, test } from "vitest";
import { observations0, observations1 } from "../../../../mock/data/Observations";
import DONNEES_REQUETE from "../../../../mock/data/requete";

const UTILISATEUR_CONNECTE = MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.DELIVRER).generer();

test("renders suivi des observations requete", () => {
  render(
    <MockRECEContextProvider utilisateurConnecte={UTILISATEUR_CONNECTE}>
      <SuiviObservationsRequete
        observations={DONNEES_REQUETE.observations}
        idRequete="123"
      />
    </MockRECEContextProvider>
  );
  const titre = screen.getByText(/Observations requête/i);
  let elem1: HTMLElement;
  let elem2: HTMLElement;

  expect(titre.textContent).toBeDefined();
  elem1 = screen.getByText(/JACKSON Michael/i);
  expect(elem1).toBeDefined();
  expect(elem1.innerHTML).toBe("C'est vraiment dur de pouvo... - 02/01/1970 - JACKSON Michael");
  elem2 = screen.getByText(/WONDER Stevie/i);
  expect(elem2).toBeDefined();
  expect(elem2.innerHTML).toBe("Je fais pas 30 charactères - 02/01/1970 - WONDER Stevie");
});

test("ajouter observation", async () => {
  render(
    <MockRECEContextProvider utilisateurConnecte={UTILISATEUR_CONNECTE}>
      <SuiviObservationsRequete
        observations={DONNEES_REQUETE.observations}
        idRequete="123"
      />
    </MockRECEContextProvider>
  );

  fireEvent.click(screen.getByText("Ajouter une observation"));

  expect(screen.getByText("Saisissez l'observation")).toBeDefined();

  fireEvent.change(screen.getByPlaceholderText("Description"), {
    target: {
      value: "salut"
    }
  });

  expect(screen.getByText("salut")).toBeDefined();

  fireEvent.click(screen.getByText("Valider"));

  await waitFor(() => expect(screen.getByText(/salut - /i)).toBeDefined());
});

test("modifier observation", async () => {
  render(
    <MockRECEContextProvider utilisateurConnecte={UTILISATEUR_CONNECTE}>
      <SuiviObservationsRequete
        observations={observations0}
        idRequete="123"
      />
    </MockRECEContextProvider>
  );

  fireEvent.click(screen.getByText(/C'est vraiment dur/i));

  await waitFor(() => {
    expect(
      screen.getByText("C'est vraiment dur de pouvoir trouver un texte adequate pour remplir ce mock mais bon on fait avec")
    ).toBeDefined();
  });

  fireEvent.change(screen.getByPlaceholderText("Description"), {
    target: {
      value: "salut"
    }
  });

  await waitFor(() => {
    expect(screen.getByText("salut")).toBeDefined();
  });

  fireEvent.click(screen.getByText("Valider"));

  await waitFor(() => {
    expect(screen.getByText(/salut - /i)).toBeDefined();
  });
});

test("supprimer observation", async () => {
  render(
    <MockRECEContextProvider utilisateurConnecte={UTILISATEUR_CONNECTE}>
      <SuiviObservationsRequete
        observations={observations1}
        idRequete="123"
      />
    </MockRECEContextProvider>
  );

  fireEvent.click(screen.getByText("Supprimer l'observation"));

  await waitFor(() => {
    expect(
      screen.queryByTitle("C'est vraiment dur de pouvoir trouver un texte adequate pour remplir ce mock mais bon on fait avec")
    ).toBeNull();
  });
});
