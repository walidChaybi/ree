import { URL_RECHERCHE_ACTE_INSCRIPTION } from "@router/ReceUrls";
import { fireEvent, render, screen } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { describe, expect, it as test, vi } from "vitest";
import { PartieActeRequete } from "../../../../composants/pages/requetesMiseAJour/PartieActeRequete";
import EditionMiseAJourContextProvider from "../../../../contexts/EditionMiseAJourContextProvider";
import { createTestingRouter } from "../../../__tests__utils__/testsUtil";

const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate
  };
});

const idActe = "b41079a5-9e8d-478c-b04c-c4c4ey86537g";

describe("PartieActeRequete", () => {
  test("render correctement avec un id", async () => {
    const router = createTestingRouter(
      [
        {
          path: "/:idActeParam",
          element: (
            <EditionMiseAJourContextProvider idActe={idActe} idRequete={""}>
              <PartieActeRequete />
            </EditionMiseAJourContextProvider>
          )
        }
      ],
      ["/b41079a5-9e8d-478c-b04c-c4c4ey86537g"]
    );

    render(<RouterProvider router={router} />);

    expect(screen.getByText("Acte registre")).toBeDefined();
    expect(screen.getByText("Alertes et informations")).toBeDefined();
  });

  test("Redirection lorsque le bouton Abandonner est cliqué", async () => {
    const router = createTestingRouter(
      [
        {
          path: "/:idActeParam",
          element: (
            <EditionMiseAJourContextProvider idActe={idActe} idRequete={""}>
              <PartieActeRequete />
            </EditionMiseAJourContextProvider>
          )
        },
        {
          path: URL_RECHERCHE_ACTE_INSCRIPTION,
          element: <div>Redirection Abandon</div>
        }
      ],
      ["/b41079a5-9e8d-478c-b04c-c4c4ey86537g"]
    );

    render(<RouterProvider router={router} />);
    fireEvent.click(screen.getByText("Abandonner"));

    expect(mockedUseNavigate).toHaveBeenCalled();
  });
});
