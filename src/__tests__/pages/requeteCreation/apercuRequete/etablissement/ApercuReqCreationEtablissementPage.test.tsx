import { ApercuReqCreationEtablissementPage } from "@pages/requeteCreation/apercuRequete/etablissement/ApercuReqCreationEtablissementPage";
import {
  PATH_APERCU_REQ_CREATION_ETABLISSEMENT,
  URL_MES_REQUETES_CREATION
} from "@router/ReceUrls";
import { act, render, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router";
import request from "superagent";
import { configRequetesCreation } from "../../../../../mock/superagent-config/superagent-mock-requetes-creation";

const superagentMock = require("superagent-mock")(
  request,
  configRequetesCreation
);
afterAll(() => {
  superagentMock.unset();
});

describe("Test de la page Aperçu requête etablissement", () => {
  test("DOIT rendre le composant ApercuReqCreationEtablissementPage correctement", async () => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_CREATION_ETABLISSEMENT}/:idRequete`,
        "3ed9aa4e-921b-489f-b8fe-531dd703c60c"
      )
    );

    await act(async () => {
      const { container } = render(
        <Router history={history}>
          <ApercuReqCreationEtablissementPage />
        </Router>
      );
      expect(
        container.getElementsByClassName("ApercuReqCreationEtablissementPage")
          .length
      ).toBe(1);
    });
  });

  test("DOIT afficher un loader TANT QUE la requete n'est pas encore chargée.", async () => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_CREATION_ETABLISSEMENT}/:idRequete`,
        "3ed9aa4e-921b-489f-b8fe-531dd703c60c"
      )
    );

    const { container } = render(
      <Router history={history}>
        <ApercuReqCreationEtablissementPage />
      </Router>
    );

    await waitFor(() => {
      expect(
        container.getElementsByClassName("OperationLocaleEnCoursSimple").length
      ).toBe(1);
    });

    setTimeout(() => {
      act(() => {
        expect(
          container.getElementsByClassName("OperationLocaleEnCoursSimple")
            .length
        ).toBe(0);
      });
    }, 3000);
  });
});
