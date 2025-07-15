import { CONFIG_GET_NOMBRE_REQUETE } from "@api/configurations/requete/compteur/GetNombreRequeteConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { UtilisateurConnecte } from "@model/agent/Utilisateur";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { URL_DECONNEXION, URL_MES_REQUETES_DELIVRANCE } from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router";
import { describe, expect, test } from "vitest";
import { ConteneurParentModales } from "../../../../composants/commun/conteneurs/modale/ConteneurModale";
import MenuUtilisateur from "../../../../composants/miseEnPage/enTete/MenuUtilisateur";
import { createTestingRouter } from "../../../__tests__utils__/testsUtil";

describe("test du composant MenuUtilisateur", () => {
  const UTILISATEUR_CONNECTE = MockUtilisateurBuilder.utilisateurConnecte()
    .avecAttributs({
      prenom: "Prénom",
      nom: "NOM",
      fonction: "fonction"
    })
    .generer();

  const REDIRECTION_DECONNEXION = "Utilisateur déconnecté";
  const REDIRECTION_DELIVRANCE = "Requêtes délivrances utilisateur";

  const snapshotMenuUtilisateur = (utilisateur?: UtilisateurConnecte, avecErreur: boolean = false): ChildNode | null => {
    const router = createTestingRouter(
      [
        {
          path: "/",
          element: <MenuUtilisateur />
        },
        {
          path: URL_DECONNEXION,
          element: <div>{REDIRECTION_DECONNEXION}</div>
        },
        {
          path: URL_MES_REQUETES_DELIVRANCE,
          element: <div>{REDIRECTION_DELIVRANCE}</div>
        }
      ],
      ["/"]
    );

    const { container } = render(
      <div>
        <MockRECEContextProvider
          utilisateurConnecte={utilisateur ?? UtilisateurConnecte.inconnu()}
          erreurConnexion={{ avecErreur }}
        >
          <RouterProvider router={router} />
        </MockRECEContextProvider>
        <ConteneurParentModales />
      </div>
    );

    return container.firstChild;
  };

  test("Le bouton utilisateur ne s'affiche pas si une erreur système se produit", () => {
    const snapshot = snapshotMenuUtilisateur();

    expect(snapshot).toMatchSnapshot();
  });

  test("Le bouton déconnexion s'affiche si erreur de connexion", () => {
    const snapshot = snapshotMenuUtilisateur(undefined, true);

    expect(snapshot).toMatchSnapshot();
  });

  test("Le bouton s'affiche correctement et ouvre le menu", () => {
    const snapshot = snapshotMenuUtilisateur(UTILISATEUR_CONNECTE);

    expect(snapshot).toMatchSnapshot();

    fireEvent.click(screen.getByTitle("Menu utilisateur"));

    expect(snapshot).toMatchSnapshot();
  });

  test("L'utilisateur est déconnecté si aucune requête à signer", async () => {
    MockApi.deployer(CONFIG_GET_NOMBRE_REQUETE, { query: { statuts: StatutRequete.A_SIGNER.nom } }, { data: 0 });
    snapshotMenuUtilisateur(UTILISATEUR_CONNECTE);

    fireEvent.click(screen.getByTitle("Menu utilisateur"));
    fireEvent.click(screen.getByTitle("Déconnexion"));

    await waitFor(() => {
      expect(screen.getByText(REDIRECTION_DECONNEXION)).toBeDefined();
    });

    MockApi.stopMock();
  });

  test("L'utilisateur peut se déconnecter si il y a des requêtes à signer", async () => {
    MockApi.deployer(CONFIG_GET_NOMBRE_REQUETE, { query: { statuts: StatutRequete.A_SIGNER.nom } }, { data: 1 });
    const snapshot = snapshotMenuUtilisateur(UTILISATEUR_CONNECTE);

    fireEvent.click(screen.getByTitle("Menu utilisateur"));
    fireEvent.click(screen.getByTitle("Déconnexion"));

    await waitFor(() => expect(screen.getByTitle("Oui, me déconnecter")).toBeDefined());
    expect(snapshot).toMatchSnapshot();

    fireEvent.click(screen.getByTitle("Oui, me déconnecter"));

    await waitFor(() => {
      expect(screen.getByText(REDIRECTION_DECONNEXION)).toBeDefined();
    });

    MockApi.stopMock();
  });

  test("L'utilisateur peut consulter ses requêtes à signer au lieu de se déconnecter", async () => {
    MockApi.deployer(CONFIG_GET_NOMBRE_REQUETE, { query: { statuts: StatutRequete.A_SIGNER.nom } }, { data: 1 });
    snapshotMenuUtilisateur(UTILISATEUR_CONNECTE);

    fireEvent.click(screen.getByTitle("Menu utilisateur"));
    fireEvent.click(screen.getByTitle("Déconnexion"));

    await waitFor(() => expect(screen.getByTitle("Non, voir les requêtes à signer")).toBeDefined());

    fireEvent.click(screen.getByTitle("Non, voir les requêtes à signer"));

    await waitFor(() => expect(screen.getByText(REDIRECTION_DELIVRANCE)).toBeDefined());

    MockApi.stopMock();
  });
});
