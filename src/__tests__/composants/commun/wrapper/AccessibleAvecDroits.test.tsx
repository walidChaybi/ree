import { IOfficier } from "@model/agent/IOfficier";
import React from "react";

import { Droit } from "@model/agent/enum/Droit";
import { act, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import AccessibleAvecDroits, { extraireNomsDroits } from "../../../../composants/commun/accessibleAvecDroits/AccessibleAvecDroits";
import { elementAvecContexte } from "../../../__tests__utils__/testsUtil";
import mockConnectedUser from "../../../mock/data/connectedUser.json";

const BoutonTest: React.FC = () => {
  return (
    <button>
      <span>Click me</span>
    </button>
  );
};
const u: any = mockConnectedUser;
const utilisateurConnecte = u as IOfficier;

describe("Test de AccessibleAvecDroits", () => {
  const renderComponent = (droits: Droit[], utilisateurConnecteMock: IOfficier | undefined) => {
    return render(
      elementAvecContexte(
        <AccessibleAvecDroits droits={droits}>
          <BoutonTest />
        </AccessibleAvecDroits>,
        utilisateurConnecteMock
      )
    );
  };

  test("Le bouton doit exister car l'utilisateur a le droit ATTRIBUER_REQUETE", async () => {
    const utilisateurConnecteMock = {
      ...utilisateurConnecte
    };
    utilisateurConnecteMock.habilitations[0].profil.droits[0] = {
      idDroit: "d12345",
      nom: Droit.ATTRIBUER_REQUETE
    };

    renderComponent([Droit.ATTRIBUER_REQUETE], utilisateurConnecteMock);

    expect(screen.getByText("Click me")).toBeDefined();
  });

  test("Le bouton ne doit pas exister car l'utilisateur n'a pas le droit ATTRIBUER_REQUETE", async () => {
    const utilisateurConnecteMock = {
      ...utilisateurConnecte
    };
    utilisateurConnecteMock.habilitations[0].profil.droits[0] = {
      idDroit: "d12345",
      nom: Droit.CONSULTER
    };

    await act(async () => renderComponent([Droit.ATTRIBUER_REQUETE], utilisateurConnecteMock));
    expect(screen.queryByText("Click me")).toBeNull();
  });

  test("Le bouton ne doit pas exister car l'utilisateur n'a pas le droit : droits vide", async () => {
    const utilisateurConnecteMock = {
      ...utilisateurConnecte
    };
    utilisateurConnecteMock.habilitations[0].profil.droits[0] = {
      idDroit: "d12345",
      nom: Droit.CONSULTER
    };

    await act(async () => renderComponent([Droit.ATTRIBUER_REQUETE], utilisateurConnecteMock));
    expect(screen.queryByText("Click me")).toBeNull();
  });

  test("Le bouton ne doit pas exister car aucun utilisateur n'est connecté", async () => {
    const utilisateurConnecteMock = undefined;

    await act(async () => renderComponent([Droit.ATTRIBUER_REQUETE], utilisateurConnecteMock));
    expect(screen.queryByText("Click me")).toBeNull();
  });
});

describe("Test de extraireNomsDroits / AccessibleAvecDroits", () => {
  test("devrait retourner un tableau vide quand il n'y a pas d'habilitations", () => {
    expect(extraireNomsDroits([])).toEqual([]);
  });

  test("devrait retourner les noms des droits corrects quand des droits sont fournis", () => {
    const utilisateurConnecteMock = {
      ...utilisateurConnecte
    };
    utilisateurConnecteMock.habilitations[0].profil.droits[0] = {
      idDroit: "d12345",
      nom: Droit.ATTRIBUER_REQUETE
    };

    expect(extraireNomsDroits(utilisateurConnecteMock.habilitations)).toEqual([
      "ATTRIBUER_REQUETE",
      "CREER_ACTE_TRANSCRIT",
      "CREER_ACTE_DRESSE",
      "CREER_ACTE_ETABLI",
      "INFORMER_USAGER",
      "DELIVRER",
      "SIGNER_DELIVRANCE_DEMAT"
    ]);
  });
});
