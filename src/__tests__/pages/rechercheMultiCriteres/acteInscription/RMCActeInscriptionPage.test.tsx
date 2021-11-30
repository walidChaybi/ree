import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import React from "react";
import request from "superagent";
import { idFicheActe1 } from "../../../../mock/data/ficheActe";
import { idFichePacs } from "../../../../mock/data/fichePacs";
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";
import * as TableauPaginationConstantes from "../../../../views/common/widget/tableau/v2/TableauPaginationConstantes";
import { titreForm } from "../../../../views/pages/rechercheMultiCriteres/acteInscription/RMCActeInscriptionForm";
import { RMCActeInscriptionPage } from "../../../../views/pages/rechercheMultiCriteres/acteInscription/RMCActeInscriptionPage";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

const globalAny: any = global;
globalAny.scroll = jest.fn();
globalAny.open = () => {
  return { ...window };
};
globalAny.close = jest.fn();

test("renders formulaire Recherche Multi Critères Actes et Inscriptions", async () => {
  await act(async () => {
    render(<RMCActeInscriptionPage />);
  });
  await waitFor(() => {
    expect(screen.getAllByText(titreForm)).toHaveLength(2);
  });
});

test("Bouton réinitialisation des champs", async () => {
  await act(async () => {
    render(<RMCActeInscriptionPage />);
  });

  const inputNom = screen.getByLabelText("Nom") as HTMLInputElement;

  const inputAnneeSeule = screen.getByLabelText(
    "datesDebutFinAnnee.annee"
  ) as HTMLInputElement;
  const inputJour = screen.getByLabelText(
    "datesDebutFinAnnee.dateDebut.jour"
  ) as HTMLInputElement;

  await waitFor(() => {
    expect(inputNom).toBeDefined();
    expect(inputAnneeSeule).toBeDefined();
    expect(inputJour).toBeDefined();
  });

  act(() => {
    fireEvent.change(inputNom, {
      target: {
        value: "mock Nom"
      }
    });
    fireEvent.change(inputJour, {
      target: {
        value: "10"
      }
    });
  });

  await waitFor(() => {
    expect(inputNom.value).toBe("mock Nom");
    expect(inputJour.value).toBe("10");
  });

  const reset = screen.getByText(/Réinitialiser les critères/i);

  await act(async () => {
    fireEvent.click(reset);
  });

  await waitFor(() => {
    expect(inputNom.value).toBe("");
    expect(inputJour.value).toBe("");
    expect(inputAnneeSeule).toBeTruthy();
  });
});

test("Bouton Rechercher du Formulaire Recherche Multi Critères Actes et Inscriptions", async () => {
  await act(async () => {
    render(<RMCActeInscriptionPage />);
  });

  const inputNom = screen.getByLabelText("Nom") as HTMLInputElement;
  const inputAnnee = screen.getByLabelText(
    "datesDebutFinAnnee.annee"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(inputNom, {
      target: {
        value: "mockNom"
      }
    });
    fireEvent.change(inputAnnee, {
      target: {
        value: "1990"
      }
    });
  });

  const submit = screen.getByText(/Rechercher/i);
  await act(async () => {
    fireEvent.click(submit);
  });
});

afterAll(() => {
  superagentMock.unset();
});

///////////////////////////////////////////////////////////////
// Changement de la pagination pour les tests ci-dessous
///////////////////////////////////////////////////////////////

const NB_LIGNES_PAR_APPEL_INSCRIPTION_SAUVEGARDE =
  TableauPaginationConstantes.NB_LIGNES_PAR_APPEL_INSCRIPTION;
const NB_LIGNES_PAR_PAGE_INSCRIPTION_SAUVEGARDE =
  TableauPaginationConstantes.NB_LIGNES_PAR_PAGE_INSCRIPTION;
const NB_LIGNES_PAR_APPEL_ACTE_SAUVEGARDE =
  TableauPaginationConstantes.NB_LIGNES_PAR_APPEL_ACTE;
const NB_LIGNES_PAR_PAGE_ACTE_SAUVEGARDE =
  TableauPaginationConstantes.NB_LIGNES_PAR_PAGE_ACTE;

afterEach(() => {
  // @ts-ignore
  TableauPaginationConstantes.NB_LIGNES_PAR_APPEL_INSCRIPTION =
    NB_LIGNES_PAR_APPEL_INSCRIPTION_SAUVEGARDE;
  // @ts-ignore
  TableauPaginationConstantes.NB_LIGNES_PAR_PAGE_INSCRIPTION =
    NB_LIGNES_PAR_PAGE_INSCRIPTION_SAUVEGARDE;
  // @ts-ignore
  TableauPaginationConstantes.NB_LIGNES_PAR_APPEL_ACTE =
    NB_LIGNES_PAR_APPEL_ACTE_SAUVEGARDE;
  // @ts-ignore
  TableauPaginationConstantes.NB_LIGNES_PAR_PAGE_ACTE =
    NB_LIGNES_PAR_PAGE_ACTE_SAUVEGARDE;
});

test("La pagination (avec changement de plage) entre les fiches rc/rca/pacs s'effectue correctement", async () => {
  // Changement de constantes de pagination afin de tester plus facilement la navigation entre "plage"
  // @ts-ignore
  TableauPaginationConstantes.NB_LIGNES_PAR_APPEL_INSCRIPTION = 4;
  // @ts-ignore
  TableauPaginationConstantes.NB_LIGNES_PAR_PAGE_INSCRIPTION = 2;
  // @ts-ignore
  TableauPaginationConstantes.NB_LIGNES_PAR_APPEL_ACTE = 4;
  // @ts-ignore
  TableauPaginationConstantes.NB_LIGNES_PAR_PAGE_ACTE = 2;

  await act(async () => {
    render(<RMCActeInscriptionPage />);
  });

  const inputNom = screen.getByLabelText("Nom") as HTMLInputElement;

  // Changement du nom
  await act(async () => {
    fireEvent.change(inputNom, {
      target: {
        value: "mockNom"
      }
    });
  });

  await waitFor(() => {
    expect(inputNom.value).toBe("mockNom");
  });

  // Click bouton submit
  const submit = screen.getByText(/Rechercher/i);
  await act(async () => {
    fireEvent.click(submit);
  });

  // Attente affichage des RC/RCA/PACS résultat dans le tableau
  await waitFor(() => {
    expect(screen.getByText("PACS - 2013 - 1234508")).toBeInTheDocument();
    expect(screen.getByText("RCA - 2020 - 4093")).toBeInTheDocument();
  });

  // Clique bouton page suivante
  let boutonPageSuivante = screen.queryAllByTitle("Page suivante")[1];
  expect(boutonPageSuivante).toBeInTheDocument();
  await act(async () => {
    fireEvent.click(boutonPageSuivante);
  });

  // Attente affichage des inscriptions (rc/rca/pacs) de la page suivante
  await waitFor(() => {
    expect(screen.getByText("PACS - 1986 - 1234510")).toBeInTheDocument();
    expect(screen.getByText("PACS - 2001 - 1234506")).toBeInTheDocument();
  });

  // Clique sur la dernière fiche inscription (rc/rca/pacs) du tableau
  const ligne = screen.getByTestId(idFichePacs);
  await act(async () => {
    fireEvent.click(ligne);
  });

  // Attente de l'ouverture de la fiche
  await waitFor(() => {
    expect(screen.getByText("PACS N° 2001 - 1234506")).toBeInTheDocument();
    expect(screen.getByText("Statut de la fiche : Actif")).toBeInTheDocument();
  });

  // Clique sur suivant de la fiche inscription (rc/rca/pacs)
  const suivant = screen.getByTitle("Suivant");
  await act(async () => {
    fireEvent.click(suivant);
  });

  // Attente de l'ouverture de la fiche (changement de "plage")
  await waitFor(() => {
    expect(screen.getByText("RCA N° 2020 - 4093")).toBeInTheDocument();
    expect(
      screen.getByText("Statut de la fiche : Inactif")
    ).toBeInTheDocument();
  });

  // Clique sur précédent de la fiche inscription (rc/rca/pacs), retoure à la fichie d'avant (changement de "plage" à nouveau)
  const precedent = screen.getByTitle("Précédent");
  await act(async () => {
    fireEvent.click(precedent);
  });

  // Attente de l'ouverture de la fiche
  await waitFor(() => {
    expect(screen.getByText("PACS N° 2001 - 1234506")).toBeInTheDocument();
    expect(screen.getByText("Statut de la fiche : Actif")).toBeInTheDocument();
  });
});

test("La pagination (avec changement de plage) entre les fiches acte s'effectue correctement", async () => {
  // Changement de constantes de pagination afin de tester plus facilement la navigation entre "plage"
  // @ts-ignore
  TableauPaginationConstantes.NB_LIGNES_PAR_APPEL_INSCRIPTION = 4;
  // @ts-ignore
  TableauPaginationConstantes.NB_LIGNES_PAR_PAGE_INSCRIPTION = 2;
  // @ts-ignore
  TableauPaginationConstantes.NB_LIGNES_PAR_APPEL_ACTE = 4;
  // @ts-ignore
  TableauPaginationConstantes.NB_LIGNES_PAR_PAGE_ACTE = 2;

  await act(async () => {
    render(<RMCActeInscriptionPage />);
  });

  const inputNom = screen.getByLabelText("Nom") as HTMLInputElement;

  // Changement du nom
  await act(async () => {
    fireEvent.change(inputNom, {
      target: {
        value: "mockNom"
      }
    });
  });

  await waitFor(() => {
    expect(inputNom.value).toBe("mockNom");
  });

  // Click bouton submit
  const submit = screen.getByText(/Rechercher/i);
  await act(async () => {
    fireEvent.click(submit);
  });

  // Attente affichage des actes résultat dans le tableau
  await waitFor(() => {
    expect(screen.getByText("DEP.IRAN.1987.13")).toBeInTheDocument();
    expect(screen.getByText("ACQ.X.1951.1.413")).toBeInTheDocument();
  });

  // Clique bouton page suivante
  let boutonPageSuivante = screen.queryAllByTitle("Page suivante")[0];
  expect(boutonPageSuivante).toBeInTheDocument();
  await act(async () => {
    fireEvent.click(boutonPageSuivante);
  });

  // Attente affichage des actes de la page suivante
  await waitFor(() => {
    expect(
      screen.getByText("PAC.ORAN.2010.support 1.support 2.100.552")
    ).toBeInTheDocument();
    expect(screen.getByText("DEP.IRAN.1987.254.35")).toBeInTheDocument();
  });

  // Clique sur la dernière fiche acte du tableau
  const ligne = screen.getByTestId(idFicheActe1);
  await act(async () => {
    fireEvent.click(ligne);
  });

  // Attente de l'ouverture de la fiche
  await waitFor(() => {
    expect(screen.getByTestId("titreBandeau").innerHTML).toBe(
      "DEP.IRAN.1987.254.35"
    );
  });

  // Clique sur suivant de la fiche acte
  const suivant = screen.getByTitle("Suivant");
  await act(async () => {
    fireEvent.click(suivant);
  });

  // Attente de l'ouverture de la fiche (changement de "plage")
  await waitFor(() => {
    expect(screen.getByTestId("titreBandeau").innerHTML).toBe(
      "ACQ.X.1951.1.483"
    );
  });

  // Clique sur précédent de la fiche acte, retoure à la fichie d'avant (changement de "plage" à nouveau)
  const precedent = screen.getByTitle("Précédent");
  await act(async () => {
    fireEvent.click(precedent);
  });

  // Attente de l'ouverture de la fiche
  await waitFor(() => {
    expect(screen.getByTestId("titreBandeau").innerHTML).toBe(
      "DEP.IRAN.1987.254.35"
    );
  });
});
