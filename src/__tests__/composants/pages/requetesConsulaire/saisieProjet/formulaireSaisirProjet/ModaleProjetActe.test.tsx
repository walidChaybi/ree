import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import ModaleProjetActe from "../../../../../../composants/pages/requetesConsulaire/saisieProjet/formulaireSaisieProjet/ModaleProjetActe";

describe("ModaleProjetActe - Tests du composant", () => {
  vi.mock("@util/FileUtils", () => {
    const module = vi.importActual("@util/FileUtils");

    return {
      ...module,
      base64toBlobUrl: vi.fn((base64, type) => `blobUrl://${base64}`)
    };
  });
  test("Ne doit pas rendre le composant quand pdfBase64 est null", () => {
    const { container } = render(
      <ModaleProjetActe
        pdfBase64={null}
        fermerModale={() => {}}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  test("Doit rendre le composant correctement avec un PDF valide", () => {
    const contenuBase64 = "Base64String";

    const { container } = render(
      <ModaleProjetActe
        pdfBase64={contenuBase64}
        fermerModale={() => {}}
      />
    );
    expect(screen.getByText("X")).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("Doit appeler fermerModale quand le bouton de fermeture est cliqué", () => {
    const mockFermerModale = vi.fn();
    const mockPdfBase64 = "data:application/pdf;base64,JVBERi0xLjcKJeLjz9MKNSAwIG9iago8PC9GaWx0ZXI";
    render(
      <ModaleProjetActe
        pdfBase64={mockPdfBase64}
        fermerModale={mockFermerModale}
      />
    );
    fireEvent.click(screen.getByText("X"));
    expect(mockFermerModale).toHaveBeenCalledTimes(1);
  });
});
