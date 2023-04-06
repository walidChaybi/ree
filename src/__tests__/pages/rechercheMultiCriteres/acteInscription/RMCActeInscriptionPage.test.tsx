import { titreForm } from "@pages/rechercheMultiCriteres/acteInscription/RMCActeInscriptionForm";
import { RMCActeInscriptionPage } from "@pages/rechercheMultiCriteres/acteInscription/RMCActeInscriptionPage";
import {
    act,
    fireEvent,
    render,
    screen,
    waitFor
} from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import * as TableauPaginationConstantes from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React from "react";
import { userDroitConsulterPerimetreMEAE } from "../../../../mock/data/connectedUserAvecDroit";
import { idFicheActe1 } from "../../../../mock/data/ficheActe";
import { idFichePacs } from "../../../../mock/data/fichePacs";

const globalAny: any = global;
globalAny.URL.createObjectURL = jest.fn();
globalAny.scroll = jest.fn();
globalAny.open = () => {
  return { ...window, addEventListener: jest.fn() };
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
  const inputJour = screen.getByLabelText(
    "datesDebutFinAnnee.dateDebut.jour"
  ) as HTMLInputElement;

  await waitFor(() => {
    expect(inputNom).toBeDefined();
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
  });
});

test("Bouton Rechercher du Formulaire Recherche Multi Critères Actes et Inscriptions", async () => {
  await act(async () => {
    render(<RMCActeInscriptionPage />);
  });

  const inputNom = screen.getByLabelText("Nom") as HTMLInputElement;

  act(() => {
    fireEvent.change(inputNom, {
      target: {
        value: "mockNom"
      }
    });
  });

  const submit = screen.getByText(/Rechercher/i);
  await act(async () => {
    fireEvent.click(submit);
  });
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

  storeRece.utilisateurCourant = userDroitConsulterPerimetreMEAE;

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
    expect(screen.getByText("PACS - 2013 - 1234508")).toBeDefined();
    expect(screen.getByText("RCA - 2020 - 4093")).toBeDefined();
  });

  // Clique bouton page suivante
  let boutonPageSuivante = screen.queryAllByTitle("Page suivante")[1];
  expect(boutonPageSuivante).toBeDefined();
  await act(async () => {
    fireEvent.click(boutonPageSuivante);
  });

  // Attente affichage des inscriptions (rc/rca/pacs) de la page suivante
  await waitFor(() => {
    expect(screen.getByText("PACS - 1986 - 1234510")).toBeDefined();
    expect(screen.getByText("PACS - 2001 - 1234506")).toBeDefined();
  });

  // Clique sur la dernière fiche inscription (rc/rca/pacs) du tableau
  const ligne = screen.getByTestId(idFichePacs);
  await act(async () => {
    fireEvent.click(ligne);
  });

  // Attente de l'ouverture de la fiche
  await waitFor(() => {
    expect(screen.getByText("PACS N° 2001 - 1234506")).toBeDefined();
    expect(screen.getByText("Statut de la fiche : Actif")).toBeDefined();
  });

  // Clique sur suivant de la fiche inscription (rc/rca/pacs)
  const suivant = screen.getByTitle("Suivant");
  await act(async () => {
    fireEvent.click(suivant);
  });

  // Attente de l'ouverture de la fiche (changement de "plage")
  await waitFor(() => {
    expect(screen.getByText("RCA N° 2020 - 4093")).toBeDefined();
    expect(screen.getByText("Statut de la fiche : Inactif")).toBeDefined();
  });

  // Clique sur précédent de la fiche inscription (rc/rca/pacs), retoure à la fichie d'avant (changement de "plage" à nouveau)
  const precedent = screen.getByTitle("Précédent");
  await act(async () => {
    fireEvent.click(precedent);
  });

  // Attente de l'ouverture de la fiche
  await waitFor(() => {
    expect(screen.getByText("PACS N° 2001 - 1234506")).toBeDefined();
    expect(screen.getByText("Statut de la fiche : Actif")).toBeDefined();
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

  storeRece.utilisateurCourant = userDroitConsulterPerimetreMEAE;

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
    expect(screen.getByText("DEP.IRAN.1987.13")).toBeDefined();
    expect(screen.getByText("ACQ.X.1951.1.413")).toBeDefined();
  });

  // Clique bouton page suivante
  let boutonPageSuivante = screen.queryAllByTitle("Page suivante")[0];
  expect(boutonPageSuivante).toBeDefined();
  await act(async () => {
    fireEvent.click(boutonPageSuivante);
  });

  // Attente affichage des actes de la page suivante
  await waitFor(() => {
    expect(
      screen.getByText("PAC.ORAN.2010.support 1.support 2.100.552")
    ).toBeDefined();
    expect(screen.getByText("DEP.IRAN.1987.254.35")).toBeDefined();
  });

  // Clique sur la dernière fiche acte du tableau
  const ligne = screen.getByTestId(idFicheActe1);
  await waitFor(() => {
    expect(ligne).toBeDefined();
  });
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


