import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProgressSignature } from "../ProgressSignature";
import { mount } from "enzyme";

test("renders progresse bar", () => {
  const component = mount(
    <ProgressSignature
      onClose={() => {
        return;
      }}
      documentsToSign={[
        {
          conteneurSwift: "",
          idDocumentDelivre: "",
          idRequete: "",
          infos: [],
          mimeType: "",
          nomDocument: "",
        },
      ]}
      documentsToSignWating={[
        {
          conteneurSwift: "",
          idDocumentDelivre: "",
          idRequete: "",
          infos: [],
          mimeType: "",
          nomDocument: "",
        },
      ]}
    />
  );
  expect(component).toMatchSnapshot();
});

test("renders progress bar, close function is called", () => {
  const handleClickButton = jest.fn();

  render(
    <ProgressSignature
      onClose={handleClickButton}
      documentsToSign={[
        {
          conteneurSwift: "",
          idDocumentDelivre: "",
          idRequete: "",
          infos: [],
          mimeType: "",
          nomDocument: "",
        },
      ]}
      documentsToSignWating={[]}
    />
  );

  const closeButton = screen.getByText("Fermer");
  fireEvent.click(closeButton);
  expect(handleClickButton).toHaveBeenCalledTimes(1);
});

test("renders progress bar, close function can't be called", () => {
  const handleClickButton = jest.fn();

  render(
    <ProgressSignature
      onClose={handleClickButton}
      documentsToSign={[
        {
          conteneurSwift: "",
          idDocumentDelivre: "",
          idRequete: "",
          infos: [],
          mimeType: "",
          nomDocument: "",
        },
      ]}
      documentsToSignWating={[
        {
          conteneurSwift: "",
          idDocumentDelivre: "",
          idRequete: "",
          infos: [],
          mimeType: "",
          nomDocument: "",
        },
      ]}
    />
  );

  const closeButton = screen.getByText("Fermer");
  fireEvent.click(closeButton);
  expect(handleClickButton).toHaveBeenCalledTimes(0);
});
