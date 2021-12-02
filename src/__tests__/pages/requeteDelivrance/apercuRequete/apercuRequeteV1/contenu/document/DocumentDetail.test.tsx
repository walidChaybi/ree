import { render } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configRequetes } from "../../../../../../../mock/superagent-config/superagent-mock-requetes";
import { GroupementDocument } from "../../../../../../../model/requete/GroupementDocument";
import { MimeType } from "../../../../../../../ressources/MimeType";
import { DocumentDetail } from "../../../../../../../views/pages/requeteDelivrance/apercuRequete/apercuRequeteV1/contenu/document/DocumentDetail";
window.URL.createObjectURL = jest.fn();

const superagentMock = require("superagent-mock")(request, configRequetes);

test("render titulaire information", () => {
  const onClickHandler = jest.fn();
  const stateSetter = jest.fn();
  const setDocumentDelivreFct = jest.fn();

  const { getByText, container } = render(
    <DocumentDetail
      onClickHandler={onClickHandler}
      openedInViewer={{
        nom: "nom1",
        mimeType: MimeType.APPLI_PDF,
        taille: 250,
        identifiantDocument: "g9279c00-5d2b-11ea-bc55-0242ac130003"
      }}
      stateSetter={stateSetter}
      setDocumentDelivreFct={setDocumentDelivreFct}
      document={{
        nom: "nom1",
        mimeType: MimeType.APPLI_PDF,
        taille: 250,
        identifiantDocument: "g9279c00-5d2b-11ea-bc55-0242ac130003"
      }}
      groupement={GroupementDocument.DocumentDelivre}
    />
  );

  const textTitulaire = getByText(/application\/pdf 250 o/i);
  expect(textTitulaire).toBeDefined();
  expect(container).toMatchSnapshot();
});

afterAll(() => {
  superagentMock.unset();
});
