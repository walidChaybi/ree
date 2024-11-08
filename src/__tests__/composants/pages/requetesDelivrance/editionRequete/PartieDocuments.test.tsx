import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import PartieDocuments from "../../../../../composants/pages/requetesDelivrance/editionRequete/PartieDocuments";
import EditionDelivranceContextProvider from "../../../../../contexts/EditionDelivranceContextProvider";

const idActe = "b41079a5-9e8f-478a-b04c-c4c2ac671123";
const idRequete = "9d00fe88-9d21-482e-bb02-223636f78386";

const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const mod =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

describe("Partie Documents", () => {
  test("La page s'affiche correctement avec l'onglet 'Courrier'", async () => {
    render(
      <EditionDelivranceContextProvider
        idRequeteParam={idRequete}
        idActeParam={idActe}
      >
        <PartieDocuments />
      </EditionDelivranceContextProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Réinitialiser")).toBeDefined();
      expect(screen.getByText("Valider")).toBeDefined();
      expect(screen.getAllByText("Courrier")).toBeDefined();
    });
  });
});
