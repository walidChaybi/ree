import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProgressSignature } from "../../../../views/common/widget/signature/ProgressSignature";
import { mount } from "enzyme";

test("renders progresse bar", () => {
  const component = mount(
    <ProgressSignature
      errors={false}
      idsRequetesToSign={["idRequete1"]}
      onClose={() => {
        return;
      }}
      documentsByRequete={{
        idRequete1: {
          documentsToSign: [
            {
              infos: [],
              idDocumentDelivre: "",
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
  expect(component).toMatchSnapshot();
});

test("renders progress bar, close function is called", () => {
  const handleClose = jest.fn();

  render(
    <ProgressSignature
      errors={false}
      idsRequetesToSign={[]}
      onClose={handleClose}
      documentsByRequete={{
        idRequete1: {
          documentsToSign: [
            {
              infos: [],
              idDocumentDelivre: "",
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

  screen.getByText("Fermer");
  // Fermeture automatique si toutes les requêtes ont été signées sans erreur
  expect(handleClose).toHaveBeenCalledTimes(1);
});

test("renders progress bar, close function can't be called", () => {
  const handleClickButton = jest.fn();

  render(
    <ProgressSignature
      errors={false}
      onClose={handleClickButton}
      idsRequetesToSign={["idRequete1", "idRequete2"]}
      documentsByRequete={{
        idRequete1: {
          documentsToSign: [
            {
              infos: [],
              idDocumentDelivre: "",
              mimeType: "",
              nomDocument: "",
              conteneurSwift: "",
              idRequete: "",
              numeroRequete: 1
            }
          ],
          documentsToSave: []
        },
        idRequete2: {
          documentsToSign: [
            {
              infos: [],
              idDocumentDelivre: "",
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

  const closeButton = screen.getByText("Fermer");
  fireEvent.click(closeButton);
  expect(handleClickButton).toHaveBeenCalledTimes(0);
});
