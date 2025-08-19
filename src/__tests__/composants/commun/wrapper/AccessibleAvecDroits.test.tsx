import React from "react";

import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import AccessibleAvecDroits from "../../../../composants/commun/accessibleAvecDroits/AccessibleAvecDroits";

const BoutonTest: React.FC = () => {
  return (
    <button>
      <span>Click me</span>
    </button>
  );
};

describe("Test de AccessibleAvecDroits", () => {
  const renderComponent = (contextDroit: Droit[], auMoinsUnDesDroits: Droit[], droits?: Droit[]) => {
    return render(
      <MockRECEContextProvider utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroits(contextDroit).generer()}>
        <AccessibleAvecDroits
          auMoinsUnDesDroits={auMoinsUnDesDroits}
          droits={droits}
        >
          <BoutonTest />
        </AccessibleAvecDroits>
      </MockRECEContextProvider>
    );
  };

  test("Le bouton doit exister car l'utilisateur a le droit ATTRIBUER_REQUETE", async () => {
    renderComponent([Droit.ATTRIBUER_REQUETE], [Droit.ATTRIBUER_REQUETE]);

    expect(screen.getByText("Click me")).toBeDefined();
  });

  test("Le bouton ne doit pas exister car l'utilisateur n'a pas le droit ATTRIBUER_REQUETE", async () => {
    renderComponent([Droit.CONSULTER], [Droit.ATTRIBUER_REQUETE]);
    expect(screen.queryByText("Click me")).toBeNull();
  });

  test("Le bouton doit exister car l'utilisateur a le droit ATTRIBUER_REQUETE et un de ces droits [TRANSCRIPTION_CREER_PROJET_ACTE, CREER_ACTE_DRESSE, CREER_ACTE_ETABLI]", async () => {
    renderComponent([Droit.CONSULTER, Droit.TRANSCRIPTION_CREER_PROJET_ACTE], [Droit.CONSULTER], [Droit.TRANSCRIPTION_CREER_PROJET_ACTE]);
    expect(screen.getByText("Click me")).toBeDefined();
  });

  test("Le bouton ne doit pas exister car l'utilisateur n'a pas le droit ATTRIBUER_REQUETE avec un de ces droits [TRANSCRIPTION_CREER_PROJET_ACTE, CREER_ACTE_DRESSE, CREER_ACTE_ETABLI]", async () => {
    renderComponent([Droit.CONSULTER, Droit.ATTRIBUER_REQUETE], [Droit.ATTRIBUER_REQUETE], [Droit.TRANSCRIPTION_CREER_PROJET_ACTE]);
    expect(screen.queryByText("Click me")).toBeNull();
  });

  test("Le bouton ne doit pas exister car l'utilisateur n'a pas le droit : droits vide", async () => {
    renderComponent([], [Droit.ATTRIBUER_REQUETE], [Droit.TRANSCRIPTION_CREER_PROJET_ACTE]);
    expect(screen.queryByText("Click me")).toBeNull();
  });
});
