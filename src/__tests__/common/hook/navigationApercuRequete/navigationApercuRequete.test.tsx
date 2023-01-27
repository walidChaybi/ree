import {
  NavigationApercuReqCreationParams,
  useNavigationApercuCreation
} from "@hook/navigationApercuRequeteCreation/NavigationApercuCreationHook";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { URL_MES_REQUETES_CREATION } from "@router/ReceUrls";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import request from "superagent";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";

const superagentMock = require("superagent-mock")(request, configRequetes);
const history = createMemoryHistory();

beforeEach(() => {
  history.push(URL_MES_REQUETES_CREATION);
});

describe("Doit rediriger sur la bonne route en fonction du statut et du sousType", () => {
  test("Doit rediriger sur l'aperçu de requête création quand le sousType est RCEXR", async () => {
    const paramsCreation: NavigationApercuReqCreationParams = {
      idRequete: "b63ebccd-ba5e-443a-8837-c5e1e111e846",
      sousType: SousTypeCreation.getEnumFromLibelleCourt("Acte Etab X (d)"),
      statut: StatutRequete.getEnumFromLibelle("Prise en charge")
    };

    const HookConsumer: React.FC = () => {
      useNavigationApercuCreation(paramsCreation);
      return <></>;
    };
    render(
      <Router history={history}>
        <HookConsumer />
      </Router>
    );

    expect(history.location.pathname).toBe(
      "/rece/rece-ui/mesrequetescreation/apercurequetecreationetablissement/b63ebccd-ba5e-443a-8837-c5e1e111e846"
    );
  });

  test("Doit rediriger sur l'aperçu de requête création transcription simple quand le sousType est RCTC et que le statut est A_TRAITER", async () => {
    const paramsCreation: NavigationApercuReqCreationParams = {
      idRequete: "b63ebccd-ba5e-443a-8837-c5e1e111e846",
      sousType: SousTypeCreation.getEnumFromLibelleCourt("Acte Transcrit (c)"),
      statut: StatutRequete.getEnumFromLibelle("A traiter")
    };

    const HookConsumer: React.FC = () => {
      useNavigationApercuCreation(paramsCreation);
      return <></>;
    };
    render(
      <Router history={history}>
        <HookConsumer />
      </Router>
    );

    expect(history.location.pathname).toBe(
      "/rece/rece-ui/mesrequetescreation/apercurequetetranscriptionenpriseencharge/b63ebccd-ba5e-443a-8837-c5e1e111e846"
    );
  });

  test("Doit rediriger sur l'aperçu de requête création transcription prise en charge quand le sousType est RCTC et que le statut est A_TRAITER", async () => {
    const paramsCreation: NavigationApercuReqCreationParams = {
      idRequete: "b63ebccd-ba5e-443a-8837-c5e1e111e846",
      sousType: SousTypeCreation.getEnumFromLibelleCourt("Acte Transcrit (c)"),
      statut: StatutRequete.getEnumFromLibelle("A traiter")
    };

    const HookConsumer: React.FC = () => {
      useNavigationApercuCreation(paramsCreation);
      return <></>;
    };
    render(
      <Router history={history}>
        <HookConsumer />
      </Router>
    );

    expect(history.location.pathname).toBe(
      "/rece/rece-ui/mesrequetescreation/apercurequetetranscriptionenpriseencharge/b63ebccd-ba5e-443a-8837-c5e1e111e846"
    );
  });

  test("Doit rediriger sur l'aperçu de requête création transcription prise en charge quand le sousType est RCTD et que le statut est PRISE_EN_CHARGE", async () => {
    const paramsCreation: NavigationApercuReqCreationParams = {
      idRequete: "b63ebccd-ba5e-443a-8837-c5e1e111e846",
      sousType: SousTypeCreation.getEnumFromLibelleCourt("Acte Transcrit (d)"),
      statut: StatutRequete.getEnumFromLibelle("Prise en charge")
    };

    const HookConsumer: React.FC = () => {
      useNavigationApercuCreation(paramsCreation);
      return <></>;
    };
    render(
      <Router history={history}>
        <HookConsumer />
      </Router>
    );

    expect(history.location.pathname).toBe(
      "/rece/rece-ui/mesrequetescreation/apercurequetetranscriptionenpriseencharge/b63ebccd-ba5e-443a-8837-c5e1e111e846"
    );
  });

  test("Doit rediriger sur l'aperçu de requête création transcription en traitement quand le sousType est RCTD et que le statut est EN_TRAITEMENT", async () => {
    const paramsCreation: NavigationApercuReqCreationParams = {
      idRequete: "b63ebccd-ba5e-443a-8837-c5e1e111e846",
      sousType: SousTypeCreation.getEnumFromLibelleCourt("Acte Transcrit (d)"),
      statut: StatutRequete.getEnumFromLibelle("En traitement")
    };

    const HookConsumer: React.FC = () => {
      useNavigationApercuCreation(paramsCreation);
      return <></>;
    };
    render(
      <Router history={history}>
        <HookConsumer />
      </Router>
    );

    expect(history.location.pathname).toBe(
      "/rece/rece-ui/mesrequetescreation/apercurequetetranscriptionensaisieprojet/b63ebccd-ba5e-443a-8837-c5e1e111e846"
    );
  });
});


afterAll(() => {
  superagentMock.unset();
});
