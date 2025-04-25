import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { IDroit, IHabilitation, IProfil } from "@model/agent/Habilitation";
import { IOfficier } from "@model/agent/IOfficier";
import { Droit } from "@model/agent/enum/Droit";
import { URL_MES_REQUETES_CONSULAIRE_SAISIR_RCTC } from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router";
import { describe, expect, test } from "vitest";
import BoutonsTableauConsulaire from "../../../../../composants/pages/requetesConsulaire/BoutonsTableauConsulaire";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";

describe("Test des boutons d'actions des tableaux de requêtes consulaire", () => {
  test("Le bouton ne s'affiche pas si l'utilisateur n'a pas le droit de saisir une requête", () => {
    render(
      <MockRECEContextProvider>
        <BoutonsTableauConsulaire />
      </MockRECEContextProvider>
    );

    expect(screen.queryByTitle("Saisir requête courrier")).toBeNull();
  });

  test("Le bouton de saisie courrier fonctionne correctement", async () => {
    const router = createTestingRouter(
      [
        { path: "/", element: <BoutonsTableauConsulaire /> },
        { path: URL_MES_REQUETES_CONSULAIRE_SAISIR_RCTC, element: <div>{"Page saisie RCTC"}</div> }
      ],
      ["/"]
    );

    render(
      <MockRECEContextProvider
        utilisateurConnecte={
          {
            habilitations: [{ profil: { droits: [{ idDroit: "", nom: Droit.SAISIR_REQUETE } as IDroit] } as IProfil } as IHabilitation]
          } as IOfficier
        }
      >
        <RouterProvider router={router} />
      </MockRECEContextProvider>
    );

    fireEvent.mouseEnter(await screen.findByTitle<HTMLButtonElement>("Saisir requête courrier"));
    fireEvent.click(await screen.findByTitle<HTMLButtonElement>("Création suite transcription courrier"));
    await waitFor(() => expect(screen.getByText("Page saisie RCTC")).toBeDefined());
  });
});
