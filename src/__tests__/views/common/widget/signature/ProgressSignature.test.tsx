import { fireEvent, render } from "@testing-library/react";
import { ProgressSignature } from "@widget/signature/ProgressSignature";
import { expect, test, vi } from "vitest";

test("renders progress bar, close function is called automatically", () => {
  const handleClickButton = vi.fn();

  render(
    <ProgressSignature
      error={false}
      idsRequetesToSign={[]}
      onClose={handleClickButton}
      documentsByRequete={{
        idRequeteRDCSC: {
          documentsToSign: [
            {
              infos: [],
              id: "",
              mimeType: "",
              nomDocument: "",
              conteneurSwift: "",
              idRequete: "",
              numeroRequete: 1
            }
          ],
          documentsToSave: []
        }
      }}
    />
  );

  // Fermeture automatique si toutes les requêtes ont été signées sans erreur
  expect(handleClickButton).toHaveBeenCalledTimes(1);
});

test("renders progress bar, close function is called when click on button", () => {
  const handleClickButton = vi.fn();

  const { getByText } = render(
    <ProgressSignature
      error={true}
      idsRequetesToSign={[]}
      onClose={handleClickButton}
      documentsByRequete={{
        idRequeteRDCSC: {
          documentsToSign: [
            {
              infos: [],
              id: "",
              mimeType: "",
              nomDocument: "",
              conteneurSwift: "",
              idRequete: "",
              numeroRequete: 1
            }
          ],
          documentsToSave: []
        }
      }}
    />
  );

  const closeButton = getByText("Fermer");
  fireEvent.click(closeButton);
  // Fermeture automatique si toutes les requêtes ont été signées sans erreur
  expect(handleClickButton).toHaveBeenCalledTimes(1);
});

test("renders progress bar, close function can't be called", () => {
  const handleClickButton = vi.fn();

  const { getByText } = render(
    <ProgressSignature
      error={false}
      onClose={handleClickButton}
      idsRequetesToSign={["idRequeteRDCSC", "idRequeteRDC"]}
      documentsByRequete={{
        idRequeteRDCSC: {
          documentsToSign: [
            {
              infos: [],
              id: "",
              mimeType: "",
              nomDocument: "",
              conteneurSwift: "",
              idRequete: "",
              numeroRequete: "1"
            }
          ],
          documentsToSave: []
        },
        idRequeteRDC: {
          documentsToSign: [
            {
              infos: [],
              id: "",
              mimeType: "",
              nomDocument: "",
              conteneurSwift: "",
              idRequete: "",
              numeroRequete: "2"
            }
          ],
          documentsToSave: []
        }
      }}
    />
  );

  const closeButton = getByText("Fermer");
  fireEvent.click(closeButton);
  expect(handleClickButton).toHaveBeenCalledTimes(0);
});
