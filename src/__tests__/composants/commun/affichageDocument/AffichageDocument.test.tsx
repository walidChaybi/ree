import { render, screen } from "@testing-library/react";
import { expect, it as test, vi } from "vitest";
import AffichageDocument from "../../../../composants/commun/affichageDocument/AffichageDocument";
import { EMimeType } from "../../../../ressources/EMimeType";
import { base64EnBlobUrl } from "../../../../utils/FileUtils";

vi.mock("../../../../utils/FileUtils", () => {
  const module = vi.importActual("../../../../utils/FileUtils");

  return {
    ...module,
    base64EnBlobUrl: vi.fn((base64, type) => `blobUrl://${base64}`)
  };
});

test("renders un PDF  dans l'iframe quand un contenuBase64 est fourni", () => {
  const contenuBase64 = "sampleBase64String";

  render(
    <AffichageDocument
      contenuBase64={contenuBase64}
      typeZoom="auto"
      typeMime={EMimeType.APPLI_PDF}
    />
  );

  const iframe = screen.getByTitle("Document PDF");
  expect(iframe).toBeDefined();

  expect(iframe.getAttribute("src")).toBe("blobUrl://sampleBase64String#zoom=auto");
});

test("renders un message informatif quand le contenuBase64 est null", () => {
  render(
    <AffichageDocument
      contenuBase64={null}
      typeMime={EMimeType.APPLI_PDF}
    />
  );

  const fallbackText = screen.getByText("Aucun document à afficher");
  expect(fallbackText).toBeDefined();
});

test("doit mémoriser le blob pour ne pas re-calculer lorsque le contenuBase64 reste inchangé", () => {
  let contenuBase64 = "mockDocBase64";
  const { rerender } = render(
    <AffichageDocument
      typeMime={EMimeType.APPLI_PDF}
      contenuBase64={contenuBase64}
    />
  );

  let iframe = screen.getByTitle("Document PDF");
  expect(iframe).toBeDefined();
  expect(iframe.getAttribute("src")).toBe("blobUrl://mockDocBase64#zoom=page-fit");
  expect(base64EnBlobUrl).toHaveBeenCalledTimes(2);

  rerender(
    <AffichageDocument
      typeMime={EMimeType.APPLI_PDF}
      contenuBase64={contenuBase64}
    />
  );

  iframe = screen.getByTitle("Document PDF");

  expect(iframe).toBeDefined();
  expect(iframe.getAttribute("src")).toBe("blobUrl://mockDocBase64#zoom=page-fit");

  expect(base64EnBlobUrl).toHaveBeenCalledTimes(2);

  contenuBase64 = "nouveauMockDocBase64";

  rerender(
    <AffichageDocument
      typeMime={EMimeType.APPLI_PDF}
      contenuBase64={contenuBase64}
    />
  );

  iframe = screen.getByTitle("Document PDF");

  expect(iframe).toBeDefined();
  expect(iframe.getAttribute("src")).toBe("blobUrl://nouveauMockDocBase64#zoom=page-fit");

  expect(base64EnBlobUrl).toHaveBeenCalledTimes(3);
});
