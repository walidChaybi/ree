import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router";
import { describe, expect, test } from "vitest";
import BoutonsTableauConsulaire from "../../../../../composants/pages/requetesConsulaire/BoutonsTableauConsulaire";
import { URL_ACCUEIL } from "../../../../../router/infoPages/InfoPagesBase";
import { INFO_PAGE_SAISIE_REQUETE_TRANSCRIPTION_COURRIER } from "../../../../../router/infoPages/InfoPagesEspaceConsulaire";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";

describe("Test des boutons d'actions des tableaux de requêtes consulaire", () => {
  //TODO [STRECE-7936] A Décommenter une fois les tests fonc effectués
  // test("Le bouton ne s'affiche pas si l'utilisateur n'a pas le droit de saisir une requête", () => {
  //   render(
  //     <MockRECEContextProvider utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().generer()}>
  //       <BoutonsTableauConsulaire />
  //     </MockRECEContextProvider>
  //   );

  //   expect(screen.queryByTitle("Saisir requête courrier")).toBeNull();
  // });

  test("Le bouton de saisie courrier fonctionne correctement", async () => {
    const router = createTestingRouter(
      [
        { path: "/", element: <BoutonsTableauConsulaire /> },
        { path: `${URL_ACCUEIL}${INFO_PAGE_SAISIE_REQUETE_TRANSCRIPTION_COURRIER.url}`, element: <div>{"Page saisie RCTC"}</div> }
      ],
      ["/"]
    );

    render(
      <MockRECEContextProvider
        utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.TRANSCRIPTION_SAISIR_REQUETE).generer()}
      >
        <RouterProvider router={router} />
      </MockRECEContextProvider>
    );

    fireEvent.mouseEnter(await screen.findByTitle<HTMLButtonElement>("Saisir requête courrier"));
    fireEvent.click(await screen.findByTitle<HTMLButtonElement>("Création suite transcription courrier"));
    await waitFor(() => expect(screen.getByText("Page saisie RCTC")).toBeDefined());
  });
});
