import { URL_RECHERCHE_ACTE_INSCRIPTION } from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import { PartieActeRequete } from "../../../../composants/pages/requetesMiseAJour/PartieActeRequete";
import EditionMiseAJourContextProvider from "../../../../contexts/EditionMiseAJourContextProvider";
import { createTestingRouter } from "../../../__tests__utils__/testsUtil";

const idActe = "b41079a5-9e8f-478a-b04c-c4c2ac671123";
const idRequete = "9d00fe88-9d21-482e-bb02-223636f78386";

const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate
  };
});

describe("PartieActeRequete", () => {
  test("render correctement avec un id", async () => {
    const router = createTestingRouter(
      [
        {
          path: "/:idActeParam",
          element: (
            <EditionMiseAJourContextProvider
              idActe={idActe}
              idRequete={""}
              estMiseAJourAvecMentions={false}
            >
              <PartieActeRequete />
            </EditionMiseAJourContextProvider>
          )
        }
      ],
      ["/b41079a5-9e8f-478a-b04c-c4c2ac671123"]
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText("Acte registre")).toBeDefined();
      expect(screen.getByText("Alertes et informations")).toBeDefined();
    });
  });

  test("Redirection lorsque le bouton Abandonner est cliqué", async () => {
    const router = createTestingRouter(
      [
        {
          path: "/:idActeParam",
          element: (
            <EditionMiseAJourContextProvider
              idActe={idActe}
              idRequete={""}
              estMiseAJourAvecMentions={false}
            >
              <PartieActeRequete />
            </EditionMiseAJourContextProvider>
          )
        },
        {
          path: URL_RECHERCHE_ACTE_INSCRIPTION,
          element: <div>Redirection Abandon</div>
        }
      ],
      ["/b41079a5-9e8f-478a-b04c-c4c2ac671123"]
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText("Acte registre")).toBeDefined();
    });

    fireEvent.click(screen.getByText("Abandonner"));

    await waitFor(() => {
      expect(mockedUseNavigate).toHaveBeenCalled();
    });
  });
});
