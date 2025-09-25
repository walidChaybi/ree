import { CONFIG_GET_RESUME_ACTE } from "@api/configurations/etatCivil/acte/GetResumeActeConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
import { idRequeteRDDASigner } from "@mock/data/requeteDelivrance";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { MockFicheActeBuilder } from "@mock/model/etatcivil/acte/MockFicheActe";
import { Utilisateur } from "@model/agent/Utilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { TypeAlerte } from "@model/etatcivil/enum/TypeAlerte";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router";
import { describe, expect, test } from "vitest";
import PageEditionRequeteDelivrance from "../../../pages/requetesDelivrance/PageEditionRequeteDelivrance";
import LiensRECE from "../../../router/LiensRECE";
import { URL_ACCUEIL } from "../../../router/infoPages/InfoPagesBase";
import { INFO_PAGE_APERCU_REQUETE_DELIVRANCE_EDITION } from "../../../router/infoPages/InfoPagesEspaceDelivrance";
import { createTestingRouter } from "../../__tests__utils__/testsUtil";
import MockRECEContextProvider from "../../mock/context/MockRECEContextProvider";
import { TYPE_ALERTE } from "../../mock/data/NomenclatureTypeAlerte";

describe("Test de la page aperçu requête edition analyse marginale", () => {
  TypeAlerte.init(TYPE_ALERTE);
  const utilisateurConnecte = MockUtilisateurBuilder.utilisateurConnecte()
    .avecDroit(Droit.SIGNER_DELIVRANCE_DEMAT)
    .avecAttributs({ id: "67374c0f-17a0-4673-aa7d-4ae94c424162" })
    .generer();

  const idActe = "b41079a5-9e8f-478a-b04c-c4c2ac671123";
  const idRequete = "9d00fe88-9d21-482e-bb02-223636f78386";

  MockApi.deployer(
    CONFIG_GET_RESUME_ACTE,
    { path: { idActe }, query: { remplaceIdentiteTitulaireParIdentiteTitulaireAM: true } },
    {
      data: new MockFicheActeBuilder().deType("TEXTE").deNature("NAISSANCE").genererDto()
    }
  );

  test("La page s'affiche correctement", async () => {
    const router = createTestingRouter(
      [
        {
          path: `${URL_ACCUEIL}${INFO_PAGE_APERCU_REQUETE_DELIVRANCE_EDITION.url}`,
          element: (
            <MockRECEContextProvider utilisateurConnecte={utilisateurConnecte}>
              <PageEditionRequeteDelivrance />
            </MockRECEContextProvider>
          )
        }
      ],
      [
        LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_EDITION.url, {
          idRequeteParam: idRequete,
          idActeParam: idActe
        })
      ]
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText("Acte registre")).toBeDefined();
    });
  });

  test("La page est redirigé si pas d'idActe ou idParam", async () => {
    const router = createTestingRouter(
      [
        {
          path: `${URL_ACCUEIL}${INFO_PAGE_APERCU_REQUETE_DELIVRANCE_EDITION.url}`,
          element: (
            <MockRECEContextProvider
              utilisateurConnecte={utilisateurConnecte}
              utilisateurs={[{} as Utilisateur]}
            >
              <PageEditionRequeteDelivrance />
            </MockRECEContextProvider>
          )
        },
        {
          path: URL_ACCUEIL,
          element: <div>Redirigé</div>
        }
      ],
      [
        LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_EDITION.url, {
          idRequeteParam: ""
        })
      ]
    );

    render(<RouterProvider router={router} />);
    await waitFor(() => {
      expect(screen.queryByText("Acte registre")).toBeNull();
    });
  });

  test("L'onglet Requete est actif s'il n'y a pas de délivrance", async () => {
    const router = createTestingRouter(
      [
        {
          path: `${URL_ACCUEIL}${INFO_PAGE_APERCU_REQUETE_DELIVRANCE_EDITION.url}`,
          element: (
            <MockRECEContextProvider
              utilisateurConnecte={utilisateurConnecte}
              utilisateurs={[{} as Utilisateur]}
            >
              <PageEditionRequeteDelivrance />
            </MockRECEContextProvider>
          )
        }
      ],
      [
        LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_EDITION.url, {
          idRequeteParam: idRequete
        })
      ]
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      const button = screen.getAllByRole("button", { name: /Requête/i });

      expect((button[0] as HTMLButtonElement).disabled).toBeTruthy();
    });
  });

  test("Les onglets Acte sont actifs s'il y a une délivrance", async () => {
    const router = createTestingRouter(
      [
        {
          path: `${URL_ACCUEIL}${INFO_PAGE_APERCU_REQUETE_DELIVRANCE_EDITION.url}`,
          element: (
            <MockRECEContextProvider
              utilisateurConnecte={utilisateurConnecte}
              utilisateurs={[{} as Utilisateur]}
            >
              <PageEditionRequeteDelivrance />
            </MockRECEContextProvider>
          )
        }
      ],
      [
        LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_EDITION.url, {
          idRequeteParam: idRequete,
          idActeParam: idActe
        })
      ]
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      const button = screen.getAllByRole("button", { name: /Acte registre/i });
      expect((button[0] as HTMLButtonElement).disabled).toBeTruthy();
    });
  });

  test("Les boutons d'action sont disponibles", async () => {
    const router = createTestingRouter(
      [
        {
          path: `${URL_ACCUEIL}${INFO_PAGE_APERCU_REQUETE_DELIVRANCE_EDITION.url}`,
          element: (
            <MockRECEContextProvider
              utilisateurConnecte={utilisateurConnecte}
              utilisateurs={[{} as Utilisateur]}
            >
              <PageEditionRequeteDelivrance />
            </MockRECEContextProvider>
          )
        }
      ],
      [
        LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_EDITION.url, {
          idRequeteParam: idRequeteRDDASigner,
          idActeParam: idActe
        })
      ]
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText("Terminer et signer")).toBeDefined();
      expect(screen.getByText("Terminer")).toBeDefined();
    });
  });
});
