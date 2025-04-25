import { TypeAlerte } from "@model/etatcivil/enum/TypeAlerte";
import { URL_RECHERCHE_ACTE_INSCRIPTION } from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import { RouterProvider } from "react-router";
import { describe, expect, test, vi } from "vitest";
import PartieActe from "../../../../composants/pages/requetesMiseAJour/PartieActe";
import EditionMiseAJourContextProvider from "../../../../contexts/EditionMiseAJourContextProvider";
import { createTestingRouter } from "../../../__tests__utils__/testsUtil";
import { TYPE_ALERTE } from "../../../mock/data/NomenclatureTypeAlerte";

const mockedUseNavigate = vi.fn();
vi.mock("react-router", async () => {
  const mod = await vi.importActual<typeof import("react-router")>("react-router");
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate
  };
});

describe("PartieActeRequete", () => {
  TypeAlerte.init(TYPE_ALERTE);

  const idActe = "b41079a5-9e8f-478a-b04c-c4c2ac671123";

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
              <PartieActe />
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
              <PartieActe />
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

    act(() => fireEvent.click(screen.getByText("Abandonner")));

    await waitFor(() => {
      expect(mockedUseNavigate).toHaveBeenCalled();
    });
  });
});
