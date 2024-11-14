import { ID, ID_ACTE, URL_CONTEXT_APP } from "@router/ReceUrls";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { describe, expect, test } from "vitest";
import PageEditionRequeteDelivrance from "../../../pages/requetesDelivrance/PageEditionRequeteDelivrance";
import { createTestingRouter } from "../../__tests__utils__/testsUtil";

const idActe = "b41079a5-9e8f-478a-b04c-c4c2ac671123";
const idRequete = "9d00fe88-9d21-482e-bb02-223636f78386";

describe("Test de la page aperçu requête edition analyse marginale", async () => {
  test("La page s'affiche correctement", async () => {
    const router = createTestingRouter(
      [
        {
          path: `${URL_CONTEXT_APP}/:idRequeteParam/:idActeParam`,
          element: <PageEditionRequeteDelivrance />,
        },
      ],
      [
        `${URL_CONTEXT_APP}/:idRequeteParam/:idActeParam`
          .replace(ID, idRequete)
          .replace(ID_ACTE, idActe),
      ],
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText("Acte registre")).toBeDefined();
    });
  });

  test("La page est redirigé si pas d'id acte ou idParam", async () => {
    const router = createTestingRouter(
      [
        {
          path: `${URL_CONTEXT_APP}/test`,
          element: <PageEditionRequeteDelivrance />,
        },
        {
          path: URL_CONTEXT_APP,
          element: <div>Redirigé</div>,
        },
      ],
      [`${URL_CONTEXT_APP}/test`],
    );

    render(<RouterProvider router={router} />);
    await waitFor(() => {
      expect(screen.queryByText("Acte registre")).toBeNull();
    });
  });

  test("L'onglet Requete est actif si il n'y à pas de délivrance", async () => {
    const router = createTestingRouter(
      [
        {
          path: `${URL_CONTEXT_APP}/:idRequeteParam`,
          element: <PageEditionRequeteDelivrance />,
        },
      ],
      [`${URL_CONTEXT_APP}/:idRequeteParam`.replace(ID, idRequete)],
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      const button = screen.getAllByRole("button", { name: /Requête/i });

      expect((button[0] as HTMLButtonElement).disabled).toBeTruthy();
    });
  });

  test("Les onglets Acte est actif si il y à une délivrance", async () => {
    const router = createTestingRouter(
      [
        {
          path: `${URL_CONTEXT_APP}/:idRequeteParam/:idActeParam`,
          element: <PageEditionRequeteDelivrance />,
        },
      ],
      [
        `${URL_CONTEXT_APP}/:idRequeteParam/:idActeParam`
          .replace(ID, idRequete)
          .replace(ID_ACTE, idActe),
      ],
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      const button = screen.getAllByRole("button", { name: /Acte registre/i });
      expect((button[0] as HTMLButtonElement).disabled).toBeTruthy();
    });
  });
});
