import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import PartieGaucheSaisieProjet from "../../../../../composants/pages/requetesConsulaire/saisieProjet/PartieGaucheSaisieProjet";
import { EEventState } from "../../../../../hooks/EventHook";
import ModeleTexte, { EModeleTexteDocument } from "../../../../../utils/ModeleTexte";

describe.skip("PartieGaucheSaisieProjet - Tests du composant", () => {
  global.ResizeObserver = vi.fn().mockImplementation(() => ({ disconnect: () => {}, observe: () => {}, unobserve: () => {} }));

  beforeAll(() => {
    ModeleTexte.enregistrerModeleTexteDocument(EModeleTexteDocument.PROJET_NAISSANCE_MINEUR, "Test modele");
    ModeleTexte.enregistrerModeleTexteDocument(EModeleTexteDocument.PROJET_MARIAGE, "Texte mariage");
    ModeleTexte.enregistrerModeleTexteDocument(EModeleTexteDocument.PROJET_DECES, "Texte décès");

    vi.setSystemTime(new Date(2025, 5, 5, 10));
  });

  afterAll(() => {
    ModeleTexte.reinitialiserModelesTexte();
  });

  test("Doit rendre composant PartieGaucheSaisieProjet", () => {
    const { container } = render(
      <MockRECEContextProvider>
        <PartieGaucheSaisieProjet estModeConsultation={false} />
      </MockRECEContextProvider>
    );

    fireEvent(document, new CustomEvent(EEventState.APERCU_PROJET_ACTE, { detail: { valeurTest: "" } }));
    fireEvent.click(screen.getByText("Aperçu du projet"));

    expect(container.firstChild).toMatchSnapshot();
  });

  test("Doit afficher titre mariage dans ApercuProjetActe", () => {
    const { container } = render(
      <MockRECEContextProvider>
        <PartieGaucheSaisieProjet estModeConsultation={false} />
      </MockRECEContextProvider>
    );

    fireEvent(document, new CustomEvent(EEventState.APERCU_PROJET_ACTE, { detail: { valeurTest: "" } }));
    fireEvent.click(screen.getByText("Aperçu du projet"));

    expect(container.firstChild).toMatchSnapshot();
  });

  test("Doit afficher titre décès dans ApercuProjetActe", () => {
    const { container } = render(
      <MockRECEContextProvider>
        <PartieGaucheSaisieProjet estModeConsultation={false} />
      </MockRECEContextProvider>
    );

    fireEvent(document, new CustomEvent(EEventState.APERCU_PROJET_ACTE, { detail: { valeurTest: "" } }));
    fireEvent.click(screen.getByText("Aperçu du projet"));

    expect(container.firstChild).toMatchSnapshot();
  });
});
