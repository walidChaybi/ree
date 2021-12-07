import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { ProgressSignature } from "../../../../views/common/widget/signature/ProgressSignature";

test("renders progress bar, close function is called automatically", () => {
  const handleClickButton = jest.fn();

  render(
    <ProgressSignature
      errors={false}
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
  const handleClickButton = jest.fn();

  const { getByText } = render(
    <ProgressSignature
      errors={true}
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
  const handleClickButton = jest.fn();

  const { getByText } = render(
    <ProgressSignature
      errors={false}
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
              numeroRequete: 1
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
              numeroRequete: 2
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
