import * as EtatCivilApi from "@api/appels/etatcivilApi";
import { URL_RECHERCHE_ACTE_INSCRIPTION } from "@router/ReceUrls";
import { fireEvent, render, screen } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { PartieActeRequete } from "../../../../composants/pages/requetesMiseAJour/PartieActeRequete";
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
  it("render correctement avec un id", async () => {
    const router = createTestingRouter(
      [
        {
          path: "/:idActeParam",
          element: <PartieActeRequete idActe={idActe} />
        }
      ],
      ["/b41079a5-9e8d-478c-b04c-c4c4ey86537g"]
    );

    render(<RouterProvider router={router} />);

    expect(screen.getByText("Acte registre")).toBeDefined();
    expect(screen.getByText("Alertes et informations")).toBeDefined();
    expect(screen.getByText("Aucun document à afficher")).toBeDefined();
  });

  it("Redirection lorsque le bouton Abandonner est cliqué", async () => {
    const router = createTestingRouter(
      [
        {
          path: "/:idActeParam",
          element: <PartieActeRequete idActe={idActe} />
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

  it("N'appel pas la récupération des données de composition si aucun id n'est fourni", () => {
    const composerDocumentFinalSpy = vi.spyOn(
      EtatCivilApi,
      "getDonneesPourCompositionActeTexte"
    );
    const { rerender } = render(<PartieActeRequete idActe={""} />);

    expect(composerDocumentFinalSpy).not.toHaveBeenCalled();

    rerender(
      <PartieActeRequete idActe="b41079a5-9e8d-478c-b04c-c4c4ey86537g" />
    );

    expect(composerDocumentFinalSpy).toHaveBeenCalled();
  });
});
