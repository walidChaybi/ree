import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import MockSaisieProjetActeContextProvider from "@mock/context/MockSaisieProjetActeContextProvider";
import { requeteCreationTranscription } from "@mock/data/requeteCreationTranscription";
import { fireEvent, render } from "@testing-library/react";
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import ApercuProjetActe from "../../../../../../composants/pages/requetesConsulaire/saisieProjet/apercuProjet/ApercuProjetActe";
import { EEventState } from "../../../../../../hooks/EventHook";
import ModeleTexte, { EModeleTexteDocument } from "../../../../../../utils/ModeleTexte";

beforeAll(() => {
  ModeleTexte.enregistrerModeleTexteDocument(
    EModeleTexteDocument.PROJET_NAISSANCE_MINEUR,
    "{{/nl}}de {{#if titulaire.nomRetenuOEC}}{{#valeur titulaire.nomRetenuOEC}}{{/if}}{{/nl}}{{/nl}}{{/nl}}TRANSCRIPTION{{/nl}}"
  );

  ModeleTexte.enregistrerModeleTexteDocument(
    EModeleTexteDocument.PROJET_MARIAGE,
    "{{/nl}}de {{#if titulaire.nomRetenuOEC}}{{#valeur titulaire.nomRetenuOEC}}{{/if}}{{/nl}}{{/nl}}{{/nl}}TRANSCRIPTION{{/nl}}"
  );

  ModeleTexte.enregistrerModeleTexteDocument(
    EModeleTexteDocument.PROJET_DECES,
    "{{/nl}}de {{#if titulaire.nomRetenuOEC}}{{#valeur titulaire.nomRetenuOEC}}{{/if}}{{/nl}}{{/nl}}{{/nl}}TRANSCRIPTION{{/nl}}"
  );

  vi.setSystemTime(new Date(2025, 5, 5, 10));
});

afterAll(() => {
  ModeleTexte.reinitialiserModelesTexte();
});

describe("ApercuProjetActe - Tests du composant", () => {
  global.ResizeObserver = vi.fn().mockImplementation(() => ({ disconnect: () => {}, observe: () => {}, unobserve: () => {} }));

  test("Doit afficher l'aperçu du projet d'un ate de naissance", () => {
    const { container } = render(
      <MockRECEContextProvider>
        <MockSaisieProjetActeContextProvider
          projetActe={null}
          requete={mappingRequeteCreation(requeteCreationTranscription)}
          mettreAJourDonneesContext={vi.fn()}
        >
          <div className="h-screen">
            <ApercuProjetActe />
          </div>
        </MockSaisieProjetActeContextProvider>
      </MockRECEContextProvider>
    );

    fireEvent(document, new CustomEvent(EEventState.APERCU_PROJET_ACTE, { detail: { titulaire: { nomRetenuOEC: "François" } } }));

    expect(container.firstChild).toMatchSnapshot();
  });

  test("Doit afficher l'aperçu du projet d'un ate de mariage", () => {
    const { container } = render(
      <MockRECEContextProvider>
        <MockSaisieProjetActeContextProvider
          projetActe={null}
          requete={mappingRequeteCreation({ ...requeteCreationTranscription, natureActeTranscrit: "MARIAGE_AVEC_CCAM" })}
          mettreAJourDonneesContext={vi.fn()}
        >
          <div className="h-screen">
            <ApercuProjetActe />
          </div>
        </MockSaisieProjetActeContextProvider>
      </MockRECEContextProvider>
    );

    fireEvent(document, new CustomEvent(EEventState.APERCU_PROJET_ACTE, { detail: { titulaire: { nomRetenuOEC: "François" } } }));

    expect(container.firstChild).toMatchSnapshot();
  });

  test("Doit afficher l'aperçu du projet d'un ate de décès", () => {
    const { container } = render(
      <MockRECEContextProvider>
        <MockSaisieProjetActeContextProvider
          projetActe={null}
          requete={mappingRequeteCreation({ ...requeteCreationTranscription, natureActeTranscrit: "DECES" })}
          mettreAJourDonneesContext={vi.fn()}
        >
          <div className="h-screen">
            <ApercuProjetActe />
          </div>
        </MockSaisieProjetActeContextProvider>
      </MockRECEContextProvider>
    );

    fireEvent(document, new CustomEvent(EEventState.APERCU_PROJET_ACTE, { detail: { titulaire: { nomRetenuOEC: "François" } } }));

    expect(container.firstChild).toMatchSnapshot();
  });
});
