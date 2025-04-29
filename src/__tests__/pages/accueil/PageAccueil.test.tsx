import { IOfficier } from "@model/agent/IOfficier";
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { Droit } from "@model/agent/enum/Droit";

import { BrowserRouter } from "react-router";
import PageAccueil from "../../../pages/accueil/PageAccueil";
import { elementAvecContexte } from "../../__tests__utils__/testsUtil";
import mockConnectedUser from "../../mock/data/connectedUser.json";

describe("Test page d'accueil", () => {
  const u: any = mockConnectedUser;
  const utilisateurConnecte = u as IOfficier;

  const renderSnapshot = (utilisateurConnecteMock: IOfficier | undefined) => {
    const { container } = render(
      elementAvecContexte(
        <BrowserRouter>
          <PageAccueil />
        </BrowserRouter>,
        utilisateurConnecteMock
      )
    );

    return container.firstChild;
  };
  test("il faut afficher les rubriques / boutons si l'utilisateur a les droits nécessaires", async () => {
    const utilisateurConnecteMock = {
      ...utilisateurConnecte
    };
    utilisateurConnecteMock.habilitations[0].profil.droits[0] = {
      idDroit: "d12345",
      nom: Droit.CONSULTER
    };

    // Rendu du composant
    const snapshot = renderSnapshot(utilisateurConnecteMock);

    // Comparaison avec le snapshot
    expect(snapshot).toMatchSnapshot();
  });

  test("il faut afficher les rubriques / boutons si l'utilisateur a les droits nécessaires", async () => {
    const utilisateurConnecteMock = {
      ...utilisateurConnecte
    };
    utilisateurConnecteMock.habilitations = [];

    // Rendu du composant
    const snapshot = renderSnapshot(utilisateurConnecteMock);

    // Comparaison avec le snapshot
    expect(snapshot).toMatchSnapshot();
  });
});
