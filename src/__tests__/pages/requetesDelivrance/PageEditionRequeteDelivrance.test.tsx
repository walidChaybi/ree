import { IDroit } from "@model/agent/Habilitation";
import { IOfficier } from "@model/agent/IOfficier";
import { IUtilisateur } from "@model/agent/IUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { TypeAlerte } from "@model/etatcivil/enum/TypeAlerte";
import { ID, ID_ACTE, URL_BASE, URL_MES_REQUETES_DELIVRANCE_EDITION_ID } from "@router/ReceUrls";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router";
import { describe, expect, test } from "vitest";
import PageEditionRequeteDelivrance from "../../../pages/requetesDelivrance/PageEditionRequeteDelivrance";
import { createTestingRouter } from "../../__tests__utils__/testsUtil";
import MockRECEContextProvider from "../../mock/context/MockRECEContextProvider";
import { TYPE_ALERTE } from "../../mock/data/NomenclatureTypeAlerte";
import { idRequeteRDDASigner } from "../../mock/data/requeteDelivrance";

describe("Test de la page aperçu requête edition analyse marginale", () => {
  TypeAlerte.init(TYPE_ALERTE);

  const idActe = "b41079a5-9e8f-478a-b04c-c4c2ac671123";
  const idRequete = "9d00fe88-9d21-482e-bb02-223636f78386";
  test("La page s'affiche correctement", async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_EDITION_ID,
          element: (
            <MockRECEContextProvider utilisateurs={[{} as IUtilisateur]}>
              <PageEditionRequeteDelivrance />
            </MockRECEContextProvider>
          )
        }
      ],
      [URL_MES_REQUETES_DELIVRANCE_EDITION_ID.replace(ID, idRequete).replace(ID_ACTE, idActe)]
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
          path: `${URL_BASE}/test`,
          element: <PageEditionRequeteDelivrance />
        },
        {
          path: URL_BASE,
          element: <div>Redirigé</div>
        }
      ],
      [`${URL_BASE}/test`]
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
          path: `${URL_BASE}/:idRequeteParam`,
          element: (
            <MockRECEContextProvider utilisateurs={[{} as IUtilisateur]}>
              <PageEditionRequeteDelivrance />
            </MockRECEContextProvider>
          )
        }
      ],
      [`${URL_BASE}/:idRequeteParam`.replace(ID, idRequete)]
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
          path: URL_MES_REQUETES_DELIVRANCE_EDITION_ID,
          element: (
            <MockRECEContextProvider utilisateurs={[{} as IUtilisateur]}>
              <PageEditionRequeteDelivrance />
            </MockRECEContextProvider>
          )
        }
      ],
      [URL_MES_REQUETES_DELIVRANCE_EDITION_ID.replace(ID, idRequete).replace(ID_ACTE, idActe)]
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
          path: URL_MES_REQUETES_DELIVRANCE_EDITION_ID,
          element: (
            <MockRECEContextProvider
              utilisateurConnecte={
                {
                  idUtilisateur: "67374c0f-17a0-4673-aa7d-4ae94c424162",
                  habilitations: [{ profil: { droits: [{ nom: Droit.SIGNER_DELIVRANCE_DEMAT } as IDroit] } }]
                } as IOfficier
              }
              utilisateurs={[{} as IUtilisateur]}
            >
              <PageEditionRequeteDelivrance />
            </MockRECEContextProvider>
          )
        }
      ],
      [URL_MES_REQUETES_DELIVRANCE_EDITION_ID.replace(ID, idRequeteRDDASigner).replace(ID_ACTE, idActe)]
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText("Terminer et signer")).toBeDefined();
      expect(screen.getByText("Terminer")).toBeDefined();
    });
  });
});
