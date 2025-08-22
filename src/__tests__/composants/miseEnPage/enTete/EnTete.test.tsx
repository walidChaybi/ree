import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { UtilisateurConnecte } from "@model/agent/Utilisateur";
import { render } from "@testing-library/react";
import { RouterProvider } from "react-router";
import { describe, expect, test } from "vitest";
import EnTete from "../../../../composants/miseEnPage/enTete/EnTete";
import { URL_DECONNEXION } from "../../../../router/infoPages/InfoPagesBase";
import { INFO_PAGE_MES_REQUETES_DELIVRANCE } from "../../../../router/infoPages/InfoPagesEspaceDelivrance";
import LiensRECE from "../../../../router/LiensRECE";
import { createTestingRouter } from "../../../__tests__utils__/testsUtil";

describe("test du composant EnTete", () => {
  const REDIRECTION_DECONNEXION = "Utilisateur déconnecté";
  const REDIRECTION_DELIVRANCE = "Requêtes délivrances utilisateur";

  const snapshotEnTete = (utilisateur?: UtilisateurConnecte, avecErreur: boolean = false): ChildNode | null => {
    const router = createTestingRouter(
      [
        {
          path: "/",
          element: <EnTete />
        },
        {
          path: URL_DECONNEXION,
          element: <div>{REDIRECTION_DECONNEXION}</div>
        },
        {
          path: LiensRECE.genererLien(INFO_PAGE_MES_REQUETES_DELIVRANCE.url),
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
      </div>
    );

    return container.firstChild;
  };

  test("Doit afficher correctement l'en-tête", () => {
    const snapshot = snapshotEnTete();

    expect(snapshot).toMatchSnapshot();
  });
});
