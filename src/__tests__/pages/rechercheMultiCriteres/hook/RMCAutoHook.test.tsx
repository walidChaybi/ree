import { act, render, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";
import { IRequeteTableau } from "../../../../model/requete/v2/IRequeteTableau";
import {
  IRMCAutoParams,
  useRMCAutoHook
} from "../../../../views/common/hook/v2/navigationApercuRequeteRmcAuto/RMCAutoHook";
import {
  URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_V2,
  URL_RECHERCHE_REQUETE,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_REQUETES_SERVICE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_REQUETES_SERVICE_V2
} from "../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

const paramsRequete: IRMCAutoParams = {
  requete: { idRequete: ":idRequete", document: "123456" } as IRequeteTableau,
  dataRequetes: [],
  urlCourante: URL_MES_REQUETES_V2
};

const paramsRequeteService = {
  ...paramsRequete,
  urlCourante: URL_REQUETES_SERVICE_V2
};

const paramsRechercheRequete = {
  ...paramsRequete,
  urlCourante: URL_RECHERCHE_REQUETE
};

const HookConsummerRequete: React.FC = () => {
  const urlData = useRMCAutoHook(paramsRequete);
  return <div data-testid="urlRedirection">{urlData ? urlData.url : ""}</div>;
};

const HookConsummerRequeteService: React.FC = () => {
  const urlData = useRMCAutoHook(paramsRequeteService);
  return <div data-testid="urlRedirection">{urlData ? urlData.url : ""}</div>;
};

const HookConsummerRechercheRequete: React.FC = () => {
  const urlData = useRMCAutoHook(paramsRechercheRequete);
  return <div data-testid="urlRedirection">{urlData ? urlData.url : ""}</div>;
};

test('Test useRMCAutoHook : redirection à partir de "Mes Requêtes"', async () => {
  await act(async () => {
    const { getByTestId } = render(<HookConsummerRequete />);
    await waitFor(() =>
      expect(getByTestId("urlRedirection").textContent).toBe(
        URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID
      )
    );
  });
});

test('Test useRMCAutoHook : redirection à partir de "Requêtes Service"', async () => {
  await act(async () => {
    const { getByTestId } = render(<HookConsummerRequeteService />);
    await waitFor(() =>
      expect(getByTestId("urlRedirection").textContent).toBe(
        URL_REQUETES_SERVICE_APERCU_REQUETE_PRISE_EN_CHARGE_ID
      )
    );
  });
});

test('Test useRMCAutoHook : redirection à partir de "Recherche Requêtes"', async () => {
  await act(async () => {
    const { getByTestId } = render(<HookConsummerRechercheRequete />);
    await waitFor(() =>
      expect(getByTestId("urlRedirection").textContent).toBe(
        URL_RECHERCHE_REQUETE_APERCU_REQUETE_PRISE_EN_CHARGE_ID
      )
    );
  });
});

afterAll(() => {
  superagentMock.unset();
});
