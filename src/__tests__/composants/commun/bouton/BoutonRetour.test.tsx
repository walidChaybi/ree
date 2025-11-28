import BoutonRetour from "@composants/commun/bouton/BoutonRetour";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import ElementPageRECE from "@router/ElementPageRECE";
import LiensRECE from "@router/LiensRECE";
import { TInfoPageRECE } from "@router/infoPages/InfoPageRECE";
import { INFO_PAGE_ACCUEIL } from "@router/infoPages/InfoPagesBase";
import {
  INFO_PAGE_APERCU_REQUETE_DELIVRANCE_CONSULTATION,
  INFO_PAGE_MES_REQUETES_DELIVRANCE
} from "@router/infoPages/InfoPagesEspaceDelivrance";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router";
import { beforeEach, describe, expect, test } from "vitest";
import GestionnaireFilAriane from "../../../../utils/GestionnaireFilAriane";
import { createTestingRouter } from "../../../__tests__utils__/testsUtil";

describe("test BoutonRetour", () => {
  const creerRouter = <TUrl extends string>(infoPageDeDepart: TInfoPageRECE<TUrl>) =>
    createTestingRouter(
      [
        {
          path: "/",
          element: (
            <ElementPageRECE infoPage={infoPageDeDepart}>
              <BoutonRetour />
            </ElementPageRECE>
          )
        },
        {
          path: LiensRECE.genererLien(INFO_PAGE_MES_REQUETES_DELIVRANCE.url),
          element: <div>{"Niveau 1"}</div>
        },
        {
          path: LiensRECE.genererLien(INFO_PAGE_ACCUEIL.url),
          element: <div>{"Accueil"}</div>
        }
      ],
      ["/"]
    );

  const ajouterNiveau1FilArianne = () =>
    GestionnaireFilAriane.ajoutElement({
      titre: INFO_PAGE_MES_REQUETES_DELIVRANCE.titre,
      url: LiensRECE.genererLien(INFO_PAGE_MES_REQUETES_DELIVRANCE.url),
      niveau: INFO_PAGE_MES_REQUETES_DELIVRANCE.niveauNavigation
    });

  const ajouterNiveau2FilArianne = () =>
    GestionnaireFilAriane.ajoutElement({
      titre: INFO_PAGE_APERCU_REQUETE_DELIVRANCE_CONSULTATION.titre,
      url: LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_CONSULTATION.url, { idRequeteParam: "" }),
      niveau: INFO_PAGE_APERCU_REQUETE_DELIVRANCE_CONSULTATION.niveauNavigation
    });

  beforeEach(() => {
    // Réinitialisation du GestionnaireFilAriane
    GestionnaireFilAriane.ajoutElement({ titre: "", url: "" });
  });

  test("DOIT renvoyer à l'accueil QUAND l'utilisateur est sur une page de niveau 1", async () => {
    ajouterNiveau1FilArianne();

    render(
      <MockRECEContextProvider>
        <RouterProvider router={creerRouter(INFO_PAGE_MES_REQUETES_DELIVRANCE)} />
      </MockRECEContextProvider>
    );

    const boutonRetour = await screen.findByText<HTMLButtonElement>(/RETOUR ACCUEIL/i);
    expect(boutonRetour).toBeDefined();

    fireEvent.click(boutonRetour);

    await waitFor(() => {
      expect(screen.getByText<HTMLButtonElement>(/Accueil/i)).toBeDefined();
    });
  });

  test("DOIT renvoyer à la page de niveau 1 QUAND l'utilisateur est arrivé sur une page de niveau 2 en passant par une page de niveau 1", async () => {
    ajouterNiveau1FilArianne();
    ajouterNiveau2FilArianne();

    render(
      <MockRECEContextProvider>
        <RouterProvider router={creerRouter(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_CONSULTATION)} />
      </MockRECEContextProvider>
    );

    const boutonRetour = await screen.findByText<HTMLButtonElement>(/RETOUR MES REQUÊTES DE DÉLIVRANCE/i);
    expect(boutonRetour).toBeDefined();

    fireEvent.click(boutonRetour);

    await waitFor(() => {
      expect(screen.getByText<HTMLButtonElement>(/Niveau 1/i)).toBeDefined();
    });
  });

  test("DOIT renvoyer à l'accueil QUAND l'utilisateur est arrivé sur une page de niveau 2 sans passer par une page de niveau 1", async () => {
    ajouterNiveau2FilArianne();

    render(
      <MockRECEContextProvider>
        <RouterProvider router={creerRouter(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_CONSULTATION)} />
      </MockRECEContextProvider>
    );

    const boutonRetour = await screen.findByText<HTMLButtonElement>(/RETOUR ACCUEIL/i);
    expect(boutonRetour).toBeDefined();

    fireEvent.click(boutonRetour);

    await waitFor(() => {
      expect(screen.getByText<HTMLButtonElement>(/Accueil/i)).toBeDefined();
    });
  });
});
